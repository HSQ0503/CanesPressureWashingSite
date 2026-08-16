<?php
	/** @var string $bodyContents */
	/** @var string $headContents */
	/** @var string $breadcrumbs */
	/** @var string $schemaType */
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include(__DIR__  . "/../includes/meta.php"); ?>				
		<?= $headContents; ?>
	</head>
	<body>
		<?php include(__DIR__ . "/../includes/navigation.php"); ?>		
		<main id="content">
			<div id="general">
				<?php include(__DIR__ . "/../includes/interior-banner.php"); ?>
				<section class="content-1-interior">
					<div class="container">
						<div class="contact-us">
							<div class="form">
								<?= $bodyContents; ?>
							</div>
							<div class="contact">
								<div class="social-links">
									<a href="#link" target="_blank" rel="noopener" aria-label="Facebook Icon">
										<i class="bi bi-facebook"></i>
									</a>
									<a href="#link" target="_blank" rel="noopener" aria-label="Instagram Icon">
										<i class="bi bi-instagram"></i>
									</a>
									<a href="#link" target="_blank" rel="noopener" aria-label="Twitter X Icon">
										<i class="bi bi-twitter-x"></i>
									</a>
								</div>
								<a class="btn btn-primary w-100" href="tel:+1-<?= $phoneNumbers[0] ?>"><i class="bi bi-telephone"></i> <?= $phoneNumbers[0] ?></a>
							</div>
							<div class="map">
								<div class="shadow bg-dark rounded">
									<div class="px-3 pt-3">
										<h4 class="text-center text-light">
											<i class="bi bi-geo-alt text-primary"></i> Find Us!
										</h4>
									</div>
									<div class="ratio ratio-1x1 ">
										<iframe title="Canes Pressure Washing service area map" src="https://www.google.com/maps?cid=18057157042656019781&amp;output=embed" style="border:0; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; " allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
									</div>
								</div>
							</div>
							<div class="about-us">
								<h2>About Us</h2>
								<p>Your Company's new web site will look like this. At this stage of the web site creation and build process, we are only concerned with the visual aesthetics of your page - the look and feel of your new website.</p>
								<a href="#link" class="btn btn-primary">
									Read More About Us
									<i class="bi bi-chevron-double-right"></i>
								</a>
							</div>
						</div>
					</div>
				</section>
				<?php include(__DIR__ . "/../includes/services-service-areas.php"); ?>
				<?php include(__DIR__ . "/../includes/our-process.php"); ?>
				<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
			</div>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>
