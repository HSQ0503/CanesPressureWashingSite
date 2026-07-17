<?php
	/** @var string $schemaType */
	/** @var string $headContents */
	/** @var string $bodyContents */
	/** @var string $breadcrumbs */

	/** @var mixed $featuredImage */
	/** @var mixed $featuredImageThumb */
	/** @var mixed $cityName */
	/** @var mixed $stateName */
	/** @var mixed $stateNameShorthand */
	/** @var mixed $brandProducts */
	/** @var mixed $customerFirstName */
	/** @var mixed $customerLastName */
	/** @var mixed $customerTestimonialBody */
	/** @var mixed $customerTestimonialCheck */
	/** @var mixed $mapKey */
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include(__DIR__  . "/../includes/meta.php"); ?>	
		<?= $headContents; ?>
	</head>
	<body>
		<?php include(__DIR__ . "/../includes/navigation.php"); ?>
		<?php include(__DIR__ . "/../includes/interior-banner.php"); ?>
		<main id="general">
			<section class="content-1">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<?= $bodyContents; ?>
							<?php if (trim($brandProducts) !== ''): ?>
								<h2>Products Used</h2>
								<p><?= $brandProducts ?></p>
							<?php endif; ?>
							
							<?php if ($customerTestimonialCheck == 1): ?>
								<h2>Client Review</h2>
								<div class="review mb-5">
									<div class="review-content">
										<p><?= $customerTestimonialBody ?></p>
									</div>
									<div class="review-details">
										<div class="review-icon">
											<span class="review-initials"><?= $stateNameShorthand ?></span>
										</div>
										<div>
											<div class="review-stars">
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
												<i class="bi bi-star-fill"></i>
											</div>
											<span class="review-name"><?= $customerFirstName ?> <?= $customerLastName ?></span>
											<span class="review-location"><?= $cityName ?>, <?= $stateNameShorthand ?></span>
										</div>
									</div>
								</div>
							<?php endif; ?>
							
							<?php if (trim($cityName) !== ''): ?>
								<div class="ratio ratio-21x9">
									<iframe
										src="//www.google.com/maps/embed/v1/place?key=<?= $mapKey ?>&q=<?= urlencode($cityName . ' ' . $stateName) ?>">
									</iframe>
								</div>
							<?php endif; ?>
						</div>
					</div>
				</div>
			</section>
			<?php include(__DIR__ . "/../includes/services-service-areas.php"); ?>
			<?php include(__DIR__ . "/../includes/our-process.php"); ?>
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>