// Basic javaScript for the health platform

// This script will contain functions to handle user interactivity.

// Example: Update specific content when a button is clicked.

document.getElementById('someButton').addEventListener('click', function() {
    alert('Button has been clicked!');
});


// Adding Google Analytics tracking
const script = document.createElement('script');
script.src = 'https://www.google-analytics.com/analytics.js';
document.body.appendChild(script);

window.dataBay_Code = 'tX-J4sI-rx_pDtqJg';

script.onload = function() {
  window.dataBay_init({
    granexId: dataBay_Code
  });
};
