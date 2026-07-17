<div class="gallery">
	{{ begin GalleryImageItem }}
	<a href="{{ ImageUri }}" data-lightbox="{{ GalleryName }}">
		<img src="{{ ThumbUri }}" alt="{{ ImageAlt }}" />
	</a>
	{{ end GalleryImageItem }}
</div>