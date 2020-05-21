
// deps
import React, { lazy, useEffect } from "react";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

// app
import "./tools/util"
const Home = lazy(() => import( "./home" ))
const Checkout = lazy(() => import( "./checkout" ))
const Generic = lazy(() => import( "./generic" ))
const Elements = lazy(() => import( "./home" ))


//
// Adultletics / Views / Home / Index
//


export default function HomeIndex () {
    const { pathname } = useLocation();

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

        $( "#menu" )
        .append( "<a href=\"#menu\" class=\"close\"></a>" )
        .appendTo( $( ".v-home" ))
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: "right",
        });
    }, []);
    
    return (
        <div className="v-home">
            <header id="header" className="alt">
				<a href="#menu">Menu</a>
			</header>
			<nav id="menu">
				<ul className="links">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/adutletics">Adultletics</Link></li>
					<li><Link to="/generic">Generic</Link></li>
					<li><Link to="/elements">Elements</Link></li>
					<li><Link to="/checkout">Checkout</Link></li>
					<li><Link to="/admin">Employees</Link></li>
					{/* <Link to="/members">Members Centre</Link> */}
				</ul>
			</nav>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/checkout"><Checkout /></Route>
                <Route path="/generic"><Generic /></Route>
                <Route path="/elements"><Elements /></Route>
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