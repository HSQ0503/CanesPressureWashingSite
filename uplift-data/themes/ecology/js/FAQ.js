export class FAQ {
	constructor() {
		let faqContainer = document.querySelector(".faq-container");
		
		if(faqContainer) {
			let faqItems = faqContainer.querySelectorAll(".faq-item");
			
			for(let item of faqItems) {
				item.addEventListener("click", () => {
					let body = item.querySelector(".faq-body");
					
					if(window.getComputedStyle(body).display === "none") {
						body.style.display = "block";
					} else {
						body.style.display = "none";
					}
				});
			}	
		}
	}
}