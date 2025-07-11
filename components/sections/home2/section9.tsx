
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section9() {
	return (
		<>

			<div className="cta2-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 m-auto">
							<div className="cta1-main-boxarea">
								<div className="timer-btn-area">
								<Countdown />
									<div className="btn-area1">
										<Link className="vl-btn2" href="/events"><span className="demo">Buy A Ticket</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span>
										</Link>
									</div>
								</div>
								<ul>
									<li>
										<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
									</li>
									<li className="m-0">
										<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Anurag University, Hyderabad</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
