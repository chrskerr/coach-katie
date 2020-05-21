
// deps
import React, { lazy, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

// app
import "./tools/util"
const Home = lazy(() => import( "./home" ))
const Checkout = lazy(() => import( "./checkout" ))
const Generic = lazy(() => import( "./generic" ))
const Elements = lazy(() => import( "./elements" ))
const Adultletics = lazy(() => import( "./adultletics" ))


//
// Adultletics / Views / Home / Index
//


export default function HomeIndex () {
    const { pathname } = useLocation();
    const { push } = useHistory()

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

        $( "#menu" ).panel({  push });
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="v-home">
            <header id="header">
				<a href="#menu"><FontAwesomeIcon icon={ faBars } />Menu</a>
			</header>
			<nav id="menu">
				<ul className="links">
					<li><a href="/">Home</a></li>
					<li><a href="/adultletics">Adultletics</a></li>
					<li><a href="/generic">Generic</a></li>
					<li><a href="/elements">Elements</a></li>
					<li><a href="/checkout">Checkout</a></li>
					<li><a href="/admin">Employees</a></li>
					{/* <a href="/members">Members Centre</a> */}
                    <a href="#menu" class="close"><FontAwesomeIcon icon={ faTimes } /></a>
				</ul>
			</nav>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/checkout"><Checkout /></Route>
                <Route path="/generic"><Generic /></Route>
                <Route path="/elements"><Elements /></Route>
                <Route path="/adultletics"><Adultletics /></Route>
                <Route path="*"><NoRoute /></Route>
            </Switch>
            <footer id="footer">
				<div className="container">
					<ul className="icons">
						<li><a href="https://www.facebook.com/Adultletics-110617777298114/?view_public_for=110617777298114" target="_blank" rel="noreferrer noopener" className="icon"><FontAwesomeIcon icon={ faFacebookSquare } /></a></li>
						<li><a href="mailto:info@adultletics.com.au" className="icon"><FontAwesomeIcon icon={ faEnvelope } /></a></li>
					</ul>
				</div>
				<p className="copyright">&copy; Kate Hobbs & Mike Hobbs. Design: <a href="https://templated.co">Hielo by TEMPLATED</a>. Images: <a href="https://unsplash.com">Unsplash</a>.</p>
			</footer>
        </div>
    )
}

const NoRoute = () => {
    const history = useHistory();
    history.push( "/" )
    return ( <></> )
}