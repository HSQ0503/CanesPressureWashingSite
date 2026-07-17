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
	
		// Gets the page's data
	$page = Page::queryOne(
		columnQuery: (new Nox\ORM\ColumnQuery())
			->where("id","=",$this->id)
	);
	
	$h1 = $sectionDefinition->getSectionContent("H1", $this->id);
	$topSection= $sectionDefinition->getSectionContent("Top Section", $this->id);
	
	$extraContent = $sectionDefinition->getSectionContent("Extra Content", $this->id);
	$extraContent = isset($extraContent) ? $extraContent : "";	
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
						<div class="about-us">		
							<div class="about-us-content ">
								<?= $h1 ?>
								<div class="about-image">
									<picture>
										<img src="/uplift-data/images/newLogo.png" alt="<?= $this->pageName ?>" class="" />
									</picture>
								</div>
								<?= $topSection ?>
							</div>
						</div>
					</div>
				</section>
				<!--div class="qualities-container">
					<?php //include(__DIR__ . "/../includes/qualities.php"); ?> 
				</div-->
				
				<?php include(__DIR__ . "/../includes/cta-1.php"); ?>
				
				<?php if($extraContent) { ?>
					<section class="content-1-interior">
						<div class="container">
							<?= $extraContent ?>
						</div>
					</section>
				<?php } ?>
				<?php include(__DIR__ . "/../includes/services-service-areas.php"); ?>
				<?php //include(__DIR__ . "/../includes/our-process.php"); ?>
			</div>
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>