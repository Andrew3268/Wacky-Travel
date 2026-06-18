(() => {
  const selectors = '.wt-area-tab-list, .wt-city-area-tab-list';

  const findInput = (button) => {
    const id = button && button.getAttribute('for');
    return id ? document.getElementById(id) : null;
  };

  const centerButton = (button, behavior = 'smooth') => {
    if (!button) return;
    const list = button.closest(selectors);
    if (!list || list.scrollWidth <= list.clientWidth + 1) return;

    const targetLeft = button.offsetLeft - ((list.clientWidth - button.offsetWidth) / 2);
    const maxLeft = list.scrollWidth - list.clientWidth;

    list.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxLeft)),
      behavior
    });
  };

  const centerCheckedButton = (list, behavior = 'auto') => {
    if (!list) return;
    const buttons = Array.from(list.querySelectorAll('label[for]'));
    const activeButton = buttons.find((button) => {
      const input = findInput(button);
      return input && input.checked;
    });
    centerButton(activeButton, behavior);
  };

  const setupList = (list) => {
    list.addEventListener('click', (event) => {
      const button = event.target.closest('label[for]');
      if (!button || !list.contains(button)) return;
      window.requestAnimationFrame(() => centerButton(button));
    });

    list.querySelectorAll('label[for]').forEach((button) => {
      const input = findInput(button);
      if (!input) return;
      input.addEventListener('change', () => centerButton(button));
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
