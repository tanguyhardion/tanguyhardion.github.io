// Ray-traced solar system rendered in a single fullscreen fragment shader.
// World units: the orbital plane is y = 0 and the sun sits at the origin.

export const BODY_COUNT = 9;
export const NOISE_SIZE = 64;

export const BODY_IDS = {
  sun: 0,
  mercury: 1,
  venus: 2,
  earth: 3,
  mars: 4,
  jupiter: 5,
  saturn: 6,
  moon: 7,
  satellite: 8
} as const;

export const vertexShader = `#version 300 es
void main() {
  // Fullscreen triangle, no vertex buffer needed
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const fragmentShader = `#version 300 es
precision highp float;
precision highp sampler3D;

#define TAU 6.2831853
#define SUN 0
#define MERCURY 1
#define VENUS 2
#define EARTH 3
#define MARS 4
#define JUPITER 5
#define SATURN 6
#define MOON 7
#define SATELLITE 8

uniform sampler3D uNoise;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uCamPos;
uniform mat3 uCam;
uniform float uFocal;
uniform vec4 uBody[${BODY_COUNT}];  // xyz position, w radius, indexed by body id
uniform int uOrder[${BODY_COUNT}];  // body ids sorted far to near
uniform float uAngle[6];          // current orbital angle of each planet

out vec4 fragColor;

const float RING_TILT = 0.42;
const float RING_INNER = 1.38;
const float RING_OUTER = 2.3;

const float ORBITS[6] = float[6](0.225, 0.325, 0.525, 0.75, 1.03, 1.275);
const vec3 TRAILS[6] = vec3[6](
  vec3(0.72, 0.7, 0.68),
  vec3(0.95, 0.8, 0.5),
  vec3(0.22, 0.74, 0.97),
  vec3(0.94, 0.27, 0.27),
  vec3(0.96, 0.62, 0.04),
  vec3(0.84, 0.72, 0.5)
);

// --- Noise ---

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash12(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

// Texture lookup rather than computed noise: the arithmetic version inlines into every
// call site and takes D3D drivers tens of seconds to compile, freezing the page.
// textureLod because implicit gradients inside loops are just as slow to compile.
float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return textureLod(uNoise, (i + f + 0.5) / ${NOISE_SIZE}.0, 0.0).r;
}

float fbm(vec3 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float total = 0.0;
  for (int i = 0; i < octaves; i++) {
    value += amplitude * noise(p);
    total += amplitude;
    amplitude *= 0.5;
    p = p.zxy * 2.03 + 11.7;
  }
  return value / total;
}

mat3 rotateY(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotateZ(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);
}

vec3 hex(float r, float g, float b) {
  return vec3(r, g, b) / 255.0;
}

// --- Surfaces ---

vec3 sunSurface(vec3 n, float facing) {
  vec3 q = rotateY(uTime * 0.04) * n;
  float warp = fbm(q * 2.4 + uTime * 0.07, 4);
  float flow = fbm(q * 4.2 + warp * 2.6 - uTime * 0.1, 5);
  float granules = noise(q * 26.0 + uTime * 0.25);
  float heat = flow * 1.15 + granules * 0.1 + pow(facing, 1.4) * 0.62 - 0.2;

  vec3 col = mix(hex(120.0, 6.0, 30.0), hex(255.0, 59.0, 92.0), smoothstep(0.1, 0.5, heat));
  col = mix(col, hex(255.0, 142.0, 64.0), smoothstep(0.45, 0.78, heat));
  col = mix(col, hex(255.0, 240.0, 214.0), smoothstep(0.72, 1.05, heat));
  return col * (0.72 + 0.4 * pow(facing, 0.5));
}

vec3 corona(vec3 ro, vec3 rd, float radius) {
  float tc = -dot(ro, rd);
  vec3 p = ro + rd * tc;
  float d = length(p) / radius;
  if (d < 0.9) return vec3(0.0);

  vec3 dir = normalize(p);
  float streamers = fbm(dir * 3.2 + vec3(0.0, uTime * 0.05, uTime * 0.08), 4);
  float fine = fbm(dir * 9.0 - vec3(uTime * 0.09), 3);
  float reach = 2.3 + 2.8 * streamers * streamers + fine * 0.7;

  float inner = exp(-(d - 1.0) * 6.5 / (0.65 + streamers));
  float outer = exp(-(d - 1.0) * 3.4 / reach) * mix(0.35, 1.0, smoothstep(0.3, 0.75, streamers + fine * 0.25));
  float halo = 0.32 / (d * d * d);

  return hex(255.0, 176.0, 110.0) * inner * 0.85
    + hex(255.0, 59.0, 92.0) * (outer * 0.55 + halo * 0.5);
}

