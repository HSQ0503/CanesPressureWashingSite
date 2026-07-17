<?php
	/** @var string $bodyContents */
	/** @var string $headContents */
	/** @var string $breadcrumbs */
	/** @var string $schemaType */
	
	use TemplateManager\PageLayouts\PageLayoutSectionsProvider;
	use Page\Page;
	
	$provider = new PageLayoutSectionsProvider(__FILE__);
	$sectionDefinition = $provider->getSectionDefinition();
	
	$h1 = $sectionDefinition->getSectionContent("H1", $this->id);
	$firstStep = $sectionDefinition->getSectionContent("First Step", $this->id);
	$firstStepDescription = $sectionDefinition->getSectionContent("First Step Description", $this->id);
	$secondStep = $sectionDefinition->getSectionContent("Second Step", $this->id);
	$secondStepDescription = $sectionDefinition->getSectionContent("Second Step Description", $this->id);
	$thirdStep = $sectionDefinition->getSectionContent("Third Step", $this->id);
	$thirdStepDescription = $sectionDefinition->getSectionContent("Third Step Description", $this->id);
	$financing = $sectionDefinition->getSectionContent("Financing", $this->id);
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
		<main id="content">
			<div id="general">				
				<section class="content-1">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<?= $h1 ?>
								<?php if($firstStep) { ?>
									<section class="our-process interior">
									<div class="container">
										<div class="process-card-container">
											<div class="process-card">
												<div class="card-content">
													<div class="card-title">
														<i class="bi bi-1-circle"></i>
														<span><?= $firstStep ?></span>
													</div>
													<p class="card-text">
														<?= $firstStepDescription ?>
													</p>
												</div>
											</div>
											<div class="process-card">
												<div class="card-content">
													<div class="card-title">
														<i class="bi bi-2-circle"></i>
														<span><?= $secondStep ?></span>
													</div>
													<p class="card-text">
														<?= $secondStepDescription ?>
													</p>
												</div>
											</div>
											<div class="process-card">
												<div class="card-content">
													<div class="card-title">
														<i class="bi bi-3-circle"></i>
														<span><?= $thirdStep ?></span>
													</div>
													<p class="card-text">
														<?= $thirdStepDescription ?>
													</p>
												</div>
											</div>
										</div>
									</div>
								</section>
								<?php } ?>
								<?php if($financing) { ?>
									<?= $financing ?>
								<?php } ?>
							</div>
						</div>
					</div>
				</section>			
				<?php include(__DIR__ . "/../includes/services-service-areas.php"); ?>
				<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
			</div>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>