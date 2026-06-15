import Modal from './Modal.jsx';

export default function HowToModal({ onClose }) {
  return (
    <Modal onClose={onClose} size="small">
      <div className="thanks">
        <div className="thanks-icon" aria-hidden="true">🔗</div>
        <h2>How to Access the Links</h2>
        <p>
          Links are <strong>Base64 encoded</strong>. Decode them using an online
          decoder to access the links.
        </p>
        <button type="button" className="btn primary" onClick={onClose}>
          Got it
        </button>
      </div>
    </Modal>
  );
}
