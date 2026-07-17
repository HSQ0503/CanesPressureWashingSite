<div class="project-slider splide">
	<div class="splide__track">
		<ul class="splide__list">
			{{ begin RecentProjectItem }}
			<li class="splide__slide">
				<a href="{{ PAGE_URI }}" class="project-card">
					<div class="card-image">
						<picture>
							<img src="{{ FEATURED_IMAGE_NOTHUMB }}" alt="{{ PROJECT_TITLE }}" />
						</picture>
					</div>
					<div class="card-content">
						<div class="card-date">
							{{ PUBLISHED_DATE }}
						</div>
						<h3 class="card-title">{{ PROJECT_TITLE }}</h3>
						<hr />
						<p class="card-text">{{ PROJECT_PREVIEW }}</p>
						<div class="card-button btn btn-primary">
							View Project
							<i class="bi bi-chevron-double-right"></i>
						</div>
					</div>
				</a>
			</li>
			{{ end RecentProjectItem }}
		</ul>
	</div>
</div>