export class Pelican {
	constructor() {
		this.addQuoteConcierge();
	}

	addQuoteConcierge() {
		if (document.body.classList.contains("home-page")) return;
		if (document.querySelector(".pelican-quote-concierge")) return;

		const footer = document.querySelector("#footer");
		if (!footer) return;

		const isThanksPage = window.location.pathname.replace(/\/$/, "").endsWith("/thanks");
		const concierge = document.createElement("aside");
		concierge.className = "pelican-quote-concierge";
		concierge.setAttribute("aria-labelledby", "pelican-concierge-title");
		concierge.innerHTML = `
			<div class="container">
				<div class="pelican-quote-concierge__card">
					<picture class="pelican-quote-concierge__mascot">
						<source srcset="/uplift-data/images/brand/canes-pelican-320.webp 320w, /uplift-data/images/brand/canes-pelican-640.webp 640w" sizes="(max-width: 575px) 104px, 164px" type="image/webp">
						<img src="/uplift-data/images/brand/canes-pelican.webp" width="320" height="340" loading="lazy" decoding="async" alt="Canes pelican mascot">
					</picture>
					<div class="pelican-quote-concierge__copy">
						<p class="pelican-quote-concierge__eyebrow">${isThanksPage ? "Request received" : "Your local clean-up crew"}</p>
						<h2 id="pelican-concierge-title">${isThanksPage ? "Thanks for choosing Canes!" : "Ready to bring your property back to life?"}</h2>
						<p>${isThanksPage ? "We’ll be in touch soon to discuss your project." : "Tell us what needs cleaning and get a free, no-pressure quote from our Palm Beach County team."}</p>
					</div>
					<a class="pelican-quote-concierge__button" href="${isThanksPage ? "/" : "/contact-us#quote"}">${isThanksPage ? "Back to Home" : "Get a Free Quote"}<i class="bi bi-arrow-right" aria-hidden="true"></i></a>
				</div>
			</div>`;

		footer.parentNode.insertBefore(concierge, footer);
	}
}
