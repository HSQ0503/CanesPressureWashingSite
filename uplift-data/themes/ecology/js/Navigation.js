export class Navigation {
	constructor() {
		this.mobileWidth = 1199;
		this.menuOpen = false;
		this.labelPrimaryNavigation();
		this.initHeaderQuoteButton();
		this.initDropdowns();
		this.initMenuToggle();
	}

	labelPrimaryNavigation() {
		const navigation = document.querySelector(".main-navigation");
		if (navigation && !navigation.hasAttribute("aria-label")) {
			navigation.setAttribute("aria-label", "Primary navigation");
		}
	}

	initHeaderQuoteButton() {
		const container = document.querySelector(".menu-button-container");
		const menuButton = container?.querySelector(".menu-open-button");

		if (!container || !menuButton || container.querySelector(".navigation-quote-button")) return;

		const quoteButton = document.createElement("a");
		quoteButton.className = "navigation-quote-button";
		quoteButton.href = "/contact-us#quote";
		quoteButton.setAttribute("aria-label", "Get a free pressure washing quote");
		quoteButton.innerHTML = '<span class="quote-long">Free Quote</span><span class="quote-short">Quote</span>';
		container.insertBefore(quoteButton, menuButton);
	}
	
	initDropdowns() {
		const dropdowns = document.querySelectorAll(".navigation-link-1, .navigation-link-2");
	
		dropdowns.forEach(dropdown => {
			const content = dropdown.querySelector(".dropdown-content-1, .dropdown-content-2");
			const trigger = dropdown.querySelector("a");
	
			if(content && trigger) {
				trigger.setAttribute("aria-haspopup", "true");
				trigger.setAttribute("aria-expanded", "false");
				const setDesktopExpanded = (expanded) => {
					if (window.innerWidth <= this.mobileWidth) return;
					content.style.display = expanded ? "block" : null;
					trigger.setAttribute("aria-expanded", String(expanded));
				};

				dropdown.addEventListener("mouseenter", () => {
					setDesktopExpanded(true);
				});
	
				dropdown.addEventListener("mouseleave", () => {
					if (!dropdown.contains(document.activeElement)) setDesktopExpanded(false);
				});

				dropdown.addEventListener("focusin", () => {
					setDesktopExpanded(true);
				});

				dropdown.addEventListener("focusout", (event) => {
					if (!dropdown.contains(event.relatedTarget)) setDesktopExpanded(false);
				});
	
				trigger.addEventListener("click", (event) => this.toggleDropdown(event, content, trigger));
			}
		});
	}
	
	toggleDropdown(event, content, trigger) {
		if (window.innerWidth <= this.mobileWidth) {
			event.preventDefault();
			const open = content.style.display !== "block";
			content.style.display = open ? "block" : null;
			trigger.setAttribute("aria-expanded", String(open));
		}
	}
	
	initMenuToggle() {
		const menuButton = document.querySelector(".menu-open-button");
		const navigationItems = document.querySelector(".navigation-items");
		const backdrop = document.querySelector(".mobile-nav-backdrop");
		const menuTop = navigationItems?.querySelector(".menu-top");
		const menuContainer = document.querySelector(".menu-button-container");

		if (!menuButton || !navigationItems) return;

		menuContainer?.removeAttribute("tabindex");
		navigationItems.id ||= "primary-navigation";
		menuButton.setAttribute("aria-controls", navigationItems.id);
		menuButton.setAttribute("aria-expanded", "false");

		let closeButton = navigationItems.querySelector(".menu-close-button");
		if (!closeButton && menuTop) {
			closeButton = document.createElement("button");
			closeButton.type = "button";
			closeButton.className = "menu-close-button";
			closeButton.setAttribute("aria-label", "Close navigation menu");
			closeButton.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i>';
			menuTop.appendChild(closeButton);
		}

		const openMenu = () => {
			if (window.innerWidth > this.mobileWidth) return;
			this.menuOpen = true;
			navigationItems.style.display = "flex";
			navigationItems.classList.add("is-open");
			backdrop?.classList.add("active");
			document.body.classList.add("navigation-open");
			menuButton.setAttribute("aria-expanded", "true");
			closeButton?.focus();
		};

		const closeMenu = (returnFocus = false) => {
			if (!this.menuOpen && window.innerWidth <= this.mobileWidth) return;
			this.menuOpen = false;
			navigationItems.style.display = null;
			navigationItems.classList.remove("is-open");
			backdrop?.classList.remove("active");
			document.body.classList.remove("navigation-open");
			menuButton.setAttribute("aria-expanded", "false");
			navigationItems.querySelectorAll('[aria-expanded="true"]').forEach((trigger) => {
				trigger.setAttribute("aria-expanded", "false");
				const content = trigger.parentElement?.querySelector(":scope > .dropdown-content-1, :scope > .dropdown-content-2");
				if (content) content.style.display = null;
			});
			if (returnFocus) menuButton.focus();
		};

		menuButton.addEventListener("click", openMenu);
		closeButton?.addEventListener("click", () => closeMenu(true));
		backdrop?.addEventListener("click", () => closeMenu(true));
		document.querySelector(".navigation-quote-button")?.addEventListener("click", () => closeMenu());

		navigationItems.addEventListener("click", (event) => {
			const link = event.target.closest("a");
			if (link && !link.hasAttribute("aria-haspopup")) closeMenu();
		});

		document.addEventListener("keydown", (event) => {
			if (!this.menuOpen) return;

			if (event.key === "Escape") {
				event.preventDefault();
				closeMenu(true);
				return;
			}

			if (event.key !== "Tab") return;
			const focusable = Array.from(
				navigationItems.querySelectorAll('a[href], button:not([disabled])'),
			).filter((element) => element.getClientRects().length > 0);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});

		window.addEventListener("resize", () => {
			if (window.innerWidth > this.mobileWidth && this.menuOpen) closeMenu();
		});
	}
}
