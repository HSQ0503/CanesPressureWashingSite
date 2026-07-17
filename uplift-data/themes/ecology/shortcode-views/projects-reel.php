<div
	elements-per-page="{{ PER_PAGE_LIMIT }}"
	paginate
	page-container-classes="project-card-container"
	paginator-controls-location=""
	paginator-controls-classes="text-center my-4"
	paginator-controls-button-classes="btn btn-primary btn-sm mx-1 mx-xl-3"
	paginator-controls-input-classes="me-2 form-control form-control-sm text-center d-inline-block"
	paginator-controls-div-classes="d-inline-block"
>
	<div class="index-card-container">
		{{ begin ProjectsItem }}
		<a href="{{ PAGE_URI }}" class="project-card">
			<div class="card-image">
				<picture>
					<img src="{{ FEATURED_IMAGE_NOTHUMB }}" alt="{{ PROJECT_TITLE }}" />
				</picture>
			</div>
			<div class="card-content">
				<h3 class="card-title">{{ PROJECT_TITLE }}</h3>
				<hr />
				<p class="card-text">{{ PROJECT_PREVIEW }}</p>
				<div class="card-button btn btn-primary">
					View Project
					<i class="bi bi-chevron-double-right"></i>
				</div>
			</div>
		</a>
		{{ end ProjectsItem }}
	</div>
</div>

