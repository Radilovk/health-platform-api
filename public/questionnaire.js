document.getElementById('questionnaire-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/questionnaire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Form submitted successfully!');
            e.target.reset();
        } else {
            alert('Error submitting the form.');
        }
    } catch (err) {
        console.error(err);
        alert('Network error.');
    }
});
