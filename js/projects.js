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
}
