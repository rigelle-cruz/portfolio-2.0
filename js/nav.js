document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('.nav');
	const main = document.querySelector('main');
	const sections = document.querySelectorAll('main > div[id]');

	function updateNavDark() {
		let navDark = false;
		const isSmallScreen = window.innerWidth <= 537;

		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			const mainRect = main.getBoundingClientRect();

			if (rect.top < mainRect.bottom && rect.bottom > mainRect.top) {
				if (
					section.classList.contains('dark-section') ||
					(isSmallScreen && section.hasAttribute('data-nav-dark'))
				) {
					navDark = true;
				}
			}
		});
		if (navDark) {
			nav.classList.add('nav-dark');
		} else {
			nav.classList.remove('nav-dark');
		}
	}

	main.addEventListener('scroll', updateNavDark);
	window.addEventListener('resize', updateNavDark);
	updateNavDark();

	// Hamburger menu toggle
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = nav.querySelectorAll('a');

	if (navToggle) {
		navToggle.addEventListener('click', () => {
			const isOpen = nav.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', isOpen);
		});

		navLinks.forEach((link) => {
			link.addEventListener('click', () => {
				if (window.innerWidth <= 900) {
					nav.classList.remove('open');
					navToggle.setAttribute('aria-expanded', false);
				}
			});
		});
	}
});
