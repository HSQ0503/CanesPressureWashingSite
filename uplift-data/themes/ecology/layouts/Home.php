<?php
	/** @var mixed $schemaType */
	/** @var mixed $headContents */
	/** @var mixed $bodyContents */
	
	use TemplateManager\PageLayouts\PageLayoutSectionsProvider;
	use Page\Page;
	
	$provider = new PageLayoutSectionsProvider(__FILE__);
	$sectionDefinition = $provider->getSectionDefinition();
	
	$projects = Page::query(
		columnQuery: (new Nox\ORM\ColumnQuery())
			->where("pageType","=","Project")
			->and()
			->where("publication_status","=",1)
	);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include(__DIR__  . "/../includes/meta.php"); ?>
		<?= $headContents; ?>
	</head>
	<body>
		<?php include(__DIR__ . "/../includes/navigation.php"); ?>
		<?php include(__DIR__ . "/../includes/banner.php"); ?>
		<?php include(__DIR__ . "/../includes/qualities.php"); ?>
		<main id="content">
			<?= $sectionDefinition->render("Top Section", Page::$currentPage->id) ?>
			<?php include(__DIR__ . "/../includes/cta-1.php"); ?>
			<?= $sectionDefinition->render("Services", Page::$currentPage->id) ?>
			<?= $sectionDefinition->render("Professional", Page::$currentPage->id) ?>
			<?= $sectionDefinition->render("Reviews", Page::$currentPage->id) ?>
			<?= $sectionDefinition->render("Cities", Page::$currentPage->id) ?>
			<?php
				if($projects) {
					$sectionDefinition->render("Projects", Page::$currentPage->id);
				}
			?>
			
			<?= $sectionDefinition->render("FAQ", Page::$currentPage->id) ?>
			<?= $sectionDefinition->render("Articles", Page::$currentPage->id) ?>
			
			<?php include(__DIR__ . "/../includes/cta-2.php"); ?>
		</main>
		<?php include(__DIR__ . "/../includes/footer.php"); ?>
	
	</body>
</html>