document.addEventListener('includesLoaded', () => {
	// === ZOOM EFFECT ON SCROLL ===
	const zoomElements = document.querySelectorAll('.zoom-on-scroll');
	// Observer for zooming elements in/out on scroll
	const zoomObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				entry.target.classList.toggle('zoomed-in', entry.isIntersecting);
			});
		},
		{ threshold: 0.01 }
	);
	zoomElements.forEach((el) => zoomObserver.observe(el));

	// === SECTION HASH UPDATE ON SCROLL ===
	const sections = document.querySelectorAll('main > div[id]');
	let lastHash = '';
	// Observer for updating the URL hash as sections enter the viewport
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
		{ threshold: 0.5 }
	);
	sections.forEach((section) => sectionObserver.observe(section));

	// === ABOUT SECTION SLIDE LOGIC ===
	const aboutSummary = document.getElementById('about-summary');
	const skillsSummary = document.getElementById('skills-summary');
	const skillsContainer = document.querySelector('.about-skills-container');
	const toAboutBtn = document.getElementById('to-about');
	const toSkillsBtn = document.getElementById('to-skills');

	let autoSlide = true;
	let current = 0;
	let intervalId;

	// Show the correct slide (about/skills)
	function showSlide(idx) {
		aboutSummary.classList.toggle('active', idx === 0);
		skillsSummary.classList.toggle('active', idx === 1);
		toAboutBtn.classList.toggle('active', idx === 0);
		toSkillsBtn.classList.toggle('active', idx === 1);
		current = idx;
	}

	// Start the automatic slide switching
	function startAutoSlide() {
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (autoSlide) showSlide(current === 0 ? 1 : 0);
		}, 5000);
	}

	// --- EVENT: About button click ---
	toAboutBtn.addEventListener('click', () => {
		showSlide(0);
		autoSlide = false;
	});
	// --- EVENT: Skills button click ---
	toSkillsBtn.addEventListener('click', () => {
		showSlide(1);
		autoSlide = false;
	});

	// --- EVENTS: Pause/resume auto-slide on skills container hover ---
	if (skillsContainer) {
		skillsContainer.addEventListener('mouseenter', () => (autoSlide = false));
		skillsContainer.addEventListener('mouseleave', () => (autoSlide = true));
	}

	// Initialize first slide and start auto-slide
	showSlide(0);
	startAutoSlide();
});
