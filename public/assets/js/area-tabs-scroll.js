(() => {
  const selectors = '[data-area-tabs="true"] .wt-area-tab-list, [data-area-tabs="true"] .wt-city-area-tab-list, .wt-area-tab-list, .wt-city-area-tab-list';
  const initialized = new WeakSet();

  const findInput = (button) => {
    const id = button && button.getAttribute('for');
    return id ? document.getElementById(id) : null;
  };

  const centerButton = (button, behavior = 'smooth') => {
    if (!button) return;
    const list = button.closest('.wt-area-tab-list, .wt-city-area-tab-list');
    if (!list || list.scrollWidth <= list.clientWidth + 1) return;

    const targetLeft = button.offsetLeft - ((list.clientWidth - button.offsetWidth) / 2);
    const maxLeft = list.scrollWidth - list.clientWidth;

    list.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxLeft)),
      behavior
    });
  };

  const getTabRoot = (list) => list?.closest('[data-area-tabs="true"]') || null;

  const syncA11yState = (list) => {
    if (!list) return null;
    const root = getTabRoot(list);
    const buttons = Array.from(list.querySelectorAll('label[for]'));
    let activeButton = null;

    buttons.forEach((button) => {
      const input = findInput(button);
      const active = Boolean(input && input.checked);
      if (active) activeButton = button;
      button.setAttribute('role', button.getAttribute('role') || 'tab');
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      button.setAttribute('tabindex', active ? '0' : '-1');

      const panelId = button.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel) {
        panel.setAttribute('role', panel.getAttribute('role') || 'tabpanel');
        panel.setAttribute('aria-hidden', active ? 'false' : 'true');
      }
    });

    if (root) {
      const panels = Array.from(root.querySelectorAll('.wt-city-area-panel, .wt-area-card'));
      panels.forEach((panel) => {
        if (!panel.id || buttons.some((button) => button.getAttribute('aria-controls') === panel.id)) return;
        panel.setAttribute('role', panel.getAttribute('role') || 'tabpanel');
      });
    }

    return activeButton;
  };

  const centerCheckedButton = (list, behavior = 'auto') => {
    const activeButton = syncA11yState(list);
    centerButton(activeButton, behavior);
  };

  const activateButton = (button, behavior = 'smooth') => {
    const input = findInput(button);
    if (!button || !input) return;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const list = button.closest('.wt-area-tab-list, .wt-city-area-tab-list');
    syncA11yState(list);
    centerButton(button, behavior);
    button.focus({ preventScroll: true });
  };

  const setupList = (list) => {
    if (initialized.has(list)) return;
    initialized.add(list);

    list.addEventListener('click', (event) => {
      const button = event.target.closest('label[for]');
      if (!button || !list.contains(button)) return;
      window.requestAnimationFrame(() => centerCheckedButton(list));
    });

    list.addEventListener('keydown', (event) => {
      const button = event.target.closest('label[for]');
      if (!button || !list.contains(button)) return;
      const buttons = Array.from(list.querySelectorAll('label[for]'));
      const currentIndex = buttons.indexOf(button);
      if (currentIndex < 0) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateButton(button);
        return;
      }

      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? buttons.length - 1
          : event.key === 'ArrowLeft'
            ? (currentIndex - 1 + buttons.length) % buttons.length
            : (currentIndex + 1) % buttons.length;
      activateButton(buttons[nextIndex]);
    });

    list.querySelectorAll('label[for]').forEach((button) => {
      const input = findInput(button);
      if (!input) return;
      input.addEventListener('change', () => centerCheckedButton(list));
    });

    centerCheckedButton(list, 'auto');
  };

  const setup = () => {
    const lists = Array.from(document.querySelectorAll(selectors));
    lists.forEach(setupList);

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lists.forEach((list) => centerCheckedButton(list, 'auto'));
      }, 120);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
})();
