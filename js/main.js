// === LOADING SCREEN & COMPUTER OVERLAY PRELOAD ===
document.addEventListener('includesLoaded', () => {
	const overlayImg = document.getElementById('computerOverlayImg');
	const main = document.querySelector('main');
	const loadingScreen = document.getElementById('loading-screen');

	function showContent() {
		if (loadingScreen) loadingScreen.classList.add('fade-out');
		setTimeout(() => {
			if (loadingScreen) loadingScreen.style.display = 'none';
			if (main) main.style.display = '';
			if (overlayImg) overlayImg.style.display = '';
			document.body.classList.remove('loading');
			document.body.style.overflow = 'auto';
		}, 500);
	}

	if (overlayImg && overlayImg.complete) {
		showContent();
	} else if (overlayImg) {
		overlayImg.addEventListener('load', showContent);
	} else {
		// fallback: if overlayImg not found, just show content after window load
		window.addEventListener('load', showContent);
	}
});

document.addEventListener('includesLoaded', () => {
	// === SECTION HASH UPDATE ON SCROLL ===
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

	function showSlide(idx) {
		aboutSummary.classList.toggle('active', idx === 0);
		skillsSummary.classList.toggle('active', idx === 1);
		toAboutBtn.classList.toggle('active', idx === 0);
		toSkillsBtn.classList.toggle('active', idx === 1);
		current = idx;
	}

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

	// === COMPUTER OVERLAY LOGIC REMOVED: Overlay is always visible after load ===
});
