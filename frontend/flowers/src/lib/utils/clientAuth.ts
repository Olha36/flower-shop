'use client';

import type { Flower } from '@/types/flowers';

function getCookieValue(name: string) {
  if (typeof document === 'undefined') return null;

  const match = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
}

export function isUserLoggedIn() {
  return getCookieValue('logged-in') === 'true';
}

export function getCurrentAuthUserKey() {
  return getCookieValue('auth-user');
}

export function getWishlistStorageKey() {
  const authUser = getCurrentAuthUserKey();
  return authUser ? `wishlist:${authUser}` : null;
}

export function readWishlist(): Flower[] {
  if (typeof window === 'undefined') return [];

  const storageKey = getWishlistStorageKey();
  if (!storageKey) return [];

  return JSON.parse(localStorage.getItem(storageKey) || '[]') as Flower[];
}

export function writeWishlist(items: Flower[]) {
  if (typeof window === 'undefined') return;

  const storageKey = getWishlistStorageKey();
  if (!storageKey) return;

  localStorage.setItem(storageKey, JSON.stringify(items));
}
