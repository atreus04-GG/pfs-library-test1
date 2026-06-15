import { useEffect, useRef } from 'react';

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// Cloudflare's official "always passes" test key — used as a fallback so the
// app works out of the box. Set VITE_TURNSTILE_SITE_KEY for real deployments.
const TEST_SITE_KEY = '1x00000000000000000000AA';
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

let scriptPromise = null;

function loadTurnstileScript() {
  if (typeof window !== 'undefined' && window.turnstile) {
    return Promise.resolve();
  }
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export default function Turnstile({ onVerified, onError, action }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Hold the latest callbacks in refs so the widget renders once and is not
  // torn down/recreated when parents pass fresh inline callbacks each render.
  const onVerifiedRef = useRef(onVerified);
  const onErrorRef = useRef(onError);
  onVerifiedRef.current = onVerified;
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) {
          return;
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          action,
          theme: 'dark',
          callback: (token) => onVerifiedRef.current?.(token),
          'error-callback': () => onErrorRef.current?.(),
        });
      })
      .catch(() => onErrorRef.current?.());

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget already removed */
        }
      }
    };
  }, [action]);

  return <div ref={containerRef} className="turnstile-widget" />;
}
