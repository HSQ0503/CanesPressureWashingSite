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
				<section class="content-1">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<?= $bodyContents; ?>
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