document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('.nav');
	const main = document.querySelector('main');
	const sections = document.querySelectorAll('main > div[id]');

	main.addEventListener('scroll', () => {
		if (main.scrollTop > 50) {
			nav.classList.add('scrolled');
		} else {
			nav.classList.remove('scrolled');
		}

		// Detect which section is in view
		let navDark = false;
		sections.forEach((section) => {
			const rect = section.getBoundingClientRect();
			const mainRect = main.getBoundingClientRect();
			// Check if section is mostly in view
			if (rect.top < mainRect.bottom && rect.bottom > mainRect.top) {
				if (section.classList.contains('dark-section')) {
					navDark = true;
				}
			}
		});
		if (navDark) {
			nav.classList.add('nav-dark');
		} else {
			nav.classList.remove('nav-dark');
		}
	});
});
