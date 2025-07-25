let slideIndex = 1;
document.addEventListener('DOMContentLoaded', () => {
	showSlides(slideIndex);
});

function plusSlides(n) {
	showSlides((slideIndex += n));
}

function currentSlide(n) {
	slideIndex = n;
	showSlides(slideIndex);
}

function showSlides(n) {
	const slides = document.getElementsByClassName('mySlides');
	const browserImage = document.getElementById('browser-image');

	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	// Hide all slides
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}

	// Show the current slide
	slides[slideIndex - 1].style.display = 'block';

	// Update the browser image based on the current slide
	const imageSources = [
		'assets/images/projects/cozy.jpg',
		'assets/images/projects/habit-tracker.GIF',
		'assets/images/projects/boba-buddies-landing.svg',
	];
	browserImage.src = imageSources[slideIndex - 1];
}
