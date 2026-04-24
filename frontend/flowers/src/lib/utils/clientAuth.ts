'use client';

export function isUserLoggedIn() {
  if (typeof document === 'undefined') return false;

  return document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith('logged-in=') && cookie.split('=')[1] === 'true');
}
