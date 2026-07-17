<footer id="footer">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="footer-top"> 
					<div class="info-section">
						<div class="icon">
							<i class="bi bi-geo-alt-fill"></i>
						</div>
						<div class="content">
							<span class="title">Location</span>
							<p>
								<span class="d-block"><?= $companyCity ?>, <?= $companyState ?> </span>
							</p>
						</div>
					</div>
					<div class="info-section">
						<div class="icon">
							<i class="bi bi-hand-thumbs-up-fill"></i>
						</div>
						<div class="content">
							<span class="title">Contact Us</span>
							<ul>
								<li>
									<a href="/contact-us">Request Service</a>
								</li>
								<li>
									<a href="/reviews">Leave a review</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="info-section">
						<div class="icon">
							<i class="bi bi-telephone-fill"></i>
						</div>
						<div class="content">
							<span class="title">Phone Number</span>
							<ul>
								<li>
									<a href="tel:+1-<?= $phoneNumbers[0] ?>"><?= $phoneNumbers[0] ?></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="footer-middle"> 
					<div class="text-center">
						<div class="logo-container">
							<a href="/">
								<picture>
									<img src="/uplift-data/images/newLogo.png" alt="<?= $companyName ?> Logo" class="logo" />
								</picture>
							</a>
						</div>
						<div class="social-links">
							<a href="https://www.facebook.com/share/14Sx37RNTzr/?mibextid=wwXIfr" aria-label="facebook" target="_blank" rel="noopener">
								<i class="bi bi-facebook"></i>
							</a>
							<a href="https://nextdoor.com/pages/root2roof-exteriors-windermere-fl/" aria-label="nextdoor" target="_blank" rel="noopener">
								<i class="bi bi-house-fill"></i>
							</a>
						</div>
					</div>
					<div>
						<span class="title">Quick Links</span>
						<ul class="quick-links">
							<li>
								<a href="/contact-us">Contact</a>
							</li>
							<li>
								<a href="/about-us">About</a>
							</li>
							<li>
								<a href="/pressure-washing-tips">Tips</a>
							</li>
							<li>
								<a href="/projects">Projects</a>
							</li>
							<li>
								<a href="/reviews">Reviews</a>
							</li>
						</ul>
					</div>
					<div>
						<span class="title">Service Areas</span>
						<ul class="city-links">
							<li>
								<a href="/near-me/windermere-fl-pressure-washing">Windermere, FL</a>
							</li>
							<li>
								<a href="/near-me/winter-garden-fl-pressure-washing">Winter Garden, FL</a>
							</li>
							<li>
								<a href="/near-me/horizon-west-fl-pressure-washing">Horizon West, FL</a>
							</li>
							<li>
								<a href="/near-me/ocoee-fl-pressure-washing">Ocoee, FL</a>
							</li>
							<li>
								<a href="/near-me/dr-phillips-fl-pressure-washing">Dr. Phillips, FL</a>
							</li>
							<li>
								<a href="/near-me">View All</a>
							</li>
						</ul>
					</div>
					<div class="float-md-start">
						<span class="title">Reviews</span>
						<!--<a href="/reviews" class="review-widget">
							<span class="review-title">Our reviews</span>
							<div class="review-rating">
								<span class="number">5.0</span>
								<span class="stars">
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
									<i class="bi bi-star-fill"></i>
								</span>
							</div>
							<span>Rating based on our reviews.</span>
							<div>
								<u>Read reviews</u>
							</div>
						</a>-->
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="footer-bottom"> 
					<div class="copyright">
						<p>
							&copy; Copyright <?php echo date("Y"); ?> <a href="/"><?= $companyName ?></a>. All Rights Reserved
						</p>
					</div>
					<div class="extra-links">
						<a href="/privacy">Privacy Policy</a>
						<a href="/terms">Terms & Conditions</a>
						<a href="/sitemap">Sitemap</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="69f112fc4215933da2fa872b" data-source="WEB_USER"></script>
</footer>