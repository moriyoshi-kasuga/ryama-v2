/**
 * @module どこからでもアクセスして簡単な処理達をまとめたファイルです
 */

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @returns The URL of the site.
 */
export function getURL(): string {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://127.0.0.1:3000/'; // Automatically set by Vercel.
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
}

/**
 * @returns The URL of the site with the given additional path.
 */
export function getSiteURL(additional: string): string {
  return getURL() + additional;
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
