<div
	elements-per-page="{{ PER_PAGE_LIMIT }}"
	paginate
	page-container-classes="article-card-container"
	paginator-controls-location=""
	paginator-controls-classes="text-center my-4"
	paginator-controls-button-classes="btn btn-primary btn-sm mx-1 mx-xl-3"
	paginator-controls-input-classes="me-2 form-control form-control-sm text-center d-inline-block"
	paginator-controls-div-classes="d-inline-block"
>
	<div class="index-card-container">
		{{ begin PageItem }}
		<a href="{{ ARTICLE_URI }}" class="project-card">
			<div class="card-image">
				<picture>
					<img src="{{ FEATURED_IMAGE_NOTHUMB }}" alt="{{ ARTICLE_TITLE }}" />
				</picture>
			</div>
			<div class="card-content">
				<h3 class="card-title">{{ ARTICLE_TITLE }}</h3>
				<hr />
				<p class="card-text">{{ ARTICLE_PREVIEW }}</p>
				<div class="card-button btn btn-primary">
					Read Article
					<i class="bi bi-chevron-double-right"></i>
				</div>
			</div>
		</a>
		{{ end PageItem }}
	</div>
</div>

