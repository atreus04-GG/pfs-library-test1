import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-5541288292480016';
// TODO: replace with the real ad slot ID from your AdSense dashboard
// (Ads > By ad unit > create a "Display" unit, then copy its data-ad-slot).
const AD_SLOT = 'XXXXXXXXXX';

export default function AdUnit() {
  const pushed = useRef(false);

  useEffect(() => {
    // StrictMode double-invokes effects in dev; only push the slot once.
    if (pushed.current) {
      return;
    }
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense script blocked or not yet loaded */
    }
  }, []);

  return (
    <div className="ad-unit">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
