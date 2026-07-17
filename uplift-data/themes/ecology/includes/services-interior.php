<?php
	$parser = new ShortcodeParser\ShortcodeParser();
	$lexicalParser = new ShortcodeParser\ShortcodeLexicalParser();
	$servicesShortcode = $lexicalParser->getShortcodeFromString('{{ get-pages page-ids="[37, 28, 34, 41, 25, 18, 21, 19]" shortcode-file="btn-pages.php" }}');
	$cityShortcode = $lexicalParser->getShortcodeFromString('{{ city-name map-safe="false" }}');
	$servicesShortcode = $parser->processShortcode($servicesShortcode);
	$cityShortcode = $parser->processShortcode($cityShortcode);
	if($cityShortcode === '') {
		$cityShortcode =  $lexicalParser->getShortcodeFromString('{{ company-city }}');
		$cityShortcode = $parser->processShortcode($cityShortcode);
	}
?>
<section class="service-areas-interior">
<picture>
		<img src="/uplift-data/images/banners/bg.jpg" alt="CTA Background" class="background-image">
	</picture>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 mb-4 mb-lg-0">
				<div class="services-content">
					<span class="preheading">Our Complete List Of Services</span>
					<h2>
						Servicing <?= $cityShortcode ?> and Surrounding Areas
					</h2>
					<div class="service-areas-list">
						<?= $servicesShortcode ?>
					</div>
					<div class="buttons-container mt-2">
						<a class="btn btn-primary" href="/services">View All Services</a>
					</div>
				</div>
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
						<?php include(__DIR__ . "/form.php"); ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>