export function resolveAssetPath(assetPath: string, baseUrl?: string): string {
  if (/^(https?:|data:|blob:)/i.test(assetPath)) {
    return assetPath;
  }

  const metaEnvBase =
    typeof import.meta !== 'undefined'
      ? (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL
      : undefined;

  const runtimeBase = baseUrl ?? metaEnvBase ?? '/';
  const trimmedBase = runtimeBase.trim() || '/';
  const normalizedBase = trimmedBase.endsWith('/') ? trimmedBase : `${trimmedBase}/`;
  const normalizedPath = assetPath.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}
