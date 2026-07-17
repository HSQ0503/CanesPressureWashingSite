export class Reviews {
	constructor() {
		let reviewSlider = document.querySelector(".review-slider");
		
		if(reviewSlider) {
			new Splide(reviewSlider, {
				perPage: 3,
				focus: 0,
				omitEnd: true,
				breakpoints: {
					991: {
						arrows: false,
						perPage: 2,
						padding: '3rem',
					},
					767: {
						arrows: false,
						perPage: 1,
						padding: '1.5rem',
					}
				}
			}).mount();
		}
	}
}