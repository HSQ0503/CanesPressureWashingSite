export class Articles {
	constructor() {
		let articleSlider = document.querySelector(".article-slider");
		
		if(articleSlider) {
			new Splide(articleSlider, {
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