import { useState } from 'react';
import Modal from './Modal.jsx';
import Turnstile from './Turnstile.jsx';
import { formatBytes, getTags, isUploadingLink } from '../utils/format.js';

export default function GameDetailsModal({ pkg, onClose }) {
  const links = pkg.downloadLinks || [];
  const size = formatBytes(pkg.sizeBytes);
  const tags = getTags(pkg);

  const hasRevealable = links.some(link => !isUploadingLink(link));
  const [unlocked, setUnlocked] = useState(false);
  const showCaptcha = hasRevealable && !unlocked;

  return (
    <Modal onClose={onClose}>
      <div className="details">
        <h2>{pkg.title}</h2>
        <div className="meta-row">
          <span className="meta-chip">ID: {pkg.titleId}</span>
          {pkg.version && <span className="meta-chip">v{pkg.version}</span>}
          {size && <span className="meta-chip">{size}</span>}
        </div>

        {tags.length > 0 && (
          <>
            <h3>Tags</h3>
            <div className="tag-row">
              {tags.map((tag, i) => (
                <span key={i} className="tag-chip">{tag}</span>
              ))}
            </div>
          </>
        )}

        {pkg.notes && (
          <>
            <h3>Notes</h3>
            <p className="notes">{pkg.notes}</p>
          </>
        )}

        {links.length ? (
          showCaptcha ? (
            <div className="link-captcha">
              <h3>Links</h3>
              <p className="muted">Verify you're human to reveal the links.</p>
              <Turnstile
                onVerified={() => setUnlocked(true)}
                action="reveal-links"
              />
            </div>
          ) : (
          <ul className="link-list">
            {links.map((link, i) => {
              const uploading = isUploadingLink(link);
              return (
                <li key={i} className={uploading ? 'is-uploading' : undefined}>
                  {uploading ? (
                    <span className="link-uploading" role="status">
                      Uploading
                      <span className="spinner" aria-hidden="true" />
                    </span>
                  ) : (
                    <div className="link-info">
                      <span>{link.name || 'Download'}</span>
                      <span className="link-url">{link.url}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          )
        ) : (
          <p className="muted">No links available.</p>
        )}
      </div>
    </Modal>
  );
}
