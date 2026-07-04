(function () {
  'use strict';

  var AGODA_LINK_SELECTOR = 'a[data-wt-hotel-link="agoda"]';
  var ONE_DAY_MS = 24 * 60 * 60 * 1000;

  function toSafeNumber(value) {
    var number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.floor(number) : null;
  }

  function makeLocalDate(year, month, day) {
    return new Date(year, month, day, 12, 0, 0, 0);
  }

  function addDays(date, days) {
    return makeLocalDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + days
    );
  }

  function addMonthsClamped(date, months) {
    var targetBase = makeLocalDate(date.getFullYear(), date.getMonth() + months, 1);
    var targetYear = targetBase.getFullYear();
    var targetMonth = targetBase.getMonth();
    var lastDayOfTargetMonth = makeLocalDate(targetYear, targetMonth + 1, 0).getDate();
    var targetDay = Math.min(date.getDate(), lastDayOfTargetMonth);

    return makeLocalDate(targetYear, targetMonth, targetDay);
  }

  function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    return year + '-' + month + '-' + day;
  }

  function dateToUTC(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function diffDays(startDate, endDate) {
    return Math.max(1, Math.round((dateToUTC(endDate) - dateToUTC(startDate)) / ONE_DAY_MS));
  }

  function getStayDates(link) {
    var now = new Date();
    var today = makeLocalDate(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    var stayDays = toSafeNumber(link.dataset.wtStayDays);
    var stayType = link.dataset.wtStayType || 'month';
    var checkOut;

    if (stayDays) {
      checkOut = addDays(today, stayDays);
    } else if (stayType === 'month') {
      checkOut = addMonthsClamped(today, 1);
    } else {
      checkOut = addMonthsClamped(today, 1);
    }

    return {
      checkIn: today,
      checkOut: checkOut,
      los: diffDays(today, checkOut)
    };
  }

  function updateAgodaDate(link) {
    if (!link || !link.href) return;

    try {
      var url = new URL(link.href);
      var stay = getStayDates(link);

      url.searchParams.set('checkIn', formatDate(stay.checkIn));
      url.searchParams.set('checkOut', formatDate(stay.checkOut));
      url.searchParams.set('los', String(stay.los));

      link.href = url.toString();
    } catch (error) {
      // 링크 형식이 URL로 해석되지 않는 경우 기존 href를 그대로 둡니다.
    }
  }

  function updateFromEvent(event) {
    if (!event.target || typeof event.target.closest !== 'function') return;

    var link = event.target.closest(AGODA_LINK_SELECTOR);
    if (!link) return;

    updateAgodaDate(link);
  }

  document.addEventListener('pointerdown', updateFromEvent, { passive: true });
  document.addEventListener('click', updateFromEvent);
  document.addEventListener('auxclick', updateFromEvent);
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    updateFromEvent(event);
  });
}());
