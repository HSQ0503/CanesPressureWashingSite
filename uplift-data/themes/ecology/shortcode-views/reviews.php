{{ begin ReviewItem }}
<div class="review mb-5">
	<div class="review-content">
		<p>{{ BODY }}</p>
	</div>
	<div class="review-details">
		<!--div class="review-icon">
			<span class="review-initials">{{ STATE }}</span>
		</div-->
		<div>
			<div class="review-stars">
				<i class="bi bi-star-fill"></i>
				<i class="bi bi-star-fill"></i>
				<i class="bi bi-star-fill"></i>
				<i class="bi bi-star-fill"></i>
				<i class="bi bi-star-fill"></i>
			</div>
			<span class="review-name">{{ FIRST_NAME }} {{ LAST_NAME }}</span>
			<!--span class="review-location">{{ CITY }}, {{ STATE }}</span-->
		</div>
	</div>
</div>
{{ end ReviewItem }}