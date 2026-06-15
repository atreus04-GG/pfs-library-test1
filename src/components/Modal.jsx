export default function Modal({ onClose, children, size }) {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal open" onClick={handleBackdrop}>
      <div className={'modal-content' + (size === 'small' ? ' small' : '')}>
        <button className="close" onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
}
