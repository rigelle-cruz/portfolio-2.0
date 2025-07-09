document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('.nav');
	const main = document.querySelector('main');
	const sections = document.querySelectorAll('main > div[id]');
	const navLinks = nav.querySelectorAll('a');

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

	// Highlight active nav link when scrolling
	function updateActiveNavLink() {
		let found = false;
		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			const mainRect = main.getBoundingClientRect();
			if (!found && rect.top < mainRect.bottom && rect.bottom > mainRect.top) {
				navLinks.forEach((link) => {
					link.classList.toggle(
						'nav-active-link',
						link.getAttribute('href') === `#${section.id}`
					);
				});
				found = true;
			}
		});
		if (!found) {
			navLinks.forEach((link) => link.classList.remove('nav-active-link'));
		}
	}

	main.addEventListener('scroll', () => {
		updateNavDark();
		updateActiveNavLink();
	});
	window.addEventListener('resize', () => {
		updateNavDark();
		updateActiveNavLink();
	});
	updateNavDark();
	updateActiveNavLink();

	// Hamburger menu toggle
	const navToggle = document.querySelector('.nav-toggle');

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
