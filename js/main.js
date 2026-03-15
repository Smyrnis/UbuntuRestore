/**
 * main.js
 * Entry point — runs after the DOM is ready.
 *
 * Responsibilities:
 *   1. Wire up event listeners that can't use inline onclick attributes
 *      (PHP extension pills use event delegation here).
 *   2. Expose download / copy actions called by sidebar buttons.
 *   3. Trigger the initial render.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── PHP extension pills ─────────────────────────────────────────────────
  // Pills are toggled via click; state is synced immediately.
  document.querySelectorAll('.ext-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      const ext = pill.dataset.ext;
      if (pill.classList.contains('selected')) {
        if (!state.phpExtensions.includes(ext)) state.phpExtensions.push(ext);
      } else {
        state.phpExtensions = state.phpExtensions.filter(x => x !== ext);
      }
      updateAll();
    });
  });

  // ── Initial render ──────────────────────────────────────────────────────
  updateAll();
});

// ── Sidebar actions ───────────────────────────────────────────────────────────

function downloadScript() {
  const script = generateScript();
  const blob = new Blob([script], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'install.sh';
  a.click();
  URL.revokeObjectURL(url);
}

function copyScript() {
  navigator.clipboard.writeText(generateScript()).then(() => showToast());
}
