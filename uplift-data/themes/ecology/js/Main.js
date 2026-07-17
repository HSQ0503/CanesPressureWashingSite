import { Articles } from "./Articles.js";
import { FAQ } from "./FAQ.js";
import { Pagination } from "./Pagination.js";
import { Projects } from "./Projects.js";
import { Reviews } from "./Reviews.js";
import { Services } from "./Services.js";

class Main {
	constructor() {
		new Articles();
		new FAQ();
		new Pagination();
		new Projects();
		new Reviews();
		new Services();
	}
}

new Main();