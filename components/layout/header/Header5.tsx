import Link from 'next/link'

export default function Header5({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage5 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/"><img src="/assets/img/logo/logo2.png" alt="" /></Link>
									</div>
									<div className="main-menu">
										<ul>
											<li><Link href="/">Home</Link></li>

											<li><Link href="/clubs">Clubs</Link></li>

											<li>
												<Link href="#">Events <i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/events">All Events</Link></li>
													<li><Link href="/dashboard/admin/create-event">Create Event</Link></li>
												</ul>
											</li>

											<li><Link href="/dashboard">Dashboard</Link></li>

											<li>
												<Link href="#">Pages <i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/about">About</Link></li>
													<li><Link href="/contact">Contact</Link></li>
													<li><Link href="/memories">Memories</Link></li>
												</ul>
											</li>


										</ul>
									</div>

									<div className="btn-area">


										<div className="btn-area1">
											<Link className="vl-btn5" href="/events">
												<span className="demo">Buy Ticket</span>
											</Link>

											{typeof window !== "undefined" && sessionStorage.getItem("user") ? (
												<button
													onClick={() => {
														sessionStorage.removeItem("user")
														window.location.href = "/login"
													}}
													className="vl-btn5"
													style={{ border: "none", background: "transparent", padding: 0 }}
												>
													<span className="demo">Logout</span>
													<span className="arrow"><i className="fa-solid fa-arrow-right" /></span>
												</button>
											) : (
												<Link href="/login" className="vl-btn5">
													<span className="demo">Login</span>
													<span className="arrow"><i className="fa-solid fa-arrow-right" /></span>
												</Link>
											)}
										</div>
									</div>

									<div className={`header-search-form-wrapper ${isSearch ? 'open' : ''}`}>
										<div className="tx-search-close tx-close" onClick={handleSearch}><i className="fa-solid fa-xmark" /></div>
										<div className="header-search-container">
											<form role="search" className="search-form">
												<input type="search" className="search-field" placeholder="Search …" name="s" />
												<button type="submit" className="search-submit"><img src="/assets/img/icons/search1.svg" alt="" /></button>
											</form>
										</div>
									</div>
									{isSearch && <div className="body-overlay active" onClick={handleSearch} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header >

		</>
	)
}
