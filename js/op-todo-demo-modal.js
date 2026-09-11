const EMBED_SRC =
  'https://www.youtube.com/embed/QP5To75Q7bo?autoplay=1&rel=0';

const modal = document.getElementById('opTodoDemoModal');
const openBtn = document.getElementById('opTodoWatchDemo');
const frame = document.getElementById('opTodoDemoFrame');

if (modal && openBtn && frame) {
  let lastFocus = null;

  function setExpanded(open) {
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function openModal() {
    lastFocus = document.activeElement;
    frame.src = EMBED_SRC;
    modal.hidden = false;
    setExpanded(true);
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.demo-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    frame.src = '';
    setExpanded(false);
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    } else {
      openBtn.focus();
    }
  }

  openBtn.addEventListener('click', openModal);

  modal.addEventListener('click', (event) => {
    if (event.target.closest('[data-demo-close]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}
