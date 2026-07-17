<div id="form-modal" class="modal" tabindex="-1">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"> Contact <?= $companyName ?></h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<p>
					 Please contact us by filling out the form below or calling us at <a href="tel:+1<?= $phoneNumbers[0] ?>" class="text-dark"><?= $phoneNumbers[0] ?></a>.
				</p>
				<hr>
				<div class="fbm-crm-generated-form-container"
				    data-env="production"
				    data-fbm-crm-form-id="1643"
				    data-fbm-crm-form-uuid="d090e34a-7ef3-4924-b00e-210ac7ebc6f5"
				    data-disable-init-render="false"
				>
				</div>
				<script type="module" src="https://embeds.fbdash.com/js/Public/Dist/CRMFormEmbed.js"></script>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<script>
	window.addEventListener("DOMContentLoaded", () => {
		const formModal = new bootstrap.Modal(document.querySelector('#form-modal'), {
			keyboard: false
		});
		formModal.show();
	});
</script>