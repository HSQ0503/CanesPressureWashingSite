export class FAQ {
	constructor() {
		const faqContainers = document.querySelectorAll(".faq-container");

		for (const faqContainer of faqContainers) {
			const faqItems = faqContainer.querySelectorAll(".faq-item");

			for (const item of faqItems) {
				const trigger = item.querySelector(".faq-title");
				const body = item.querySelector(".faq-body");

				if (!trigger || !body) continue;

				const setExpanded = (expanded) => {
					trigger.setAttribute("aria-expanded", String(expanded));
					body.hidden = !expanded;
					body.style.display = expanded ? "block" : "none";
				};

				if (trigger.tagName !== "BUTTON") {
					trigger.setAttribute("role", "button");
					trigger.tabIndex = 0;
				}

				setExpanded(false);

				trigger.addEventListener("click", () => {
					setExpanded(trigger.getAttribute("aria-expanded") !== "true");
				});

				if (trigger.tagName !== "BUTTON") {
					trigger.addEventListener("keydown", (event) => {
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							trigger.click();
						}
					});
				}
			}
		}
	}
}
