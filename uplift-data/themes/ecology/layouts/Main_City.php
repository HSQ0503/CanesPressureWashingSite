<?php
	/** @var string $bodyContents */
	/** @var string $headContents */
	/** @var string $breadcrumbs */
	/** @var string $schemaType */
	
	use TemplateManager\PageLayouts\PageLayoutSectionsProvider;
	use Page\Page;
	
	$provider = new PageLayoutSectionsProvider(__FILE__);
	$sectionDefinition = $provider->getSectionDefinition();	
	
	$topContent = $sectionDefinition->getSectionContent("Top Content", $this->id);
	$serviceAreas = $sectionDefinition->getSectionContent("Service Areas", $this->id);
	$map = $sectionDefinition->getSectionContent("Map", $this->id);
	
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
				<section class="content-1">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<?= $topContent ?>
								<div class="bg-secondary rounded p-3" style="background: rgba(0, 136, 0, .05)">
									<?= $serviceAreas ?>
									<?= $map ?>
								</div>
							</div>
						</div>
					</div>
				</section>
				<?php include(__DIR__ . "/../includes/services-interior.php"); ?>
				<?php include(__DIR__ . "/../includes/our-process.php"); ?>
				<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
			</div>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	</body>
</html>