import { useState, useMemo } from 'react';

function makeChallenge() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function CaptchaChallenge({ onVerified, submitLabel = 'Verify' }) {
  const [challenge, setChallenge] = useState(makeChallenge);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const canSubmit = useMemo(
    () => checked && value.trim() !== '',
    [checked, value]
  );

  const reset = () => {
    setChallenge(makeChallenge());
    setChecked(false);
    setValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checked) {
      setError('Please confirm you are not a robot.');
      return;
    }
    if (Number(value.trim()) !== challenge.answer) {
      setError('Incorrect answer. Please try again.');
      reset();
      return;
    }
    setError('');
    onVerified();
  };

  return (
    <form className="captcha-form" onSubmit={handleSubmit}>
      <label className="captcha-check">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => { setChecked(e.target.checked); setError(''); }}
        />
        <span>I'm not a robot</span>
      </label>

      <div className="captcha-question">
        <span className="captcha-prompt">
          What is <strong>{challenge.a} + {challenge.b}</strong>?
        </span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label={`What is ${challenge.a} plus ${challenge.b}?`}
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(''); }}
          placeholder="Answer"
        />
      </div>

      {error && <p className="captcha-error" role="alert">{error}</p>}

      <button type="submit" className="btn primary" disabled={!canSubmit}>
        {submitLabel}
      </button>
    </form>
  );
}
