export default function Topbar({
  catalogName,
  packageCount,
  search,
  onSearchChange,
  viewMode,
  onToggleView,
  onShowCredits,
  onShowHowTo,
  onExport
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 8h10a4 4 0 0 1 3.93 4.74l-.67 3.6A2.5 2.5 0 0 1 16.5 18a2.5 2.5 0 0 1-2.12-1.18l-.3-.49A2.5 2.5 0 0 0 11.96 15h-.92a2.5 2.5 0 0 0-2.12 1.18l-.3.49A2.5 2.5 0 0 1 6.5 18a2.5 2.5 0 0 1-2.46-2.06l-.67-3.6A4 4 0 0 1 7 8Z"
              stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
            />
            <path d="M8 11v2M7 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
            <circle cx="17" cy="13.5" r="1" fill="currentColor" />
          </svg>
        </span>
        <div>
          <h1>{catalogName || 'Game Library'}</h1>
          {packageCount > 0 && (
            <span className="subtitle">{packageCount} package{packageCount === 1 ? '' : 's'}</span>
          )}
        </div>
      </div>
      <div className="actions">
        <input
          type="search"
          placeholder="Search by title or ID..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="btn ghost" onClick={onToggleView}>
          {viewMode === 'grid' ? 'List View' : 'Grid View'}
        </button>
        <button className="btn ghost" onClick={onShowHowTo}>
          How to Access
        </button>
        <button className="btn ghost" onClick={onExport}>
          Export JSON
        </button>
        <button className="btn ghost" onClick={onShowCredits}>
          Credits
        </button>
        <a
          className="btn kofi-btn"
          href="https://ko-fi.com/tsuramatsu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">☕</span> Ko-fi
        </a>
      </div>
    </header>
  );
}
