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

	// Slide logic for about section
	const aboutSummary = document.getElementById('about-summary');
	const skillsSummary = document.getElementById('skills-summary');
	const skillsContainer = document.querySelector('.about-skills-container');

	const toAboutBtn = document.getElementById('to-about');
	const toSkillsBtn = document.getElementById('to-skills');

	let autoSlide = true;
	let current = 0; 
	let intervalId = null;

	function showSlide(idx) {
		if (idx === 0) {
			aboutSummary.classList.add('active');
			skillsSummary.classList.remove('active');
			toAboutBtn.classList.add('active');
			toSkillsBtn.classList.remove('active');
		} else {
			aboutSummary.classList.remove('active');
			skillsSummary.classList.add('active');
			toAboutBtn.classList.remove('active');
			toSkillsBtn.classList.add('active');
		}
		current = idx;
	}

	function startAutoSlide() {
		if (intervalId) clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (autoSlide) {
				showSlide(current === 0 ? 1 : 0);
			}
		}, 5000);
	}

	toAboutBtn.addEventListener('click', () => {
		showSlide(0);
		autoSlide = false;
	});
	toSkillsBtn.addEventListener('click', () => {
		showSlide(1);
		autoSlide = false;
	});

	if (skillsContainer) {
		skillsContainer.addEventListener('mouseenter', () => {
			autoSlide = false;
		});
		skillsContainer.addEventListener('mouseleave', () => {
			autoSlide = true;
		});
	}

	showSlide(0);
	startAutoSlide();
});