vec3 mercurySurface(vec3 q) {
  float base = fbm(q * 4.5, 5);
  float craters = noise(q * 15.0);
  float pits = smoothstep(0.62, 0.72, craters);
  float rims = smoothstep(0.52, 0.61, craters) * (1.0 - pits);
  vec3 col = mix(hex(66.0, 62.0, 60.0), hex(176.0, 168.0, 160.0), smoothstep(0.32, 0.68, base));
  col = mix(col, hex(222.0, 216.0, 208.0), rims * 0.5);
  return col * (1.0 - pits * 0.5);
}

// Featureless cloud deck, stretched into bands by the planet's fast upper winds
vec3 venusSurface(vec3 q) {
  float t = uTime * 0.015;
  float warp = fbm(q * vec3(1.8, 4.5, 1.8) + vec3(t, 0.0, -t), 4);
  float clouds = fbm(q * vec3(2.4, 7.0, 2.4) + warp * 2.0, 5);
  vec3 col = mix(hex(176.0, 128.0, 66.0), hex(238.0, 208.0, 150.0), smoothstep(0.3, 0.62, clouds));
  return mix(col, hex(255.0, 244.0, 214.0), smoothstep(0.6, 0.8, clouds));
}

vec3 jupiterSurface(vec3 q) {
  float t = uTime * 0.02;
  float warp = fbm(q * vec3(2.2, 7.0, 2.2) + vec3(t, 0.0, -t), 5) - 0.5;
  float band = q.y * 11.0 + warp * 2.4;
  float bands = 0.5 + 0.32 * sin(band) + 0.18 * sin(band * 2.7 + 1.3);

  vec3 col = mix(hex(146.0, 70.0, 14.0), hex(245.0, 158.0, 11.0), smoothstep(0.2, 0.55, bands));
  col = mix(col, hex(255.0, 236.0, 184.0), smoothstep(0.55, 0.88, bands));

  // Slow elliptical storm sitting on a southern band
  vec3 eye = q - normalize(vec3(0.72, -0.34, 0.6));
  float storm = smoothstep(0.34, 0.12, length(eye * vec3(0.72, 1.7, 0.72)));
  return mix(col, hex(196.0, 66.0, 28.0), storm * 0.85);
}

// Same banding as Jupiter, but paler and calmer under its high haze
vec3 saturnSurface(vec3 q) {
  float warp = fbm(q * vec3(2.0, 6.0, 2.0) + vec3(uTime * 0.012, 0.0, 0.0), 4) - 0.5;
  float band = q.y * 8.0 + warp * 1.1;
  float bands = 0.5 + 0.3 * sin(band) + 0.2 * sin(band * 2.3 + 0.7);

  vec3 col = mix(hex(166.0, 132.0, 82.0), hex(226.0, 196.0, 138.0), smoothstep(0.2, 0.6, bands));
  return mix(col, hex(248.0, 234.0, 200.0), smoothstep(0.6, 0.92, bands));
}

vec3 marsSurface(vec3 q) {
  float base = fbm(q * 3.2, 6);
  float dark = smoothstep(0.46, 0.6, fbm(q * 1.7 + 9.0, 5));
  vec3 col = mix(hex(170.0, 56.0, 28.0), hex(236.0, 118.0, 66.0), smoothstep(0.34, 0.66, base));
  col = mix(col, hex(82.0, 28.0, 24.0), dark * 0.65);
  float cap = smoothstep(0.82, 0.9, abs(q.y) + (base - 0.5) * 0.28);
  return mix(col, hex(248.0, 240.0, 236.0), cap);
}

vec3 moonSurface(vec3 q) {
  float base = fbm(q * 5.0, 5);
  return mix(hex(72.0, 74.0, 86.0), hex(216.0, 218.0, 226.0), smoothstep(0.3, 0.68, base));
}

// Earth also needs ocean specular and night lights, so it reports those masks
vec3 earthSurface(vec3 q, out float ocean, out float land, out float clouds) {
  float height = fbm(q * 2.3 + 7.0, 6);
  land = smoothstep(0.5, 0.525, height);
  ocean = 1.0 - land;

  vec3 sea = mix(hex(5.0, 34.0, 96.0), hex(16.0, 118.0, 196.0), smoothstep(0.34, 0.5, height));
  float dryness = fbm(q * 5.5 + 3.0, 4);
  vec3 ground = mix(hex(32.0, 112.0, 62.0), hex(186.0, 152.0, 92.0), smoothstep(0.42, 0.62, dryness));
  vec3 col = mix(sea, ground, land);

  float ice = smoothstep(0.84, 0.9, abs(q.y) + (height - 0.5) * 0.25);
  col = mix(col, vec3(0.94, 0.97, 1.0), ice);

  vec3 cq = rotateY(uTime * 0.018) * q;
  float wisps = fbm(cq * vec3(2.8, 6.0, 2.8) + fbm(cq * 2.0, 3) * 2.2, 5);
  clouds = smoothstep(0.5, 0.66, wisps);
  return mix(col, vec3(1.0), clouds * 0.9);
}

