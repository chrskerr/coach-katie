
// deps
import React from "react";
import { Link } from "react-router-dom";

// app
import "./tools/util";

//
// Adultletics / Views / Home / Home
//


export default function Home () {
	return (
		<>
			<section className="banner full">
				<article className="visible top">
					<div className="inner">
						<header>
							<p>An athletics club for grown-ups</p>
							<h2>Adultletics Running</h2>
						</header>
					</div>
				</article>
			</section>

			<section id="one" className="wrapper style2">
				<div className="inner">
					<div className="grid-style">
						<div>
							<div className="box">
								<div className="content">
									<header className="align-center">
										<p>The Weekly Online Running Club</p>
										<h2>Adultletics Running Club</h2>
									</header>
									<p>Aduletics is a run club and a runner&apos;s school all in one. It&apos;s much more than just &apos;going for a run&apos;. Our focus is about teaching runners how to run, and to equip our runners with the tools they need to train both the brain AND the body.</p>
									<p>We&apos;re all about building stronger AND smarter runners, so there is just as much an emphasis on running technique, skill development, injury prevention and education as there is on the actual programming.</p>
									<footer className="align-center">
										<Link to="/adultletics" className="button alt">Learn More</Link>
									</footer>
								</div>
							</div>
						</div>

						<div>
							<div className="box">
								<div className="content">
									<header className="align-center">
										<p>mattis elementum sapien pretium tellus</p>
										<h2>Vestibulum sit amet</h2>
									</header>
									<p> Cras aliquet urna ut sapien tincidunt, quis malesuada elit facilisis. Vestibulum sit amet tortor velit. Nam elementum nibh a libero pharetra elementum. Maecenas feugiat ex purus, quis volutpat lacus placerat malesuada.</p>
									<footer className="align-center">
										<a href="#" className="button alt">Learn More</a>
									</footer>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
		</>
	);
}
