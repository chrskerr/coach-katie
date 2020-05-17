
// deps
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import ReactGA from "react-ga";
import _ from "lodash";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faTimes, faCheck, faSpinner, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// app
import "./_home.scss";

//
// Adultletics / Views / Home
//

const url = "https://stripe-server-xdzmzxo7uq-lz.a.run.app/";

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

export default function Home () {
	const { pathname } = useLocation();
	const [ isCheckoutOpen, setIsCheckoutOpen ] = useState( false );

	useEffect(() => ReactGA.pageview( pathname ), [ pathname ]);
	useEffect(() => {
		let heartbeat = setInterval(() => {
			ReactGA.event({ 
				category: "engagement",
				action: "heartbeat", 
			});
		}, 5000 );
		document.addEventListener( "visibilitychange", () => {
			clearInterval( heartbeat ); 
			if ( !document.hidden ) heartbeat = setInterval(() => {
				ReactGA.event({ 
					category: "engagement",
					action: "heartbeat", 
				});
			}, 5000 );
		});
	}, []);
	
	const openCheckout = () => {
		if ( isCheckoutOpen ) return;
		setIsCheckoutOpen( true );
	
		ReactGA.event({ 
			category: "ecommerce",
			action: "begin-checkout", 
		});
		$( "body" ).css({ position: "fixed", top: `-${ window.scrollY }px` });
	};

	const closeCheckout = () => {
		const scrollY = $( "body" ).css( "top" );
		setIsCheckoutOpen( false );
		$( "body" ).css({ position: "initial" });
		window.scrollTo( 0, parseInt( scrollY || "0" ) * -1 );
	};

	return (
		<div className="v-home">
			<header id="header" className="alt">
				<div className="links">
					<Link to="/admin">Employees</Link>
					{/* <Link to="/members">Members Centre</Link> */}
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
					<span onClick={ openCheckout } className="button big">Run with us</span>
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
						<span onClick={ openCheckout } className="button big">Run with us</span>
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
		
				<footer id="footer">
					<ul className="icons">
						<li><a href="https://www.facebook.com/Adultletics-110617777298114/?view_public_for=110617777298114" target="_blank" rel="noreferrer noopener" className="icon"><FontAwesomeIcon icon={ faFacebookSquare } /></a></li>
						<li><a href="mailto:info@adultletics.com.au" className="icon"><FontAwesomeIcon icon={ faEnvelope } /></a></li>
					</ul>
					<p className="copyright">&copy; Kate Hobbs & Mike Hobbs. Design: <a href="https://templated.co">TEMPLATED</a>. Images: <a href="https://unsplash.com">Unsplash</a>.</p>
				</footer>

			</div>

			{ isCheckoutOpen && 
				<div className="modal" id="checkout">
					<div className="content">
						<Stripe />
					</div>
					<div className="background" onClick={ closeCheckout }>
						<FontAwesomeIcon icon={ faTimes } color="white" /> 
					</div>
				</div>
			}
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

const Stripe = () => {
	const stripePromise = loadStripe( "pk_live_mwNb1i31QrYYF4ghnbGz0CuQ00WF3EYB1n" );
	return (
		<Elements stripe={ stripePromise }>
			<CheckoutModal />
		</Elements> 
	);
}; 

const CheckoutModal = () => {
	const [ viewState, setViewState ] = useState( "initial" );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ error, setError ] = useState( "" );
	const stripe = useStripe();
	const elements = useElements();

	const _submitForm = async event => {
		event.preventDefault();
		setIsLoading( true );
		setError( "" );
		const cardElement = elements.getElement( CardElement );
	
		ReactGA.event({ category: "ecommerce", event: "checkout_progress" });
	
		const name = event.target[ 0 ].value;
		const email = event.target[ 1 ].value;
		const data = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
			billing_details: {
				email,
				name,
			},
		});
			
		const { paymentMethod } = data;
		if ( data.error ) {
			setIsLoading( false );
		} else {
			try {
				const { billing_details, id } = paymentMethod;
				const response = await fetch( url, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						billing_details,
						payment_method: id,
					}),
				});
	
				const subscription = await response.json();
	
				if ( subscription.existing_subscriber ) {
					ReactGA.event({ category: "ecommerce", event: "existing_subscriber" });
					setViewState( "existing_subscriber" );
					return;
				}
	
				const { latest_invoice, status } = subscription;
				const { payment_intent } = latest_invoice;
	
				if ( payment_intent ) {
					const { client_secret, status } = payment_intent;
					if ( status === "requires_action" ) {
						const result = await stripe.confirmCardPayment( client_secret );
						if ( result.error ) {
							setError( result.error );
							setIsLoading( false );
							return;
						}
					}
				}
	
				if ( status === "active" || status === "trialing" ) {
					ReactGA.event({ category: "ecommerce", event: "purchase" });
					setViewState( "success" );
					return;
				}
	
				throw { error: "uncaught outcome" };
	
			} catch ( error ) {
				console.error( error );
				ReactGA.event({ category: "ecommerce", event: "server_error", value: error });
				setError( "Something went wrong. Please try again!" ); 
				setIsLoading( false );
			}
		}
	};

	if ( viewState === "initial" ) return (
		<>
			<div>
				<h4>Adultletics Running Club Subscription</h4>
				<p style={{ marginBottom: "0.5em" }}>What’s included:</p>
				<ul>
					<li>x3 structured running sessions per week</li>
					<li>x2 online strength training for runners sessions per week</li>
					<li>x1 weekly team Q&A, check-in and workshop about a different running-related topic</li>
					<li>A daily challenge, that changes weekly (this may be a physical or mental challenge)</li>
					<li>Weekly drills to work on running technique and skill development</li>
					<li>Connection to a like minded group of people for further support, laughs, motivation & inspiration</li>
				</ul>
				<p style={{ marginBottom: "0em" }}><strong>First week is free</strong>, then membership is a flat <strong>$23AUD/per week.</strong> There are NO sign-up fees and NO lock-in contracts.</p>
				<p>Pay as you go and cancel anytime, no charge if you cancel in the first week.</p>
			</div>
			<form id="subscription-form" onSubmit={ _submitForm }>
				<div className="customer-details">
					<div>
						<label>Name</label>
						<input type="text" required placeholder="Please enter your full name"></input>
					</div>
					<div>
						<label>Email</label>
						<input type="email" required placeholder="Please enter your email"></input>
					</div>
				</div>
				<div className="dummy-input">
					<CardElement />
				</div>
				<div>
					<button type="submit" disabled={ isLoading } id="submit-button" style={{ marginTop: "1em" }}>
						Join
						<FontAwesomeIcon icon={ isLoading ? faSpinner : faCheck } spin={ isLoading } style={{ marginLeft: "8px" }} /> 
					</button>
				</div>
				<div>
					{ error && <p>{ error }</p> }
				</div>
			</form>
		</>
	);

	if ( viewState === "existing_subscriber" ) return (
		<p style={{ marginBottom: 0, textAlign: "center" }}>Looks like you're already a member with us :)</p>
	);

	if ( viewState === "success" ) return (
		<>
			<h3 style={{ letterSpacing: "2px" }}>Thank you for signing up, and welcome to the club!</h3>
			<p style={{ marginBottom: 0 }}>An email is on its way to you shortly with more information.</p>
		</>
	);
};
