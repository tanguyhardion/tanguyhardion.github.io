#!/usr/bin/env node
// Build step: downloads the public profile from Supabase (anon key, RLS = read-only, no private data)
// into data/profile.json, which portfolioData.ts maps to the site's types.
// Without SUPABASE_URL / SUPABASE_ANON_KEY (see .env.example) it keeps the committed snapshot.
// If Supabase is unreachable it also falls back to the snapshot, so a build never fails on it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "data", "profile.json");
const VERSION = path.join(ROOT, "public", "profile-version.json");
try { process.loadEnvFile(path.join(ROOT, ".env")); } catch {}

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("[fetch-profile] SUPABASE_URL / SUPABASE_ANON_KEY not set — using committed data/profile.json");
} else {
  try {
  const res = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/get_profile`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok) throw new Error(`[fetch-profile] HTTP ${res.status}: ${await res.text()}`);
  const doc = await res.json();
  delete doc.private;
  fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + "\n");
  console.log(`[fetch-profile] profile ${doc.updatedAt}`);
  } catch (e) {
    if (process.env.CI) throw e;
    console.warn(`[fetch-profile] ${e.message} — using committed data/profile.json`);
  }
}
const { updatedAt } = JSON.parse(fs.readFileSync(OUT, "utf8"));
fs.mkdirSync(path.dirname(VERSION), { recursive: true });
fs.writeFileSync(VERSION, JSON.stringify({ updatedAt }) + "\n");
