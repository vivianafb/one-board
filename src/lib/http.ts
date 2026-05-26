export async function httpGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
