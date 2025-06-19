import Link from 'next/link'


export default function Footer1() {
	return (
		<>
			<div className="footer1-sertion-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="footer-logo-area">
								<img src="/assets/img/logo/logo2.png" alt="" />
								<div className="space16" />
								<p>We are team Code Raiders, this is a project for Avnesis 2025.</p>
								<div className="space24" />
								<ul>
									<li>
										<Link href="/#"><i className="fa-brands fa-facebook-f" /></Link>
									</li>
									<li>
										<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
									</li>
									<li>
										<Link href="/#"><i className="fa-brands fa-linkedin-in" /></Link>
									</li>
									<li>
										<Link href="/#" className="m-0"><i className="fa-brands fa-pinterest-p" /></Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>Contact Us</h3>
								<ul>
									<li>
										<Link href="tel:+11234567890"><img src="/assets/img/icons/phn1.svg" alt="" />+91 95********</Link>
									</li>
									<li>
										<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Hyderabad</Link>
									</li>
									<li>
										<Link href="mailto:ayushkumarpanigrahi@gmail.com"><img src="/assets/img/icons/mail1.svg" alt="" />Ayushkumar@gmail.com</Link>
									</li>
									<li>
										<Link href="https://www.ayushkumarpanigrahi.info/"> <img src="/assets/img/icons/world1.svg" alt="" />ayushkumarpanigrahi.info</Link>
									</li>
								</ul>
							</div>
						</div>

					</div>
					<div className="space60" />
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright">
								<p>© Copyright {new Date().getFullYear()} -ClubSync. All Right Reserved</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
