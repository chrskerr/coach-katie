
// deps
import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import _ from "lodash";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";


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
		<>
			<section id="One" className="wrapper style3">
				<div className="inner">
					<header className="align-center">
						<p>An online and in-person running techique and longevity programme</p>
						<h2>Kate&apos;s Technique</h2>
					</header>
				</div>
			</section>

			<section id="two" className="wrapper style2">
				<div className="inner">
					<div className="box">
						<div className="content">
							<header className="align-center">
								<p>Adultletics Running Club Membership</p>
								<h2>An Athletics Club for Grown-ups</h2>
							</header>
							<p>Aduletics is a run club and a runner&apos;s school all in one. It&apos;s much more than just &apos;going for a run&apos;. Our focus is about teaching runners how to run, and to equip our runners with the tools they need to train both the brain AND the body.</p>
							<p>We&apos;re all about building stronger AND smarter runners, so there is just as much an emphasis on running technique, skill development, injury prevention and education as there is on the actual programming.</p>
						</div>
					</div>
				</div>
			</section>

			<section id="three" className="wrapper style2">
				<div className="inner">
					<div className="grid-style">
						<div>
							<div className="box">
								<div className="image fit">
									<img src="https://source.unsplash.com/pizgoJNQ-xY/800x400" alt="" />
								</div>
								<div className="content">
									<header className="align-center">
										<h2>Running development</h2>
									</header>
									<p>All of our weekly structured running sessions (including intervals, hills, tempo & aerobic training) are accompanied by running drills to work on technique development, both to improve running efficiency & reduce risk of injury. We place a large emphasis on explaining the ‘why’s’ of our training, the purpose of each type of session, what each drill is working to improve and educating our runners.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="box">
								<div className="image fit">
									<img src="https://source.unsplash.com/GYr9A2CPMhY/800x400" alt="" />
								</div>
								<div className="content">
									<header className="align-center">
										<h2>Strength training</h2>
									</header>
									<p>Every week our program includes 2 x strength training sessions, designed specifically for runners. Strength training is SO important not only for improving performance but also to help prevent running injuries, and is an essential part of all our runners’ training.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="box">
								<div className="image fit">
									<img src="https://source.unsplash.com/RL1AS-Kryzw/800x400" alt="" />
								</div>
								<div className="content">
									<header className="align-center">
										<h2>Education</h2>
									</header>
									<p>Our philosophy at Adultletics is to equip our runners with the tools they need to improve not only from a performance perspective, but to learn how to listen to our bodies, optimise running form, recover better, and ultimately become more informed, happier and healthier runners. We do this by explaining the purpose of every session and technique drill, holding weekly educational webinars with a different focus every week, a daily challenge that changes weekly with either a physical or mentor focus, and answering all questions that our members have in regards to any aspect of their training.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="box">
								<div className="image fit">
									<img src="https://source.unsplash.com/c59hEeerAaI/800x400" alt="" />
								</div>
								<div className="content">
									<header className="align-center">
										<h2>Social connection</h2>
									</header>
									<p>Adultletics believes running is better done with others. It’s more fun, more sustainable, and you are more likely to achieve your goals, whatever they may be. For this reason we have built our club into an online running community - this is where not only the program for the week is shared as well as our educational content, but members’ questions are answered, members share their progress, accomplishments & struggles, as well as how they felt during certain sessions, and general banter!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="four" className="wrapper style2">
				<div className="inner">
					<div className="box">
						<div className="content">
							<header className="align-center">
								<h2>Run With Us</h2>
							</header>
							<p>What’s included:</p>
							<ul>
								<li>x3 structured running sessions per week (a speedplay session, an aerobic session and a &apos;mystery&apos; session)</li>
								<li>x2 online strength training for runners sessions per week</li>
								<li>x1 weekly team Q&A, check-in and workshop about a different running-related topic (such as choosing the right shoes, running technique, nutrition for runners, goal setting etc.)</li>
								<li>A daily challenge, that changes weekly (this may be a physical or mental challenge)</li>
								<li>Weekly drills to work on running technique and skill development</li>
								<li>Connection to a like minded group of people for further support, laughs, motivation & inspiration</li>
							</ul>
							<p style={{ marginBottom: "0.5em" }}><strong>First week is free</strong>, then membership is a flat <strong>$23AUD/per week.</strong> There are NO sign-up fees and NO lock-in contracts.</p>
							<p>Pay as you go and cancel anytime, no charge if you cancel in the first week.</p>
							<p>Contact us at <a href="mailto:info@adultletics.com.au">info@adultletics.com.au</a> if you&apos;d like more information.</p>
							<div style={{ textAlign: "center" }}>
								<span className="button big">Run with us</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="five" className="wrapper style2">
				<div className="inner">
					<div className="box">
						<div className="content">
							<header className="align-center">
								<h2>Frequently Asked Questions</h2>
							</header>
							{ faqItems && _.map( faqItems, ( item, i ) => <FaqItem key={ i } id={ i } item={ item } /> )}
						</div>
					</div>
				</div>
			</section>

			<section id="six" className="wrapper style2">
				<div className="inner">
					<div className="grid-style">
						<div>
							<div className="box">
								<div className="content">
									<header className="align-center">
										<p>About The Coaches</p>
										<h2>Mike Hobbs</h2>
									</header>
									<p><span className="image left"><img src="./images/mike.png" alt="Mike Hobbs" /></span>Mike Hobbs is the creator of the Embodied Runner program, the medical director of an international marathon team comprising over 100 athletes, and is a sports and rehabilitation chiropractor. He works extensively with runners and consults online for runners all around the world. He is currently training for a sub 3-hour road marathon, his master Kettlebell certification and his first ultra marathon later in 2020.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="box">
								<div className="content">
									<header className="align-center">
										<p>About The Coaches</p>
										<h2>Kate Hobbs</h2>
									</header>
									<p><span className="image left"><img src="./images/kate.png" alt="Kate Hobbs" /></span>Kate is a certified running coach, bringing her own extensive first-hand experience to her athletes. She has raced competitively at a national level for over a decade, running track, trail and mountains. With a recent transition to obstacle course racing, she is already making a name for herself as one of Australia’s top female elite athletes, with multiple podium finishes and representing Australia at the World Championships.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
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
