(() => {
  const config = window.MATTBEAR_PORTAL_CONFIG || {};
  const discordLink = document.querySelector('#discord-link');
  const discordStatus = document.querySelector('#discord-status');
  const mobileDiscord = document.querySelector('#mobile-discord');
  const mobileSearch = document.querySelector('#mobile-search');
  const search = document.querySelector('#link-search');
  const rows = [...document.querySelectorAll('#link-list a')];
  const emptyState = document.querySelector('#empty-state');

  const openDiscord = () => {
    if (config.discordInvite) {
      window.location.href = config.discordInvite;
      return;
    }
    discordLink?.focus();
    discordStatus.textContent = 'Add the invite URL in js/config.js';
  };

  if (discordLink) {
    if (config.discordInvite) {
      discordLink.href = config.discordInvite;
      discordLink.removeAttribute('aria-disabled');
      discordStatus.textContent = config.discordDescription || 'Join the MATTBEAR community';
      discordLink.querySelector('strong').textContent = config.discordLabel || 'Open Discord';
    } else {
      discordLink.setAttribute('aria-disabled', 'true');
      discordLink.addEventListener('click', event => {
        event.preventDefault();
        openDiscord();
      });
    }
  }

  mobileDiscord?.addEventListener('click', openDiscord);
  mobileSearch?.addEventListener('click', () => {
    search?.scrollIntoView({ block: 'center' });
    search?.focus({ preventScroll: true });
  });

  const filterRows = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const haystack = `${row.textContent} ${row.dataset.search || ''}`.toLowerCase();
      const match = !query || haystack.includes(query);
      row.hidden = !match;
      if (match) visible += 1;
    });
    emptyState.hidden = visible !== 0;
  };

  search?.addEventListener('input', filterRows);

  document.addEventListener('keydown', event => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
    if (event.key === '/' && !typing) {
      event.preventDefault();
      search?.focus();
    }
    if (event.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      filterRows();
      search.blur();
    }
  });
})();
