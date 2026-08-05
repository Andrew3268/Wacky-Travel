(() => {
  const selectors = '[data-area-tabs="true"] .wt-area-tab-list, [data-area-tabs="true"] .wt-city-area-tab-list, .wt-area-tab-list, .wt-city-area-tab-list';
  const initialized = new WeakSet();
  const snapshotInitialized = new WeakSet();
  let snapshotGridSequence = 0;

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
    if (initialized.has(list)) return;
    initialized.add(list);

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

  const createSnapshotScrollButton = (direction, gridId) => {
    const isPrevious = direction === 'previous';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `wt-city-snapshot__scroll-button wt-city-snapshot__scroll-button--${isPrevious ? 'previous' : 'next'}`;
    button.setAttribute('aria-label', isPrevious ? '이전 숙소 선택 보기' : '다음 숙소 선택 보기');
    button.setAttribute('aria-controls', gridId);
    button.title = isPrevious ? '이전 항목' : '다음 항목';
    return button;
  };

  const getSnapshotScrollStep = (grid) => {
    const card = grid.querySelector('.wt-city-choice-card');
    if (!card) return Math.max(280, grid.clientWidth * 0.8);

    const styles = window.getComputedStyle(grid);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return Math.max(1, card.getBoundingClientRect().width + gap);
  };

  const updateSnapshotButtons = (grid, previousButton, nextButton) => {
    const maxScrollLeft = Math.max(0, grid.scrollWidth - grid.clientWidth);
    const hasOverflow = maxScrollLeft > 2;
    const atStart = grid.scrollLeft <= 2;
    const atEnd = maxScrollLeft - grid.scrollLeft <= 2;

    previousButton.hidden = !hasOverflow || atStart;
    previousButton.disabled = !hasOverflow || atStart;
    nextButton.hidden = !hasOverflow || atEnd;
    nextButton.disabled = !hasOverflow || atEnd;
  };

  const setupSnapshotGrid = (grid) => {
    if (snapshotInitialized.has(grid)) return;
    snapshotInitialized.add(grid);

    const section = grid.closest('.wt-city-snapshot');
    if (!section || grid.closest('.wt-city-snapshot__viewport')) return;

    snapshotGridSequence += 1;
    if (!grid.id) grid.id = `wt-city-snapshot-grid-${snapshotGridSequence}`;

    const viewport = document.createElement('div');
    viewport.className = 'wt-city-snapshot__viewport';
    grid.parentNode.insertBefore(viewport, grid);
    viewport.appendChild(grid);

    const previousButton = createSnapshotScrollButton('previous', grid.id);
    const nextButton = createSnapshotScrollButton('next', grid.id);
    viewport.append(previousButton, nextButton);

    const update = () => updateSnapshotButtons(grid, previousButton, nextButton);
    let scrollFrame = 0;

    const scheduleUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        update();
      });
    };

    previousButton.addEventListener('click', () => {
      grid.scrollBy({ left: -getSnapshotScrollStep(grid), behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
      grid.scrollBy({ left: getSnapshotScrollStep(grid), behavior: 'smooth' });
    });

    grid.addEventListener('scroll', scheduleUpdate, { passive: true });

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(grid);
      Array.from(grid.children).forEach((card) => resizeObserver.observe(card));
    } else {
      window.addEventListener('resize', scheduleUpdate, { passive: true });
    }

    window.addEventListener('load', scheduleUpdate, { once: true });
    update();
  };

  const setup = () => {
    const lists = Array.from(document.querySelectorAll(selectors));
    lists.forEach(setupList);

    const snapshotGrids = Array.from(document.querySelectorAll('.wt-city-snapshot__grid'));
    snapshotGrids.forEach(setupSnapshotGrid);

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
