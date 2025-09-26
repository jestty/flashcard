/* ================= Flashcard App JS ================= */
const STORAGE_KEY = 'flashcards_v1';
let cards = [];
let currentIndex = 0;
let editingIndex = null; // dùng để phân biệt thêm/sửa

/* --------- Load / Save cards --------- */
function loadCards() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      cards = JSON.parse(raw);
    } catch {
      cards = [];
    }
  }
  if (!cards || cards.length === 0) {
    cards = [{ front: 'Nhấn để lật thẻ', back: 'Mô tả/đáp án' }];
    currentIndex = 0;
    saveCards();
  }
}

function saveCards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

/* --------- Render card & counter --------- */
function renderCard() {
  const el = document.getElementById('flashcard');
  const counter = document.getElementById('cardCounter');
  if (!el || cards.length === 0) return;
  const card = cards[currentIndex];
  el.textContent = card.front;
  el.dataset.side = 'front';
  if (counter)
    counter.textContent = `Thẻ #${currentIndex + 1} / ${cards.length}`;
}

/* --------- Flip / Next card --------- */
function flipCard() {
  const el = document.getElementById('flashcard');
  if (!el || cards.length === 0) return;
  const card = cards[currentIndex];
  if (el.dataset.side === 'back') {
    el.textContent = card.front;
    el.dataset.side = 'front';
  } else {
    el.textContent = card.back;
    el.dataset.side = 'back';
  }
}

function nextCard() {
  if (cards.length === 0) return;
  currentIndex = (currentIndex + 1) % cards.length;
  renderCard();
}

/* --------- Form show / hide --------- */
function showForm(isEdit = false) {
  const form = document.getElementById('cardForm');
  const front = document.getElementById('frontInput');
  const back = document.getElementById('backInput');
  if (!form || !front || !back) return;

  if (isEdit) {
    const card = cards[currentIndex];
    front.value = card.front;
    back.value = card.back;
    document.getElementById('formTitle').textContent = 'Sửa thẻ';
    editingIndex = currentIndex;
  } else {
    front.value = '';
    back.value = '';
    document.getElementById('formTitle').textContent = 'Thêm thẻ';
    editingIndex = null;
  }

  form.classList.remove('hidden');
  form.setAttribute('aria-hidden', 'false');
  front.focus();
}

function hideForm() {
  const form = document.getElementById('cardForm');
  if (!form) return;
  form.classList.add('hidden');
  form.setAttribute('aria-hidden', 'true');
}

/* --------- Save from form (thêm / sửa) --------- */
function saveFromForm() {
  const front = document.getElementById('frontInput').value.trim();
  const back = document.getElementById('backInput').value.trim();
  if (!front) {
    alert('Mặt trước không được để trống.');
    return;
  }

  if (editingIndex !== null) {
    // sửa thẻ hiện tại
    cards[editingIndex].front = front;
    cards[editingIndex].back = back;
    currentIndex = editingIndex;
  } else {
    // thêm thẻ mới
    cards.push({ front, back });
    currentIndex = cards.length - 1;
  }

  saveCards();
  renderCard();
  hideForm();
  editingIndex = null;
}

/* --------- Edit / Delete card --------- */
function editCard() {
  if (cards.length === 0) return;
  showForm(true);
}

function deleteCard() {
  if (cards.length === 0) return;
  if (!confirm('Bạn có chắc muốn xóa thẻ này?')) return;
  cards.splice(currentIndex, 1);
  if (currentIndex >= cards.length) currentIndex = cards.length - 1;
  if (cards.length === 0) {
    cards = [{ front: 'Nhấn để lật thẻ', back: 'Mô tả/đáp án' }];
    currentIndex = 0;
  }
  saveCards();
  renderCard();
}


/* --------- Dark Mode --------- */
function applyThemeByTime() {
  const hour = new Date().getHours();
  const body = document.body;
  if (body.dataset.manualTheme === 'true') return;
  if (hour >= 19 || hour < 7) body.classList.add('dark-mode');
  else body.classList.remove('dark-mode');
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  body.dataset.manualTheme = 'true';
}

/* --------- DOM Ready --------- */
document.addEventListener('DOMContentLoaded', () => {
  loadCards();
  renderCard();

  window.flipCard = flipCard;

  const nextBtn = document.getElementById('nextBtn');
  const addBtn = document.getElementById('addBtn');
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const themeBtn = document.getElementById('themeToggleBtn');

  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (addBtn) addBtn.addEventListener('click', () => showForm(false));
  if (saveBtn) saveBtn.addEventListener('click', saveFromForm);
  if (cancelBtn) cancelBtn.addEventListener('click', hideForm);
  if (editBtn) editBtn.addEventListener('click', editCard);
  if (deleteBtn) deleteBtn.addEventListener('click', deleteCard);
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideForm();
  });

  applyThemeByTime();
  setInterval(applyThemeByTime, 5 * 60 * 1000); // update mỗi 5 phút
});

