import Turnstile from './Turnstile.jsx';

export default function CaptchaGate({ onVerified }) {
  return (
    <div className="captcha-gate">
      <div className="captcha-card">
        <div className="captcha-shield" aria-hidden="true">🛡️</div>
        <h2>Verify you're human</h2>
        <p className="captcha-sub">
          Complete the challenge below to access the library.
        </p>
        <Turnstile onVerified={onVerified} action="enter-library" />
      </div>
    </div>
  );
}
