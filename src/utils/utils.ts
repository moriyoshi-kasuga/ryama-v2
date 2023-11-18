/**
 * @module どこからでもアクセスして簡単な処理達をまとめたファイルです
 */

/**
 * @param additional - 追加のURL
 * @returns そのサイトのURL
 * @description
 * 環境変数`NEXT_PUBLIC_VERCEL_URL`に設定されている場合はそのURLを返します。
 * それ以外の場合は`http://127.0.0.1:3000/`を返します。
 * additionalを設定すると、そのURLの後ろに追加したURLを返します。
 */
export function getURL(additional?: string): string {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://127.0.0.1:3000/'; // Automatically set by Vercel.
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return additional ? `${url}${additional}` : url;
}
