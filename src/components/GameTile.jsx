import { useState } from 'react';
import { formatBytes, getTags, isUploading } from '../utils/format.js';

export default function GameTile({ pkg, onClick }) {
  const initial = (pkg.title || '?').trim().charAt(0).toUpperCase();
  const [imgFailed, setImgFailed] = useState(false);
  const showPoster = pkg.posterUrl && !imgFailed;
  const size = formatBytes(pkg.sizeBytes);
  const tags = getTags(pkg);
  const uploading = isUploading(pkg);

  return (
    <article
      className={`tile${uploading ? ' is-uploading' : ''}`}
      onClick={uploading ? undefined : onClick}
      aria-disabled={uploading || undefined}
    >
      <div className="tile-cover">
        {showPoster ? (
          <img
            className="cover-image"
            src={pkg.posterUrl}
            alt={pkg.title}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="cover-initial">{initial}</span>
        )}
        {uploading && (
          <div className="uploading-overlay" role="status">
            <span className="spinner" aria-hidden="true" />
            <span>Uploading</span>
          </div>
        )}
        {pkg.version && <span className="version-badge">v{pkg.version}</span>}
        {size && <span className="size-badge">{size}</span>}
      </div>
      <div className="tile-info">
        <h3>{pkg.title}</h3>
        <p className="title-id">{pkg.titleId}</p>
        {tags.length > 0 && (
          <div className="tag-row">
            {tags.map((tag, i) => (
              <span key={i} className="tag-chip">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
