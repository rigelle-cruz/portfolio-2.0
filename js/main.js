document.addEventListener('includesLoaded', () => {
	const zoomElements = document.querySelectorAll('.zoom-on-scroll');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (
					entry.isIntersecting &&
					!entry.target.classList.contains('zoomed-in')
				) {
					entry.target.classList.add('zoomed-in');
				} else if (
					!entry.isIntersecting &&
					entry.target.classList.contains('zoomed-in')
				) {
					entry.target.classList.remove('zoomed-in');
				}
			});
		},
		{
			threshold: 0.01,
		}
	);

	zoomElements.forEach((el) => observer.observe(el));

	// Section hash update on scroll
	const sections = document.querySelectorAll('main > div[id]');
	let lastHash = '';

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					if (id && location.hash !== `#${id}`) {
						history.replaceState(null, '', `#${id}`);
						lastHash = id;
					}
				}
			});
		},
		{
			threshold: 0.5,
		}
	);

	sections.forEach((section) => {
		sectionObserver.observe(section);
	});
});