// --- Shadows ---

float bodyShadow(vec3 p, vec3 L, int self) {
  float light = 1.0;
  for (int i = MERCURY; i <= MOON; i++) {
    if (i == self) continue;
    vec3 oc = uBody[i].xyz - p;
    float along = dot(oc, L);
    if (along <= 0.0) continue;
    float miss = length(oc - L * along);
    // Short range: real shadows taper off, without this inner planets black out the outer ones
    float reach = smoothstep(0.3, 0.15, along);
    light *= mix(1.0, smoothstep(uBody[i].w * 0.72, uBody[i].w * 1.12, miss), reach);
  }
  return light;
}

float ringDensity(float rr) {
  float x = (rr - RING_INNER) / (RING_OUTER - RING_INNER);
  float grooves = 0.55 + 0.45 * noise(vec3(rr * 26.0, 3.0, 1.0));
  float gap = smoothstep(0.012, 0.032, abs(x - 0.66));
  float edges = smoothstep(0.0, 0.05, x) * smoothstep(1.0, 0.88, x);
  return grooves * gap * edges;
}

vec3 ringNormal() {
  return rotateZ(RING_TILT) * vec3(0.0, 1.0, 0.0);
}

// Returns premultiplied ring color on the ray's hit, split by the caller around the planet
vec4 ringLayer(vec3 ro, vec3 rd, out float tRing) {
  vec3 center = uBody[SATURN].xyz;
  float radius = uBody[SATURN].w;
  vec3 nr = ringNormal();
  tRing = dot(center - ro, nr) / dot(rd, nr);
  if (tRing <= 0.0) return vec4(0.0);

  vec3 p = ro + rd * tRing;
  vec3 rel = p - center;
  float rr = length(rel) / radius;
  if (rr < RING_INNER - 0.05 || rr > RING_OUTER + 0.05) return vec4(0.0);

  float aa = max(fwidth(rr), 0.001);
  float cover = smoothstep(RING_INNER - aa, RING_INNER + aa, rr) * smoothstep(RING_OUTER + aa, RING_OUTER - aa, rr);
  float density = ringDensity(rr) * cover;

  vec3 L = normalize(-p);
  float along = dot(center - p, L);
  float miss = length(center - p - L * along);
  float lit = along > 0.0 ? smoothstep(radius * 0.92, radius * 1.04, miss) : 1.0;

  vec3 col = mix(hex(148.0, 96.0, 44.0), hex(255.0, 226.0, 170.0), noise(vec3(rr * 11.0, 8.0, 2.0)));
  float alpha = density * 0.92;
  return vec4(col * (0.05 + 0.95 * lit) * alpha, alpha);
}

// --- Orbital plane: orbit trails and the asteroid belt ---

vec3 planeLayer(vec3 p, float w) {
  float r = length(p.xz);
  float theta = atan(p.z, p.x);
  vec3 col = vec3(0.0);

  for (int i = 0; i < 6; i++) {
    float width = max(w * 1.15, 0.0022);
    float line = smoothstep(width, 0.0, abs(r - ORBITS[i]));
    float behind = mod(uAngle[i] - theta, TAU);
    float trail = exp(-behind * 1.7);
    col += line * (vec3(0.085, 0.09, 0.11) + TRAILS[i] * trail * 1.1);
  }

  if (r > 0.84 && r < 0.94) {
    // Rings of asteroids at slightly different speeds, inner ones overtaking outer ones
    for (int j = 0; j < 4; j++) {
      float fj = float(j);
      float count = 170.0 + fj * 46.0;
      float laneRadius = 0.865 + fj * 0.016;
      float a = theta - uTime * (0.0675 - fj * 0.0017);
      float x = a / TAU * count;
      float cell = mod(floor(x), count);
      float seed = hash12(vec2(cell, fj + 1.0));
      if (seed < 0.3) continue;

      float offset = (hash11(seed * 91.0) - 0.5) * 0.034;
      float size = mix(0.0012, 0.0046, pow(hash11(seed * 17.0), 3.0));
      float dx = (fract(x) - 0.5) * TAU / count * r;
      float dy = r - (laneRadius + offset);
      float rock = smoothstep(size + w, max(size - w, 0.0), length(vec2(dx, dy)));
      col += rock * mix(hex(120.0, 112.0, 124.0), hex(226.0, 214.0, 202.0), hash11(seed * 5.0));
    }

    float dust = exp(-pow((r - 0.89) / 0.032, 2.0));
    col += hex(180.0, 120.0, 130.0) * dust * 0.045 * fbm(vec3(p.xz * 7.0, uTime * 0.02), 3);
  }

  return col;
}

