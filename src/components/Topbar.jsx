export default function Topbar({
  catalogName,
  packageCount,
  search,
  onSearchChange,
  viewMode,
  onToggleView,
  onShowCredits
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="logo">GL</span>
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
        <button className="btn ghost" onClick={onShowCredits}>
          Credits
        </button>
      </div>
    </header>
  );
}
