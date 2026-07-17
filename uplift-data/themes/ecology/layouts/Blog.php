<?php
	/** @var string $bodyContents */
	/** @var string $headContents */
	/** @var string $breadcrumbs */
	/** @var string $schemaType */
	
	/** @var mixed $featuredImage */
	/** @var mixed $featuredImageThumb */
	
	// Gets the H1, assigns it to the $h1 variable, and removes it from the page
	$h1 = null; // Default to null in case there's no match
	
	$h1Regex = "/<h1[^>]*>(.*?)<\/h1>/is";
	if (preg_match($h1Regex, $bodyContents, $h1Matches)) {
	    $h1 = $h1Matches[1];
	    $bodyContents = preg_replace($h1Regex, "", $bodyContents, 1);
	}
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
			<div id="blog">
				<?php include(__DIR__ . "/../includes/interior-banner.php"); ?>
				<section class="content-1-interior">
					<div class="container">
						<div class="blog-content">
						  <div class="main-content">
							<h1><?= $h1 ?></h1>
							<?= $bodyContents; ?>
						  </div>
						  <div class="featured-image-container">
								<picture>
									<img src="<?= $featuredImage ?>" alt="<?= $this->pageName ?>" class="featured-image" />
								</picture>							
						  </div>
						  <div class="form-container">
								<div class="form-header">
									<h2>Contact Us Today</h2>
									<p>
										We're Ready to Help!
									</p>
								</div>
								<div class="form-content">
									<?php include(__DIR__ . "/../includes/form.php"); ?>	
								</div>
						  </div>
						</div>
					</div>
				</section>
				<?php include(__DIR__ . "/../includes/services-service-areas.php"); ?>
			</div>
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>