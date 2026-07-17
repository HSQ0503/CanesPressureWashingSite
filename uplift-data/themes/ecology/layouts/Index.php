<?php
	/** @var string $bodyContents */
	/** @var string $headContents */
	/** @var string $breadcrumbs */
	/** @var string $schemaType */
	
	/** @var mixed $featuredImage */
	/** @var mixed $featuredImageThumb */
	
	use TemplateManager\PageLayouts\PageLayoutSectionsProvider;
	use Page\Page;
	
	$provider = new PageLayoutSectionsProvider(__FILE__);
	$sectionDefinition = $provider->getSectionDefinition();
	
	$bannerBackground = $sectionDefinition->getSectionContent("Banner Background", $this->id);
	$content1 = $sectionDefinition->getSectionContent("Content 1", $this->id);
	$content2 = $sectionDefinition->getSectionContent("Content 2", $this->id);
	$faq = $sectionDefinition->getSectionContent("FAQ", $this->id);
	
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include(__DIR__  . "/../includes/meta.php"); ?>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" integrity="sha256-5uKiXEwbaQh9cgd2/5Vp6WmMnsUr3VZZw0a8rKnOKNU=" crossorigin="anonymous">	
		<?= $headContents; ?>		
		<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js" integrity="sha256-FZsW7H2V5X9TGinSjjwYJ419Xka27I8XPDmWryGlWtw=" crossorigin="anonymous"></script>
	</head>
	<body>
		<?php include(__DIR__ . "/../includes/navigation.php"); ?>		
		<main id="content">
			<div id="service">				
				<?php include(__DIR__ . "/../includes/interior-banner.php"); ?>
				<section class="content-1-interior">
					<div class="container">
						<div class="service-content">	
							<?= $content1 ?>
						</div>
						<div class="index-content">
							<?= $content2 ?>				
						</div>
					</div>
				</section>			
				<?php include(__DIR__ . "/../includes/service-areas-interior.php"); ?>				
				<?php include(__DIR__ . "/../includes/our-process.php"); ?>				
				<?php if($faq) { ?>
					<section class="faq">
						<picture>
							<img src="https://placehold.co/1920x800" class="background-image" alt="FAQ Background" />
						</picture>
						<div class="container">
							<div class="row align-items-start">
								<div class="col-12 col-lg-6 mb-4 mb-lg-0">
									<?= $faq ?>
								</div>
								<div class="col-12 col-lg-6">
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
						</div>
					</section>
				<?php } ?>				
			</div>
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>		
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>