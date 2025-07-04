document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('.nav');
	const main = document.querySelector('main');

	main.addEventListener('scroll', () => {
		if (main.scrollTop > 50) {
			nav.classList.add('scrolled');
		} else {
			nav.classList.remove('scrolled');
		}
	});
});
