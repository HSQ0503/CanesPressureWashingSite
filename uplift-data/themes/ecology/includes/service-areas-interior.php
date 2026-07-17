<?php
	$parser = new ShortcodeParser\ShortcodeParser();
	$lexicalParser = new ShortcodeParser\ShortcodeLexicalParser();
	$attributes = 'attributes=\'{"class":"btn btn-sm btn-primary"}\'';
	$cityShortcode = $lexicalParser->getShortcodeFromString('{{ get-cities sort="alphabetical asc" limit="11" tagNameWrapper="a" '.$attributes.' delimiter=" " }}');
	$cityShortcode = $parser->processShortcode($cityShortcode);
?>
<section class="service-areas-interior">
<picture>
	<img src="/uplift-data/images/sections/service-area-map.jpg" alt="Service Areas Image" class="background-image">
</picture>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6">
				<div class="service-areas-content">
					<span class="preheading">Where We Work</span>
					<h2>
						Servicing <?= $companyCity ?> and Surrounding Areas
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