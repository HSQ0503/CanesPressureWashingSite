<div class="article-slider splide">
	<div class="splide__track">
		<ul class="splide__list">
			{{ begin RecentArticleItem }}
			<li class="splide__slide">
				<a href="{{ PAGE_URI }}" class="article-card">
					<div class="card-image">
						<picture>
							<img src="{{ FEATURED_IMAGE_NOTHUMB }}" alt="Placeholder" />
						</picture>
					</div>
					<div class="card-content">
						<div class="card-date">
							{{ PUBLISHED_DATE }}
						</div>
						<h3 class="card-title">{{ ARTICLE_TITLE }}</h3>
						<hr />
						<p class="card-text">
							{{ ARTICLE_PREVIEW }}
						</p>
						<div class="card-button btn btn-light">
							View Article
							<i class="bi bi-chevron-double-right"></i>
						</div>
					</div>
				</a>
			</li>
			{{ end RecentArticleItem }}
		</ul>
	</div>
</div>