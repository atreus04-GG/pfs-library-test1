import { useState, useMemo, useEffect } from 'react';
import { useLibrary } from './hooks/useLibrary.js';
import { isUploading } from './utils/format.js';
import Topbar from './components/Topbar.jsx';
import GameTile from './components/GameTile.jsx';
import GameDetailsModal from './components/GameDetailsModal.jsx';
import Pagination from './components/Pagination.jsx';
import ThanksModal from './components/ThanksModal.jsx';
import CreditsModal from './components/CreditsModal.jsx';
import HowToModal from './components/HowToModal.jsx';
import CaptchaGate from './components/CaptchaGate.jsx';

const PAGE_SIZE = 10;
const THANKS_DISMISSED_KEY = 'pfs-thanks-dismissed';
const CAPTCHA_VERIFIED_KEY = 'pfs-captcha-verified';
const CAPTCHA_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours

function isCaptchaVerified() {
  try {
    const stored = localStorage.getItem(CAPTCHA_VERIFIED_KEY);

    if (!stored) {
      return false;
    }

    const { expiry } = JSON.parse(stored);

    if (Date.now() > expiry) {
      localStorage.removeItem(CAPTCHA_VERIFIED_KEY);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export default function App() {
  const { data, status, error } = useLibrary();

  const [verified, setVerified] = useState(isCaptchaVerified);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selected, setSelected] = useState(null);
  const [showCredits, setShowCredits] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [page, setPage] = useState(1);
  const [showThanks, setShowThanks] = useState(() => {
  try {
    const stored = localStorage.getItem(THANKS_DISMISSED_KEY);

    if (!stored) {
      return true;
    }

    const { expiry } = JSON.parse(stored);

    if (Date.now() > expiry) {
      localStorage.removeItem(THANKS_DISMISSED_KEY);
      return true;
    }

    return false;
  } catch {
    return true;
  }
});

  const dismissThanks = () => {
  setShowThanks(false);

  try {
    localStorage.setItem(
      THANKS_DISMISSED_KEY,
      JSON.stringify({
        expiry: Date.now() + (24 * 60 * 60 * 1000), // 1 day
      })
    );
  } catch {
    /* ignore storage errors */
  }
};

  const handleVerified = () => {
    setVerified(true);

    try {
      localStorage.setItem(
        CAPTCHA_VERIFIED_KEY,
        JSON.stringify({ expiry: Date.now() + CAPTCHA_TTL_MS })
      );
    } catch {
      /* ignore storage errors */
    }
  };

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return data.packages;
    return data.packages.filter(p =>
      p.title.toLowerCase().includes(term) ||
      (p.titleId || '').toLowerCase().includes(term)
    );
  }, [data.packages, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  );

  useEffect(() => { setPage(1); }, [search]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelected(null);
        setShowCredits(false);
        setShowHowTo(false);
        dismissThanks();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const renderBody = () => {
    if (status === 'loading') {
      return <p className="empty">Loading catalog…</p>;
    }
    if (status === 'error') {
      return (
        <p className="empty">
          Failed to load library: {error}
          <br />
          <small>Make sure <code>public/library.json</code> exists.</small>
        </p>
      );
    }
    if (filtered.length === 0) {
      return (
        <p className="empty">
          {data.packages.length
            ? 'No packages match your search.'
            : 'Catalog is empty.'}
        </p>
      );
    }
    return (
      <>
        <section className={viewMode === 'grid' ? 'grid' : 'list'}>
          {pageItems.map((pkg, i) => (
            <GameTile
              key={(currentPage - 1) * PAGE_SIZE + i}
              pkg={pkg}
              onClick={() => { if (!isUploading(pkg)) setSelected(pkg); }}
            />
          ))}
        </section>
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />
      </>
    );
  };

  if (!verified) {
    return <CaptchaGate onVerified={handleVerified} />;
  }

  return (
    <>
      <Topbar
        catalogName={data.name}
        packageCount={data.packages.length}
        search={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onToggleView={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
        onShowCredits={() => setShowCredits(true)}
        onShowHowTo={() => setShowHowTo(true)}
      />
      <main>{renderBody()}</main>
      <footer className="site-footer">
        <p>
          <strong>DMCA Disclaimer:</strong> All files referenced in this catalog are
          provided for testing and educational purposes only. This site does not host
          any files. If you believe content infringes your rights, please contact us
          for removal.
        </p>
      </footer>
      {showThanks && <ThanksModal onClose={dismissThanks} />}
      {showCredits && <CreditsModal onClose={() => setShowCredits(false)} />}
      {showHowTo && <HowToModal onClose={() => setShowHowTo(false)} />}
      {selected && (
        <GameDetailsModal pkg={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