// --- Background stars ---

vec3 stars(vec2 uv) {
  vec3 col = vec3(0.0);
  for (int layer = 0; layer < 2; layer++) {
    float scale = 11.0 + float(layer) * 12.0;
    vec2 cell = floor(uv * scale);
    vec2 f = fract(uv * scale) - 0.5;
    float seed = hash12(cell + float(layer) * 37.0);
    if (seed < 0.72) continue;

    vec2 jitter = vec2(hash11(seed * 13.0), hash11(seed * 29.0)) * 0.7 - 0.35;
    float twinkle = 0.55 + 0.45 * sin(uTime * (0.7 + seed * 1.8) + seed * 40.0);
    float size = mix(0.022, 0.06, pow(hash11(seed * 7.0), 3.0));
    float point = smoothstep(size, 0.0, length(f - jitter));
    vec3 tint = mix(hex(167.0, 196.0, 255.0), hex(255.0, 214.0, 190.0), hash11(seed * 3.0));
    col += tint * point * twinkle;
  }
  return col;
}

// --- Compositing ---

void over(inout vec4 dst, vec3 color, float coverage) {
  dst.rgb = color * coverage + dst.rgb * (1.0 - coverage);
  dst.a = coverage + dst.a * (1.0 - coverage);
}

vec3 shadeBody(int id, vec3 p, vec3 n, vec3 rd) {
  vec3 L = normalize(-p);
  vec3 V = -rd;
  float ndl = dot(n, L);
  float day = smoothstep(-0.06, 0.32, ndl);
  float rim = pow(1.0 - clamp(dot(n, V), 0.0, 1.0), 3.0);
  float shadow = bodyShadow(p, L, id);

  vec3 albedo = vec3(0.0);
  vec3 emissive = vec3(0.0);
  vec3 atmosphere = vec3(0.0);
  float spec = 0.0;

  if (id == MERCURY) {
    albedo = mercurySurface(rotateY(uTime * 0.09) * n);
  } else if (id == VENUS) {
    // Spins backwards, unlike every other planet here
    albedo = venusSurface(rotateY(uTime * -0.04) * n);
    atmosphere = hex(255.0, 220.0, 150.0) * 0.5;
  } else if (id == JUPITER) {
    albedo = jupiterSurface(rotateY(uTime * 0.16) * rotateZ(-0.05) * n);
    atmosphere = hex(255.0, 196.0, 110.0) * 0.28;
  } else if (id == SATURN) {
    albedo = saturnSurface(rotateY(uTime * 0.15) * rotateZ(-RING_TILT) * n);
    atmosphere = hex(255.0, 226.0, 170.0) * 0.28;

    // Shadow cast by the rings onto the globe
    vec3 nr = ringNormal();
    float t = dot(uBody[SATURN].xyz - p, nr) / dot(L, nr);
    if (t > 0.0) {
      float rr = length(p + L * t - uBody[SATURN].xyz) / uBody[SATURN].w;
      if (rr > RING_INNER && rr < RING_OUTER) shadow *= 1.0 - ringDensity(rr) * 0.72;
    }
  } else if (id == EARTH) {
    float ocean, land, clouds;
    vec3 q = rotateY(uTime * 0.12) * rotateZ(-0.41) * n;
    albedo = earthSurface(q, ocean, land, clouds);
    atmosphere = hex(92.0, 178.0, 255.0) * 0.85;

    vec3 H = normalize(L + V);
    spec = pow(max(dot(n, H), 0.0), 48.0) * ocean * (1.0 - clouds) * 0.85;

    float cities = smoothstep(0.86, 0.97, noise(q * 34.0)) * smoothstep(0.42, 0.62, fbm(q * 7.0, 3));
    emissive = hex(255.0, 190.0, 96.0) * cities * land * (1.0 - clouds) * (1.0 - day) * 1.5;
  } else if (id == MARS) {
    albedo = marsSurface(rotateY(uTime * 0.11) * rotateZ(-0.44) * n);
    atmosphere = hex(255.0, 148.0, 104.0) * 0.26;
  } else if (id == MOON) {
    albedo = moonSurface(rotateY(uTime * 0.07) * n);
  } else {
    albedo = vec3(0.86, 0.9, 0.96);
  }

  vec3 sunlight = hex(255.0, 236.0, 222.0) * 1.28;
  // Soft fill from the viewer keeps night sides readable against the black page
  float fill = 0.5 + 0.5 * dot(n, V);
  vec3 ambient = hex(92.0, 104.0, 150.0) * (0.1 + 0.34 * fill * fill);
  vec3 col = albedo * (ambient + sunlight * day * (max(ndl, 0.0) + 0.14) * shadow);
  col += sunlight * spec * shadow;
  col += atmosphere * rim * day * shadow;
  return col + emissive;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  vec3 ro = uCamPos;
  vec3 rd = normalize(uCam * vec3(uv, uFocal));
  float pixel = 2.0 / (uRes.y * uFocal);

  float vignette = smoothstep(1.02, 0.62, length(uv));
  vec4 frag = vec4(stars(uv) * vignette * 0.8, 0.0);

  // Orbital plane sits between the bodies in depth, so it's drawn at its slot in the sorted loop
  float tPlane = abs(rd.y) > 1e-4 ? -ro.y / rd.y : -1.0;
  bool planePending = tPlane > 0.0;
  vec3 planeHit = ro + rd * tPlane;

  float tRing = 0.0;
  vec4 ring = ringLayer(ro, rd, tRing);

  for (int i = 0; i < ${BODY_COUNT}; i++) {
    int id = uOrder[i];
    vec3 center = uBody[id].xyz;
    float radius = uBody[id].w;

    float tc = dot(center - ro, rd);
    float d = length(ro + rd * tc - center);
    float w = pixel * tc;
    float cover = smoothstep(radius + w, radius - w, d);

    // Compare against the visible surface: orbits pass through planet centers
    float tSurface = tc - sqrt(max(radius * radius - d * d, 0.0));
    if (planePending && tPlane > tSurface) {
      frag.rgb += planeLayer(planeHit, pixel * tPlane) * smoothstep(0.0, 0.12, abs(rd.y));
      planePending = false;
    }

    if (id == SATURN && tRing > tc) {
      frag.rgb = ring.rgb + frag.rgb * (1.0 - ring.a);
      frag.a = ring.a + frag.a * (1.0 - ring.a);
    }

    if (id == SUN) frag.rgb += corona(ro, rd, radius) * vignette;

    if (id == EARTH || id == MARS) {
      // Thin scattering halo around the lit limb
      float altitude = (d - radius) / radius;
      if (altitude > 0.0 && altitude < 0.5) {
        vec3 rel = normalize(ro + rd * tc - center);
        float lit = smoothstep(-0.25, 0.6, dot(rel, normalize(-center)));
        vec3 tint = id == EARTH ? hex(86.0, 170.0, 255.0) : hex(255.0, 126.0, 92.0);
        float strength = id == EARTH ? 0.42 : 0.16;
        frag.rgb += tint * exp(-altitude * 15.0) * lit * strength;
      }
    }

    if (cover > 0.0) {
      float h = sqrt(max(radius * radius - d * d, 0.0));
      vec3 p = ro + rd * (tc - h);
      vec3 n = normalize(p - center);
      vec3 col = id == SUN
        ? sunSurface(n, clamp(dot(n, -rd), 0.0, 1.0))
        : shadeBody(id, p, n, rd);
      over(frag, col, cover);
    }

    if (id == SATURN && tRing <= tc) {
      frag.rgb = ring.rgb + frag.rgb * (1.0 - ring.a);
      frag.a = ring.a + frag.a * (1.0 - ring.a);
    }

    if (id == SATELLITE) {
      // Beacon so the probe stays readable at its tiny size
      float blink = pow(0.5 + 0.5 * sin(uTime * 3.2), 12.0);
      frag.rgb += vec3(0.5, 0.86, 1.0) * exp(-d * d * 42000.0) * (0.25 + blink * 1.1);
    }
  }

  if (planePending) {
    frag.rgb += planeLayer(planeHit, pixel * tPlane) * smoothstep(0.0, 0.12, abs(rd.y));
  }

  // Dither keeps the long glow falloff from banding on black
  frag.rgb += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;
  frag.rgb = clamp(frag.rgb, 0.0, 1.0);
  frag.a = max(frag.a, max(frag.r, max(frag.g, frag.b)));
  fragColor = frag;
}`;
