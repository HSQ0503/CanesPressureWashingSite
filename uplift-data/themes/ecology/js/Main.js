import { Articles } from "./Articles.js";
import { FAQ } from "./FAQ.js";
import { Navigation } from "./Navigation.js";
import { Pagination } from "./Pagination.js";
import { Pelican } from "./Pelican.js";
import { Projects } from "./Projects.js";
import { Reviews } from "./Reviews.js";
import { Services } from "./Services.js";

class Main {
	constructor() {
		new Articles();
		new FAQ();
		new Navigation();
		new Pagination();
		new Pelican();
		new Projects();
		new Reviews();
		new Services();
	}
}

new Main();
