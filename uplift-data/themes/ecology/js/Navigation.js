export class Navigation {
	constructor() {
		this.mobileWidth = 991;
		this.initDropdowns();
		this.initMenuToggle();
	}
	
	initDropdowns() {
		const dropdowns = document.querySelectorAll(".navigation-link-1, .navigation-link-2");
	
		dropdowns.forEach(dropdown => {
			const content = dropdown.querySelector(".dropdown-content-1, .dropdown-content-2");
			const trigger = dropdown.querySelector("a");
	
			if(content) {
				dropdown.addEventListener("mouseenter", () => {
					if(window.innerWidth > this.mobileWidth) {
						content.style.display = "block";
					}
				});
	
				dropdown.addEventListener("mouseleave", () => {
					if(window.innerWidth > this.mobileWidth) {
						content.style.display = null;
					}
				});
	
				trigger.addEventListener("click", (event) => this.toggleDropdown(event, content));
			}
		});
	}
	
	toggleDropdown(event, content) {
		if (window.innerWidth <= this.mobileWidth) {
			event.preventDefault();
			content.style.display = content.style.display === "block" ? null : "block";
		}
	}
	
	initMenuToggle() {
		const menuButton = document.querySelector(".menu-open-button");
		const closeButton = document.querySelector(".menu-close-button");
		const navigationItems = document.querySelector(".navigation-items");
		const backdrop = document.querySelector(".mobile-nav-backdrop");

		const openMenu = () => {
			navigationItems.style.display = "flex";
			if (backdrop) backdrop.classList.add("active");
		};

		const closeMenu = () => {
			navigationItems.style.display = null;
			if (backdrop) backdrop.classList.remove("active");
		};

		if (menuButton && navigationItems) {
			menuButton.addEventListener("click", openMenu);
		}

		if (closeButton && navigationItems) {
			closeButton.addEventListener("click", closeMenu);
		}

		if (backdrop && navigationItems) {
			backdrop.addEventListener("click", closeMenu);
		}
	}
}