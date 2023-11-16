/**
 * @module どこからでもアクセスして簡単な処理達をまとめたファイルです
 */

/**
 * @returns site url (https://example.com/)
 */
export function getURL(): string {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/'; // Automatically set by Vercel.
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
}
