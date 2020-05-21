
// deps
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import _ from "lodash";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";


// app

//
// Adultletics / Views / Home / Adultletics
//


const faqItems = [
	{
		title: "Will Adultletics cater for my ability?",
		description: "Adultletics provides variations of every component of the weekly program to cater for the absolute newbie to the well-trained and experienced runner.<br />We offer programs based on the event you are training for, from 5km to ultra marathon distances.",
	},
	{
		title: "I currently have an injury and am not allowed to run, can I still join?",
		description: "Absolutely! Depending on the injury, there is almost certainly still training that you CAN do. Please contact us to discuss your specific injury so we can tailor the structured running and strength sessions for you with appropriate alternatives. For all other components, you will be able to participate in the same way as all other members. We want to ensure that when you are recovered from injury, you can hit the ground running!",
	},
	{
		title: "How will I keep up to date with the weekly training schedule, educational content and connected to other Adultletics members?",
		description: "All content will be provided through our private Facebook group.\nThis Facebook group will also be where all participants can connect, share stories, motivation and banter.\nThe coaches are always available for Adultletics members on email, facebook messenger or phone to be contacted at any time.",
	},
	{
		title: "Can I trial to see if Adultletics is right for me?",
		description: "Please do! The first week of our membership is free, so you can try it out before spending a dollar. Simply sign up above and let us know if you no longer want to continue before the trial is up.",
	},
	{
		title: "OK I'm in. How much and when?",
		description: "Sign up today via the link above to get started!\n<strong>First week is free</strong>, then membership is a flat <strong>$23AUD/per week.</strong> There are NO sign-up fees and NO lock-in contracts.\nPay as you go and cancel anytime, no charge if you cancel in the first week.",
	},
	{
		title: "Contact details",
		description: "Please contact Adultletics to find out more: <a href='mailto:info@adultletics.com.au'>info@adultletics.com.au</a>",
	},
];

