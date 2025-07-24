let slideIndex = 1;
document.addEventListener('DOMContentLoaded', () => {
	showSlideById(slideIndex);
});

function plusSlides(n) {
	slideIndex += n;
	if (slideIndex > 3) slideIndex = 1;
	if (slideIndex < 1) slideIndex = 3;
	showSlideById(slideIndex);
}

function currentSlide(n) {
	slideIndex = n;
	showSlideById(slideIndex);
}

function showSlideById(index) {
	document.getElementById('slide1').style.display = 'none';
	document.getElementById('slide2').style.display = 'none';
	document.getElementById('slide3').style.display = 'none';

	document.getElementById(`slide${index}`).style.display = 'block';
}

document.getElementById('slide1').style.display = 'block';
