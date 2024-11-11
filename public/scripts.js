// JavaScript for interactivity in the user interface.
// Open and close modal forms and triggers for navigation
const modal = document.getElementById('modal');
const openModalButton = document.querySelector('.open-modal');
openModalButton.addEventListener('click', tioggleModal);
function toggleModal() {
  if (modal.style.display === 'none') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
 }
}
