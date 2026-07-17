<?php
	$parser = new ShortcodeParser\ShortcodeParser();
	$lexicalParser = new ShortcodeParser\ShortcodeLexicalParser();
	$servicesShortcode = $lexicalParser->getShortcodeFromString('{{ get-pages page-ids="[37, 28, 34, 41, 25, 18, 21, 19, 16, 39]" shortcode-file="btn-pages.php" }}');
	$servicesShortcode = $parser->processShortcode($servicesShortcode);
	$attributes = 'attributes=\'{"class":"btn btn-sm btn-primary"}\'';
	$cityShortcode = $lexicalParser->getShortcodeFromString('{{ get-cities sort="alphabetical asc" limit="11" tagNameWrapper="a" '.$attributes.' delimiter=" " }}');
	$cityShortcode = $parser->processShortcode($cityShortcode);	
?>
<section class="service-areas-interior">
<picture>
	<img src="/uplift-data/images/banners/bg.jpg" alt="Service Areas Image" class="background-image">
</picture>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 mb-4 mb-lg-0">
				<div class="services-content">
					<span class="preheading">Professional &amp; Reliable</span>
					<h2>
						Our Complete List Of Services
					</h2>
					<div class="service-areas-list">
						<?= $servicesShortcode ?>
					</div>
					<div class="buttons-container">
						<a class="btn btn-primary" href="/services">View All Services</a>
					</div>
				</div>
			</div>
			<div class="col-12 col-lg-6">
				<div class="service-areas-content">
					<span class="preheading">Where We Work</span>
					<h2>
						<?= $companyCity ?> and Surrounding Areas
					</h2>
					<div class="service-areas-list">
						<?= $cityShortcode ?>
					</div>
					<div class="buttons-container">
						<a class="btn btn-primary" href="/near-me">View All Service Areas</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>