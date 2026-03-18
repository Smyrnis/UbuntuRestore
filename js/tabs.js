/**
 * tabs.js
 * Tab switching — toggles .active on tab buttons and panes.
 */

function switchTab(tabName) {
  // Deactivate all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isTarget = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // Show / hide panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabName}`);
  });
}
