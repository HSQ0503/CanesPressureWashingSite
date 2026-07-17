<?php
	/** @var string $schemaType */
	/** @var string $headContents */
	/** @var string $bodyContents */
	/** @var string $breadcrumbs */
	/** @var string $shortcodeParser */

	/** @var mixed $cityName */
	/** @var mixed $stateName */
	/** @var mixed $stateNameShorthand */
	/** @var mixed $cityUrl */
	/** @var mixed $mapKey */
	
	use TemplateManager\PageLayouts\PageLayoutSectionsProvider;
	use Page\Page;
	
	$provider = new PageLayoutSectionsProvider(__FILE__);
	$sectionDefinition = $provider->getSectionDefinition();
	
	$content1 = $sectionDefinition->getSectionContent("Content 1", $this->id);
	$bonuscontent1 = $sectionDefinition->getSectionContent("Bonus Content 1", $this->id);
	$content2 = $sectionDefinition->getSectionContent("Content 2", $this->id);
	$content3 = $sectionDefinition->getSectionContent("Content 3", $this->id);
	$content4 = $sectionDefinition->getSectionContent("Content 4", $this->id);
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
			<div id="city">
				<?php include(__DIR__ . "/../includes/city-banner.php"); ?>
				
				<section class="content-1-city">
					<div class="container">
						<div class="row align-items-center service-content">
							<div class="col-12 col-lg-7 col-xxl-8 order-2 order-lg-1">								
								<?= $content1 ?>
							</div>
							<div class="col-12 col-lg-5 col-xxl-4 order-1 order-lg-2 text-center text-xl-start">
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
						<div class="city-content">
							<div class="city-image">
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
				
				<?php if($faq) { ?>
					<section class="faq">
						<picture>
							<img src="/uplift-data/images/banners/bg.jpg" class="background-image" alt="FAQ Background" />
						</picture>
						<div class="container">
							<div class="row align-items-start">
								<div class="col-12 mb-4 mb-lg-0">
									<?= $faq ?>
								</div>
								
							</div>
						</div>
					</section>
				<?php } ?>
				
				<?php include(__DIR__ . "/../includes/services-interior.php"); ?>			
				

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

				
				<?php if($articles) { ?>
				<section class="articles">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<h2>
									Recent Articles
								</h2>
							</div>
							<?= $articles ?>
						</div>
					</div>
				</section>
				<?php } ?>
				
				<section class="about-content">
					<div class="container">
						<div class="row">
							<div class="about-content col-12 ">
								<?= $content4 ?>
								<?php
									if (!$disableGeneratedMap){
										if ($cityUrl != ""){
											?>
											<div class="text-center">
												<div class="my-3">
													<a class="btn btn-dark" target="_blank" href="<?= $cityUrl; ?>"><?= $cityName; ?>, <?= $stateName; ?></a>
												</div>
											</div>
											<?php
										}
										?>
										<div class="ratio ratio-21x9 mb-3">
											<iframe src="https://www.google.com/maps/embed/v1/place?key=<?= $mapKey ?>&q=<?= preg_replace("/[\s]/i", "+", $cityName); ?>+<?= preg_replace("/[\s]/i", "+", $stateName); ?>"></iframe>
										</div>
										<?php
									}
								?>
							</div>
						</div>
					</div>
				</section>
				<?php include(__DIR__ . "/../includes/our-process.php"); ?>
			</div>
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>
