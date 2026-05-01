
// Open buttons
document.querySelectorAll('.openModalBtnCustom, .openModalBtn').forEach(button => {
  button.addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal-id');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  });
});

// Close buttons (X)
document.querySelectorAll('.close, .close-custom').forEach(button => {
  button.addEventListener('click', function () {
    const modal = this.closest('.modal-custom') || this.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
    }
  });
});

// Click outside modal content closes the modal
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal') || event.target.classList.contains('modal-custom')) {
    event.target.classList.remove('active');
  }
});

// ESC key to close any open modal
document.addEventListener('keydown', function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll('.modal, .modal-custom').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});