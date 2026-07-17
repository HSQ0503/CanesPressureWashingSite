<div class="index-card-container">
	{{ begin PageItem }}
	<a href="{{ PAGE_URI }}" class="project-card">
		<div class="card-image">
			<picture>
				<img src="{{ FEATURED_IMAGE_NOTHUMB }}" alt="{{ PAGE_NAME }}" />
			</picture>
		</div>
		<div class="card-content">
			<h3 class="card-title">{{ PAGE_NAME }}</h3>
			<hr />
			<p class="card-text">{{ PAGE_PREVIEW }}</p>
			<div class="card-button btn btn-primary">
				Read About {{ PAGE_NAME }}
				<i class="bi bi-chevron-double-right"></i>
			</div>
		</div>
	</a>
	{{ end PageItem }}
</div>