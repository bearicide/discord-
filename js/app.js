(() => {
  const config = window.MATTBEAR_PORTAL_CONFIG || {};
  const discordLink = document.querySelector('#discord-link');
  const discordStatus = document.querySelector('#discord-status');
  const mobileDiscord = document.querySelector('#mobile-discord');
  const mobileSearch = document.querySelector('#mobile-search');
  const search = document.querySelector('#link-search');
  const rows = [...document.querySelectorAll('#link-list .trail-row')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const emptyState = document.querySelector('#empty-state');
  const lightSwitch = document.querySelector('#light-switch');
  const sparkButton = document.querySelector('#spark-button');
  const sparkText = document.querySelector('#spark-text');

  let activeFilter = 'all';
  let lastSpark = -1;

  const sparks = [
    'Make a tiny instrument that gets better when friends are nearby.',
    'Turn one annoying daily task into a six-button web toy.',
    'Build a game where helping another player is the power-up.',
    'Take something serious and give it a handmade newspaper interface.',
    'Make a map that only shows what a person actually needs next.',
    'Invent a community tool that works before anybody makes an account.',
    'Build the smallest useful version first. Hide one strange surprise inside.',
    'Combine music, a local place, and one ridiculous interaction.'
  ];

  const openDiscord = () => {
    if (config.discordInvite) {
      window.location.assign(config.discordInvite);
      return;
    }

    discordLink?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    discordLink?.focus({ preventScroll: true });
    if (discordStatus) discordStatus.textContent = 'Add the invite URL in js/config.js';
  };

  if (discordLink) {
    if (config.discordInvite) {
      discordLink.href = config.discordInvite;
      discordLink.removeAttribute('aria-disabled');
      if (discordStatus) discordStatus.textContent = config.discordDescription || 'Join the MATTBEAR community';
      const label = discordLink.querySelector('strong');
      if (label) label.textContent = config.discordLabel || 'Come on in';
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
    const query = search?.value.trim().toLowerCase() || '';
    let visible = 0;

    rows.forEach(row => {
      const haystack = `${row.textContent} ${row.dataset.search || ''}`.toLowerCase();
      const categories = (row.dataset.category || '').split(/\s+/);
      const matchesText = !query || haystack.includes(query);
      const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);
      const matches = matchesText && matchesCategory;

      row.hidden = !matches;
      if (matches) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
  };

  search?.addEventListener('input', filterRows);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      filterRows();
    });
  });

  const setLights = enabled => {
    document.body.classList.toggle('party-lights', enabled);
    lightSwitch?.setAttribute('aria-pressed', String(enabled));
    try {
      localStorage.setItem('mattbear-den-lights', enabled ? 'on' : 'off');
    } catch (_) {
      // The theme still works when storage is blocked.
    }
  };

  try {
    setLights(localStorage.getItem('mattbear-den-lights') === 'on');
  } catch (_) {
    setLights(false);
  }

  lightSwitch?.addEventListener('click', () => {
    setLights(!document.body.classList.contains('party-lights'));
  });

  sparkButton?.addEventListener('click', () => {
    if (!sparkText) return;
    let next = Math.floor(Math.random() * sparks.length);
    if (sparks.length > 1) {
      while (next === lastSpark) next = Math.floor(Math.random() * sparks.length);
    }
    lastSpark = next;
    sparkText.textContent = sparks[next];
  });

  document.addEventListener('keydown', event => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');

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
