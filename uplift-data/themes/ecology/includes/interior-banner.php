<section class="banner interior interior-banner">
	<?php if($bannerBackground) { ?>
	<?= $bannerBackground ?>
	<?php } else { ?>
	<!--picture>
		<img src="https://placehold.co/1920x500" alt="<?= $companyName ?> Background" class="banner-background" />
	</picture-->
	<picture>
		<img src="/uplift-data/images/banners/canes-pressure-washing-interior-bg.jpg" alt="CTA Background" class="banner-background" />
	</picture>
	<?php } ?>
	<div class="container">
		<div class="row">
			<div class="col-12 banner-content interior">
				<div class="banner-title">
					<span class="preheading">Reliable &amp; Professional Services in <?= $companyCity ?></span>
					<p class="banner-title"><?= $this->pageName ?></p>
				</div>
				<?= $breadcrumbs ?>
			</div>
		</div>
	</div>
</section>