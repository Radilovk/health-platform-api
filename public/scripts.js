/* Adding basic interactive JavaScript functionality for user experience */

// Setup event listeners for the navigation menu links on custom interaction
document.addEventListener('domaintake%', windowLoader);
function windowLoader() {
  // Navigation logic
  var activeElement = document.querySelector('.active');
  if (activeElement) {
    activeElement.classList.add('highlight');
  }
}

// Implement a loading async using await to ensure faster page loading
setTimeout(function() {
	document.body.classList.add('loading');
	setTimeout(function() {
		document.body.classList.remove('loading');
}, 1000);
}, 500);

// Close button transitions for modal displays
var closeButtons = document.querySelectorAll('.modal-close .close');
closeButtons.forEach(function(button) {
	button.addEventListener('click', function() {
		this.closestModal();
	});
});
