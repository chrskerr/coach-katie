
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
							<p>An online and in-person running technique and longevity programme</p>
							<h2>Kate&apos;s Technique</h2>
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
										<p>An Athletics Club for Grown-ups</p>
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

			<section id="two" className="wrapper style3">
				<div className="inner">
					<header className="align-center">
						<p>Great technique leads to enjoyable and sustainable training</p>
						<h2>Enjoy your body again!</h2>
					</header>
				</div>
			</section>

			<section id="three" className="wrapper style2">
				<div className="inner">
					<div className="grid-style">
						<div>
							<div className="box">
								<div className="content">
									<header className="align-center">
										<p>About</p>
										<h2>Kate Hobbs</h2>
									</header>
									<p>Kate is a certified running coach, bringing her own extensive first-hand experience to her athletes. She has raced competitively at a national level for over a decade, running track, trail and mountains. With a recent transition to obstacle course racing, she is already making a name for herself as one of Australia’s top female elite athletes, with multiple podium finishes and representing Australia at the World Championships.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="box">
								<div className="image fit">
									<img src="./images/kate.png" alt="Kate Hobbs" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
