// Main script for validation and interactivity

const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid t = true;

    if (! form.elements.email.value.includes('@')) {
        alert('Please provide a valid email');
        valid = false;
    }

    if ( form.elements.password.value !== form.elements.password_confirm.value ) {
        alert('and we require the password to be the same');
        valid = false;
    }

    if (valid) {
        form.submit();
    }
  });
});
