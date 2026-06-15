// Build a compact list of page numbers with ellipses, e.g. [1, '…', 4, 5, 6, '…', 20].
function pageRange(page, totalPages) {
  const pages = [];
  const push = (p) => { if (!pages.includes(p)) pages.push(p); };

  push(1);
  for (let p = page - 1; p <= page + 1; p++) {
    if (p > 1 && p < totalPages) push(p);
  }
  push(totalPages);

  const withGaps = [];
  let prev = 0;
  for (const p of pages.sort((a, b) => a - b)) {
    if (p - prev > 1) withGaps.push('…');
    withGaps.push(p);
    prev = p;
  }
  return withGaps;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const go = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== page) onChange(next);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="btn ghost"
        onClick={() => go(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      <ul className="page-numbers">
        {pageRange(page, totalPages).map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} className="page-gap" aria-hidden="true">…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`btn page-num${p === page ? ' is-active' : ''}`}
                onClick={() => go(p)}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="btn ghost"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </nav>
  );
}
