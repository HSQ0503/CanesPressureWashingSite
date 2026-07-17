<?php
	// Get all of the projects in our database
	$projects = Page\Page::query(
		columnQuery: (new Nox\ORM\ColumnQuery())
			->where("pageType","=","Project")
			->and()
			->where("publication_status","=",1)
	);
	
	$parser = new ShortcodeParser\ShortcodeParser();
	$lexicalParser = new ShortcodeParser\ShortcodeLexicalParser();
	$shortcode = $lexicalParser->getShortcodeFromString('{{ get-ipps ipps-per-page="10" columns="1" included-project-tags="[]" excluded-project-tags="[]" }}');
	
	// If there are any projects, display them. Otherwise, append a coming soon notice
	if($projects) {
		echo $parser->processShortcode($shortcode);
	} else {
		?>
		<p>
			Coming soon!
		</p>
		<?php
	}
?>