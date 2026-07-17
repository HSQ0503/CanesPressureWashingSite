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
	
	$content1 = $sectionDefinition->getSectionContent("Content 1", $this->id);
	$bonuscontent1 = $sectionDefinition->getSectionContent("Bonus Content 1", $this->id);
	$content2 = $sectionDefinition->getSectionContent("Content 2", $this->id);
	$content3 = $sectionDefinition->getSectionContent("Content 3", $this->id);
	$faq = $sectionDefinition->getSectionContent("FAQ", $this->id);
	$projects = $sectionDefinition->getSectionContent("Projects", $this->id);
	$articles = $sectionDefinition->getSectionContent("Articles", $this->id); 
	
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
						<div class="row align-items-center service-content">
							<div class="col-12 col-lg-7 order-2 order-lg-1">								
								<?= $content1 ?>
							</div>
							<div class="col-12 col-lg-5 order-1 order-lg-2 text-center text-xl-start">
								<div class="service-image">
									<picture>
										<img src="<?= $featuredImage ?>" alt="<?= $this->pageName ?>" class="" />
									</picture>
								</div>
							</div>
						</div>
						<div class="row align-items-center service-content">
							<div class="col-12">
								<?= $bonuscontent1 ?>
							</div>
						</div>
					</div>
				</section>
				
				<section class="content-2">
					<div class="container">
						<div class="service-content">
							<div class="service-image">
								<picture>
									<img src="/uplift-data/images/newLogo.png" alt="<?= $companyName ?> Logo" class="">
								</picture>
							</div>
							<?= $content2 ?>				
						</div>
					</div>
				</section>
				
				<?php include(__DIR__ . "/../includes/cta-1.php"); ?>
				
				<section class="content-3">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<?= $content3 ?>
							</div>
						</div>
					</div>
				</section>
				
				<?php include(__DIR__ . "/../includes/service-areas-interior.php"); ?>				
				

					<section class="projects bg-dark">
						<div class="container">
							<div class="row">
								<div class="col-12">
									<h2 class="text-light">
										Recent <?= $this->pageName ?> Projects
									</h2>
								</div>
								<?php if (!empty(trim(strip_tags($projects)))) { ?>
									<?= $projects; ?>
									<div class="text-center col-12">
										<a href="/projects" class="btn btn-outline-dark">See All Our Work</a>
									</div>
								<?php } else { ?>
									<div class="text-center col-12">
										<a class="btn btn-primary disabled">Coming Soon!</a>
									</div>
								<?php } ?>
							</div>
						</div>
					</section>
	
				
				<section class="faq">
					<picture>
						<img src="/uplift-data/images/banners/bg.jpg" class="background-image" alt="FAQ Background" />
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
				
				<?php if($articles) { ?>
				<section class="articles">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<h2>
									Recent <?= $this->pageName ?> Articles
								</h2>
							</div>
							<?= $articles ?>
						</div>
					</div>
				</section>
				<?php } ?>
				
				<?php include(__DIR__ . "/../includes/our-process.php"); ?>
			</div>
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>	
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>