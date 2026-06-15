import Modal from './Modal.jsx';

const CREDITS = [
  'SiESPta Team',
  'BestPig',
  'Pippo',
  'Drakmor',
  'High-Speed007',
  'PS5 Jailbreak Pinas Community',
];

export default function CreditsModal({ onClose }) {
  return (
    <Modal onClose={onClose} size="small">
      <div className="thanks">
        <div className="thanks-icon" aria-hidden="true">🙌</div>
        <h2>Credits</h2>
        <p>Credits to:</p>
        <ul className="credits-list">
          {CREDITS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <button type="button" className="btn primary" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
