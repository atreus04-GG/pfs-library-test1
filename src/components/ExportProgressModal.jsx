export default function ExportProgressModal({ progress }) {
  const done = progress >= 100;

  return (
    <div className="modal open">
      <div className="modal-content small">
        <div className="export-progress">
          <div className="export-icon" aria-hidden="true">{done ? '✅' : '📦'}</div>
          <h2>{done ? 'Export Complete' : 'Exporting Catalog'}</h2>
          <p className="muted">
            {done
              ? 'Your download should begin shortly.'
              : 'Decoding links and building JSON…'}
          </p>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
