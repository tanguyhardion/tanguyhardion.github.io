export namespace StorageHelper {
  export function get(key: string): any {
    const data = localStorage.getItem(key);
    return data === null ? null : JSON.parse(data);
  }

  export function set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  export function has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  export function remove(key: string): void {
    localStorage.removeItem(key);
  }

  export function clear(): void {
    localStorage.clear();
  }

  export function clearKey(key: string): void {
    localStorage.removeItem(key);
  }
}
