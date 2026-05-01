// Variable to track if the modal has already been shown
let modalShown = false;

// Function to show the modal
function showLeadMagnetModal() {
    const modal = document.getElementById('leadMagnetModal');
    if (modal && !modalShown) {
        modal.classList.add('active'); // Add the class instead of setting display
        modalShown = true;
        localStorage.setItem('leadMagnetModalLastShown', new Date().getTime());
    }
}

// Check if the modal should be shown
function checkModalDisplay() {
    const lastShown = localStorage.getItem('leadMagnetModalLastShown');
    const now = new Date().getTime();

    // If never shown or more than 60 days ago
    if (!lastShown || (now - lastShown) > 60 * 24 * 60 * 60 * 1000) {
        // Exit intent listener only
        document.addEventListener('mouseout', function(event) {
            if (!modalShown && event.clientY < 0) {
                showLeadMagnetModal();
            }
        });
    }
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('leadMagnetModal');
    if (modal) {
        modal.classList.remove('active'); // Remove the class instead of display
        localStorage.setItem('leadMagnetModalLastShown', new Date().getTime());
        modalShown = true;
    }
}

// Attach close event to any .close-custom buttons inside the modal
document.querySelectorAll('#leadMagnetModal .close-custom').forEach(button => {
    button.addEventListener('click', closeModal);
});

// Run check on page load
window.onload = checkModalDisplay;