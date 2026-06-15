import { useState, useEffect } from 'react';

export function useLibrary(url = `${import.meta.env.BASE_URL}library.json`) {
  const [data, setData] = useState({ name: '', packages: [] });
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (cancelled) return;
        setData({
          name: json.name || 'Catalog',
          packages: Array.isArray(json.packages) ? json.packages : []
        });
        setStatus('ready');
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message || 'Failed to load library');
        setStatus('error');
      });

    return () => { cancelled = true; };
  }, [url]);

  return { data, status, error };
}
