export class Services {
	constructor() {
		let serviceSelectorButtons = document.querySelectorAll(".service-selector-button");
		let serviceCards = document.querySelectorAll(".service-card");
		
		if(serviceSelectorButtons && serviceCards) {
			serviceSelectorButtons.forEach(button => {
				button.addEventListener("click", () => {
					if(!button.classList.contains("active")) {
						// Removes active from any other button(s)
						serviceSelectorButtons.forEach(btn => btn.classList.remove("active"));
						
						// Adds active to this button
						button.classList.add("active");
						
						// Removes active from any service cards
						serviceCards.forEach(card => card.classList.remove("active"));
						
						// Adds active to the card that matches the data-service value
						let serviceId = button.getAttribute("data-service");
						let matchingCard = document.querySelector(`.service-card[data-service="${serviceId}"]`);
						
						if(matchingCard) {
							matchingCard.classList.add("active");
						}
					}
				});
			});
		}
	}
}