export default function Adultletics () {

	return (
		<div className="v-home">

			<header id="header" className="alt">
				<div className="logo"><a href="index.html">Hielo <span>by TEMPLATED</span></a></div>
				<a href="#menu">Menu</a>
			</header>

			<nav id="menu">
				<ul className="links">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/generic">Generic</Link></li>
					<li><Link to="/elements">Elements</Link></li>
					<li><Link to="/checkout">Checkout</Link></li>
					<li><Link to="/admin">Employees</Link></li>
					{/* <Link to="/members">Members Centre</Link> */}
				</ul>
			</nav>

			<section className="banner full">
				<article>
					<img src="images/slide01.jpg" alt="" />
					<div className="inner">
						<header>
							<p>An online and in-person running techique and longevity programme</p>
							<h2>Kate&aposs Technique</h2>
						</header>
					</div>
				</article>
				<article>
					<img src="images/slide02.jpg" alt="" />
					<div className="inner">
						<header>
							<p>Lorem ipsum dolor sit amet nullam feugiat</p>
							<h2>Magna etiam</h2>
						</header>
					</div>
				</article>
				<article>
					<img src="images/slide03.jpg"  alt="" />
					<div className="inner">
						<header>
							<p>Sed cursus aliuam veroeros lorem ipsum nullam</p>
							<h2>Tempus dolor</h2>
						</header>
					</div>
				</article>
				<article>
					<img src="images/slide04.jpg"  alt="" />
					<div className="inner">
						<header>
							<p>Adipiscing lorem ipsum feugiat sed phasellus consequat</p>
							<h2>Etiam feugiat</h2>
						</header>
					</div>
				</article>
				<article>
					<img src="images/slide05.jpg"  alt="" />
					<div className="inner">
						<header>
							<p>Ipsum dolor sed magna veroeros lorem ipsum</p>
							<h2>Lorem adipiscing</h2>
						</header>
					</div>
				</article>
			</section>

			<section id="one" className="wrapper style2">
				<div className="inner">
					<div className="grid-style">

						<div>
							<div className="box">
								<div className="image fit">
									<img src="images/pic02.jpg" alt="" />
								</div>
								<div className="content">
									<header className="align-center">
										<p>maecenas sapien feugiat ex purus</p>
										<h2>Lorem ipsum dolor</h2>
									</header>
									<p> Cras aliquet urna ut sapien tincidunt, quis malesuada elit facilisis. Vestibulum sit amet tortor velit. Nam elementum nibh a libero pharetra elementum. Maecenas feugiat ex purus, quis volutpat lacus placerat malesuada.</p>
									<footer className="align-center">
										<a href="#" className="button alt">Learn More</a>
									</footer>
								</div>
							</div>
						</div>

						<div>
							<div className="box">
								<div className="image fit">
									<img src="images/pic03.jpg" alt="" />
								</div>
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
						<p>Nam vel ante sit amet libero scelerisque facilisis eleifend vitae urna</p>
						<h2>Morbi maximus justo</h2>
					</header>
				</div>
			</section>

			<section id="three" className="wrapper style2">
				<div className="inner">
					<header className="align-center">
						<p className="special">Nam vel ante sit amet libero scelerisque facilisis eleifend vitae urna</p>
						<h2>Morbi maximus justo</h2>
					</header>
					<div className="gallery">
						<div>
							<div className="image fit">
								<a href="#"><img src="images/pic01.jpg" alt="" /></a>
							</div>
						</div>
						<div>
							<div className="image fit">
								<a href="#"><img src="images/pic02.jpg" alt="" /></a>
							</div>
						</div>
						<div>
							<div className="image fit">
								<a href="#"><img src="images/pic03.jpg" alt="" /></a>
							</div>
						</div>
						<div>
							<div className="image fit">
								<a href="#"><img src="images/pic04.jpg" alt="" /></a>
							</div>
						</div>
					</div>
				</div>
			</section>


			<footer id="footer">
				<div className="container">
					<ul className="icons">
						<li><a href="https://www.facebook.com/Adultletics-110617777298114/?view_public_for=110617777298114" target="_blank" rel="noreferrer noopener" className="icon"><FontAwesomeIcon icon={ faFacebookSquare } /></a></li>
						<li><a href="mailto:info@adultletics.com.au" className="icon"><FontAwesomeIcon icon={ faEnvelope } /></a></li>
					</ul>
				</div>
				<p className="copyright">&copy; Kate Hobbs & Mike Hobbs. Design: <a href="https://templated.co">Hielo by TEMPLATED</a>. Images: <a href="https://unsplash.com">Unsplash</a>.</p>
			</footer>


			<header id="header" className="alt">
				<div className="links">

				</div>
				<div className="inner">
					<h1>Adultletics Running Club</h1>
					<p>The Run School for Big Kids</p>
				</div>
			</header>

			<div id="wrapper">
				<section id="intro" className="main">
					<span className="icon major"><FontAwesomeIcon icon={ faRunning } size="3x"/></span>
					<h2>Athletics for Grown-ups</h2>
					<p>Aduletics is a run club and a runner's school all in one. It's much more than just 'going for a run'. Our focus is about teaching runners how to run, and to equip our runners with the tools they need to train both the brain AND the body.</p>
					<p>We're all about building stronger AND smarter runners, so there is just as much an emphasis on running technique, skill development, injury prevention and education as there is on the actual programming.</p>
					<span className="button big">Run with us</span>
				</section>

				<section className="main items">
					<article className="item">
						<header style={{ backgroundImage: "url( https://source.unsplash.com/pizgoJNQ-xY/800x400 )" }}>
							<h3>Running development</h3>
						</header>
						<p>All of our weekly structured running sessions (including intervals, hills, tempo & aerobic training) are accompanied by running drills to work on technique development, both to improve running efficiency & reduce risk of injury. We place a large emphasis on explaining the ‘why’s’ of our training, the purpose of each type of session, what each drill is working to improve and educating our runners.</p>
					</article>
					<article className="item">
						<header style={{ backgroundImage: "url( https://source.unsplash.com/GYr9A2CPMhY/800x400 )" }}>
							<h3>Strength training</h3>
						</header>
						<p>Every week our program includes 2 x strength training sessions, designed specifically for runners. Strength training is SO important not only for improving performance but also to help prevent running injuries, and is an essential part of all our runners’ training.</p>
					</article>
					<article className="item">
						<header style={{ backgroundImage: "url( https://source.unsplash.com/RL1AS-Kryzw/800x400 )" }}>
							<h3>Education</h3>
						</header>
						<p>Our philosophy at Adultletics is to equip our runners with the tools they need to improve not only from a performance perspective, but to learn how to listen to our bodies, optimise running form, recover better, and ultimately become more informed, happier and healthier runners. We do this by explaining the purpose of every session and technique drill, holding weekly educational webinars with a different focus every week, a daily challenge that changes weekly with either a physical or mentor focus, and answering all questions that our members have in regards to any aspect of their training.</p>
					</article>
					<article className="item">
						<header style={{ backgroundImage: "url( https://source.unsplash.com/c59hEeerAaI/800x400 )" }}>
							<h3>Social connection</h3>
						</header>
						<p>Adultletics believes running is better done with others. It’s more fun, more sustainable, and you are more likely to achieve your goals, whatever they may be. For this reason we have built our club into an online running community - this is where not only the program for the week is shared as well as our educational content, but members’ questions are answered, members share their progress, accomplishments & struggles, as well as how they felt during certain sessions, and general banter!</p>
					</article>
				</section>
		
				<section id="main" className="main">
					<header>
						<h2>Run With Us</h2>
					</header>
					<p>What’s included:</p>
					<ul>
						<li>x3 structured running sessions per week (a speedplay session, an aerobic session and a 'mystery' session)</li>
						<li>x2 online strength training for runners sessions per week</li>
						<li>x1 weekly team Q&A, check-in and workshop about a different running-related topic (such as choosing the right shoes, running technique, nutrition for runners, goal setting etc.)</li>
						<li>A daily challenge, that changes weekly (this may be a physical or mental challenge)</li>
						<li>Weekly drills to work on running technique and skill development</li>
						<li>Connection to a like minded group of people for further support, laughs, motivation & inspiration</li>
					</ul>
					<p style={{ marginBottom: "0.5em" }}><strong>First week is free</strong>, then membership is a flat <strong>$23AUD/per week.</strong> There are NO sign-up fees and NO lock-in contracts.</p>
					<p>Pay as you go and cancel anytime, no charge if you cancel in the first week.</p>
					<p>Contact us at <a href="mailto:info@adultletics.com.au">info@adultletics.com.au</a> if you'd like more information.</p>
					<div style={{ textAlign: "center" }}>
						<span className="button big">Run with us</span>
					</div>
				</section>
			
				<section id="main" className="main">
					<header>
						<h2>FAQ</h2>
					</header>
			
					{ faqItems && _.map( faqItems, ( item, i ) => <FaqItem key={ i } id={ i } item={ item } /> )}

				</section>
			
				<section id="main" className="main">
					<header>
						<h2>Meet the coaches</h2>
					</header>
					<div className="about-us mike">
						<div style={{ flexGrow: 1 }}>
							<h4>About Mike Hobbs:</h4>
							<p>Mike Hobbs is the creator of the Embodied Runner program, the medical director of an international marathon team comprising over 100 athletes, and is a sports and rehabilitation chiropractor. He works extensively with runners and consults online for runners all around the world. He is currently training for a sub 3-hour road marathon, his master Kettlebell certification and his first ultra marathon later in 2020.</p>
						</div>
						<div>
							<img src="./images/mike.png" alt="Mike Hobbs"/>
						</div>
					</div>
					<div className="about-us kate">
						<div>
							<img src="./images/kate.png" alt="Kate Hobbs"/>
						</div>
						<div style={{ flexGrow: 1 }}>
							<h4>About Kate Hobbs:</h4>
							<p>Kate is a certified running coach, bringing her own extensive first-hand experience to her athletes. She has raced competitively at a national level for over a decade, running track, trail and mountains. With a recent transition to obstacle course racing, she is already making a name for herself as one of Australia’s top female elite athletes, with multiple podium finishes and representing Australia at the World Championships.</p>
						</div>
					</div>
				</section>

			</div>
		</div>
	);
}

const FaqItem = props => {
	const [ isOpen, setIsOpen ] = useState( false );
	const { id, item: { title, description }} = props; 

	const toggle = () => {
		const $p = $( `#${ id } p` );
		if ( !isOpen ) {
			$p.show( 500 );
			ReactGA.event({
				category: "engagement",
				action: "faq-open",
				value: id,
			});
		} else {
			$p.hide( 200 );
		}
		setIsOpen( !isOpen );
	};

	return (
		<div id={ id } className="faq">
			<FontAwesomeIcon icon={ isOpen ? faMinusSquare : faPlusSquare } onClick={ toggle }/>
			<div>
				<h4 onClick={ toggle }>{ title }</h4>
				{ description && _.map( description.split( "\n" ), ( item, i ) => <p key={ i } style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: item }}></p> ) }
			</div>
		</div>
	);
};
FaqItem.propTypes = {
	id: PropTypes.number,
	item: PropTypes.object,
};
