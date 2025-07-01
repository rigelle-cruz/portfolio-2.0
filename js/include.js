document.addEventListener('DOMContentLoaded', () => {
	const includeElements = document.querySelectorAll('[data-include]');

	includeElements.forEach(async (el) => {
		const file = el.getAttribute('data-include');
		try {
			const res = await fetch(file);
			if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
			const html = await res.text();
			el.innerHTML = html;
		} catch (err) {
			console.error(`Could not load ${file}:`, err);
		}
	});
});
