$(document).ready(function () {
	// Initialize tabs
	$("#tabs").tabs();

	// Toggle submenus on hover
	$('.navbar li').hover(function () {
			$(this).children('.submenu').slideToggle('fast');
	});

	// Image gallery overlay
	$('.thumbnail').click(function (event) {
			event.preventDefault();
			var imgSrc = $(this).attr('href');
			$('#overlay-img').attr('src', imgSrc);
			$('#overlay').fadeIn();
	});

	$('#close-overlay').click(function () {
			$('#overlay').fadeOut();
	});

	// More content overlay
	$('#more-content-link').click(function (event) {
			event.preventDefault();
			$('#more-content-overlay').fadeIn();
	});

	$('#close-more-content').click(function () {
			$('#more-content-overlay').fadeOut();
	});

	// Form validation
	$('#contactForm').submit(function (event) {
			var isValid = true;
			var namePattern = /^[A-Za-z ]{3,}$/;
			var emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

			if (!namePattern.test($('#name').val())) {
					alert('Please enter a valid name (at least 3 characters).');
					isValid = false;
			}
			if (!emailPattern.test($('#email').val())) {
					alert('Please enter a valid email address.');
					isValid = false;
			}

			if (!isValid) {
					event.preventDefault();
			}
	});
});
