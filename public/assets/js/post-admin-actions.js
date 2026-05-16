(function () {
  function escapeForMessage(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  async function deletePost(button) {
    const slug = String(button.dataset.slug || '').trim();
    const title = escapeForMessage(button.dataset.title || slug || '이 글');
    if (!slug) return;

    const confirmed = window.confirm("'" + title + "' 글을 삭제할까요? 삭제 후 되돌릴 수 없습니다.");
    if (!confirmed) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = '삭제 중…';

    try {
      const res = await fetch('/api/posts/' + encodeURIComponent(slug), {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' }
      });
      const json = await res.json().catch(function () { return {}; });
      if (!res.ok) throw new Error((json && json.message) || ('삭제 실패 (' + res.status + ')'));

      const redirect = String(button.dataset.deleteRedirect || '').trim();
      if (redirect === 'reload') {
        window.location.reload();
        return;
      }
      if (redirect) {
        window.location.href = redirect;
        return;
      }

      const item = button.closest('.travel-list__item, .dashboard-popular__item, .post-card, article');
      if (item) item.remove();
    } catch (err) {
      alert((err && err.message) || '삭제 중 오류가 발생했습니다.');
      button.disabled = false;
      button.textContent = originalText || '삭제';
    }
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('.js-delete-post');
    if (!button) return;
    event.preventDefault();
    deletePost(button);
  });
})();
