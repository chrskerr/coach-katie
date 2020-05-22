
// deps
import React, { useState } from "react";

import ReactGA from "react-ga";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// app


//
// Adultletics / Views / Home / Join
//

const url = "https://stripe-server-xdzmzxo7uq-lz.a.run.app/";

export default function Join () {
	const stripePromise = loadStripe( "pk_live_mwNb1i31QrYYF4ghnbGz0CuQ00WF3EYB1n" );
	return (
		<>
			<section id="two" className="wrapper style2">
				<div className="inner">
					<div className="box">
						<div className="content">
							<header className="align-center">
								<p>Sign up to one of our plans</p>
								<h2>Join The Club</h2>
							</header>
							<Elements stripe={ stripePromise }>
								<CheckoutForm />
							</Elements> 
						</div>
					</div>
				</div>
			</section>
		</>
	);
} 

const CheckoutForm = () => {
	const [ checkoutStage, setCheckoutStage ] = useState( "initial" );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ formData, setFormData ] = useState({ name: "", email: "", agreed: false });
	const { name, email, agreed } = formData;
	
	const [ error, setError ] = useState( "" );
	const stripe = useStripe();
	const elements = useElements();

	const _submitForm = async event => {
		event.preventDefault();
		setIsLoading( true );
		setError( "" );
		const cardElement = elements.getElement( CardElement );
	
		ReactGA.event({ category: "ecommerce", event: "checkout_progress" });
	
		if ( !agreed ) {
			setError( "Please accept the terms" );
			return; 
		}

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
					setCheckoutStage( "existing_subscriber" );
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
					setCheckoutStage( "success" );
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

	if ( checkoutStage === "initial" ) return (
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
				<div className="row uniform">
					<div className="6u 12u$(xsmall)">
						<label>Name</label>
						<input type="text" required placeholder="Please enter your full name" value={ name } onChange={ e => setFormData({ ...formData, name: e.target.value })}></input>
					</div>
					<div className="6u$ 12u$(xsmall)">
						<label>Email</label>
						<input type="email" required placeholder="Please enter your email" value={ email } onChange={ e => setFormData({ ...formData, email: e.target.value })}></input>
					</div>

					<div className="dummy-input 12u$">
						<label>Card Details</label>
						<CardElement />
					</div>
					<div className="12u$">
						<label>Terms and Conditions</label>
						<textarea type="fieldarea" readOnly value={ terms } rows={ 5 } />
					</div>
					<div className="12u$">
						<input type="checkbox" required checked={ agreed } value={ agreed } onChange={ () => setFormData({ ...formData, agreed: !agreed })}></input>
						<label onClick={ () => setFormData({ ...formData, agreed: !agreed })}>I have read and agreed to the terms and conditions as above</label>
					</div>
					<div className="12u$">
						<button className="special" type="submit" disabled={ isLoading || !agreed || !name || !email } id="submit-button">
						Join
							<FontAwesomeIcon icon={ isLoading ? faSpinner : faCheck } spin={ isLoading } style={{ marginLeft: "8px" }} /> 
						</button>
					</div>
					<div>
						{ error && <p>{ error }</p> }
					</div>
				</div>
			</form>
		</>
	);

	if ( checkoutStage === "existing_subscriber" ) return (
		<p style={{ marginBottom: 0, textAlign: "center" }}>Looks like you&apos;re already a member with us :)</p>
	);

	if ( checkoutStage === "success" ) return (
		<>
			<h3 style={{ letterSpacing: "2px" }}>Thank you for signing up, and welcome to the club!</h3>
			<p style={{ marginBottom: 0 }}>An email is on its way to you shortly with more information.</p>
		</>
	);
};

const terms = `By agreeing to the terms and conditions, I decree that I have read and understood the contents of this document. Any questions I may have had about this document have been answered to my satisfaction and I by ticking this box, I hereby consent to the terms and conditions as outlined below:
 
Voluntary Participation- My participation in this course is voluntary. I agree to fully participate and I will fully disclose any pre-existing conditions or injuries in advance of the training to the organizers and instructors that may limit or hinder my participation.

Assumption of Risk – I realize that during this program there are several ways that I could potentially hurt myself if I am not careful and pay close attention to my Instructors and the proper safety techniques I am taught. I realize that my participation in any of these activities is strictly voluntary and that I assume the risks associated with these activities. I could: (a) receive blisters, cuts and abrasions, and (b) suffer serious bodily injury.

Waiver – I release Michael Hobbs, Kate Hobbs, the sponsors, organizers, instructors, volunteers, and site property owners (as well as all of their affiliates, directors, officers, trustees, employees, representatives, or agents) from all actions or claims of any kind that relate to my participation in this course. I understand and acknowledge that this waiver binds my heirs, administrators, executors, personal representatives, and assignees.

Hold Harmless – I hold Michael Hobbs, Kate Hobbs, the sponsors, organizers, instructors, volunteers, and site owners harmless and indemnify them against all actions or claims (including reasonable attorneys’ fees, judgments and costs) with respect to any injuries, death, or other damages or losses, resulting from my participation in this course.

Medical Treatment - If I am injured during this course, Michael Hobbs, Kate Hobbs, the organizers, instructors or volunteers of this course may render medical services to me, or request that others provide such services. By taking such action, Michael Hobbs, Kate Hobbs, the organizers and volunteers are not admitting any liability to provide or to continue to provide any such services and that such action is not a waiver by the organizers or volunteers of any rights under this release and waiver. Should I require transport to a medical facility as a result of an injury, I am financially responsible for such transportation and medical treatment costs. If I am injured during this course it is my responsibility to seek appropriate medical care and to notify the organizers. I understand that this waiver will have no bearing on any workers compensation claims that I may make as a result of my participation in this event.
 
Media Release- I understand that this entire course will be photographed and recorded for future content creation. I understand that by voluntarily posting in the Facebook group, that that content may be used for future content creation. This may include audio and visual recording of me, including depiction of my full face, body and voice. I hereby forever grant Michael Hobbs, Kate Hobbs, The Embodied Runner and his/her/ its legal representatives, successors, assigns, licensees, advertising agencies, and all person or corporations acting with his/her/its permission, the irrevocable and unrestricted right to use, re-use, publish and re-publish, and copyright my performance, likeness, picture, portrait, photograph, sound and/or voice recording, including the negatives, transparencies, prints, film, video, tapes, digital or other information
pertaining to them in all forms of media now or hereafter known and in all manner, including electronic media, in still, single, multiple, moving or video format, in whole or part and/or composite representations, in conjunction with my own of a fictitious name, including alteration, modifications, derivations and composites thereof, throughout the world and universe for advertising, promotion, trade or any lawful purposes. This right shall include, but not be limited to, the right to combine my likeness with others and to alter my likeness, by digital means or otherwise, for the purposes set forth herein. I waive my right to inspect or approve the finished product, including written copy that may be created in connection there- with or the use to which it may be applied.
 
Intellectual Property- I understand that the material presented in this course is Intellectual property of Michael Hobbs and Kate Hobbs and reproduction of any kind is liable to immediate legal action.
Film or digital photography, video photography, and/or audio recordings of any kind of the instruction and training at the course are strictly prohibited without the express permission of the instructors. All film, digital or video imagery and audio recordings are copyright protected. Any person found to have infringed such copyright would be liable to immediate legal action.`;