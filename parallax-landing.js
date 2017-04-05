import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Parallax from "react-parallax-effect";
//
import {fetchParallaxHtml} from "../actions/actions_parallax-landing";
import {fetchParallaxPropsexampleJs} from "../actions/actions_parallax-landing";
import {fetchParallaxMethodsexampleJs} from "../actions/actions_parallax-landing";
import {fetchParallaxPropsDemoexampleJson} from "../actions/actions_parallax-landing";
import {fetchParallaxCssDemoexampleCss} from "../actions/actions_parallax-landing";
import {fetchParallaxDeployexampleHtml} from "../actions/actions_parallax-landing";
import {fetchParallaxIntrosectionHtml} from "../actions/actions_parallax-landing";
import {fetchParallaxEndangeredsectionHtml} from "../actions/actions_parallax-landing";
import {fetchParallaxPreservesectionHtml} from "../actions/actions_parallax-landing";
//
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class ParallaxLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		this.props.fetchParallaxHtml();
		this.props.fetchParallaxPropsexampleJs();
		this.props.fetchParallaxMethodsexampleJs();
		this.props.fetchParallaxPropsDemoexampleJson();
		this.props.fetchParallaxCssDemoexampleCss();
		this.props.fetchParallaxDeployexampleHtml();
		this.props.fetchParallaxIntrosectionHtml();
		this.props.fetchParallaxEndangeredsectionHtml();
		this.props.fetchParallaxPreservesectionHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let reactparallaxRef
			= scopeProxy.refs.reactparallax;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			let updateNavigationState
				= scopeProxy.props.updateNavigationstateAction;
			let setViewLoaded
				= scopeProxy.props.setViewLoadedAction;
			let setLayoutMode
				= scopeProxy.props.setLayoutModeAction;
			//
			let setviewTimeout =
				setTimeout(function()
				{
					setViewLoaded(true);
					setLayoutMode("full");
					updateNavigationState(navigationSection);
				},
				500);
			//
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		// empty
	}
	render()
	{
		let scopeProxy
			= this;
		let parallaxHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let parallaxPropsDemoExample
			= (scopeProxy.props.parallaxPropsexampleJs !== undefined
			&& scopeProxy.props.parallaxPropsexampleJs !== null)
			? scopeProxy.props.parallaxPropsexampleJs
			: "loading...";
		let parallaxMethodsDemoExample
			= (scopeProxy.props.parallaxMethodsexampleJs !== undefined
			&& scopeProxy.props.parallaxMethodsexampleJs !== null)
			? scopeProxy.props.parallaxMethodsexampleJs
			: "loading...";
		let parallaxPropsExample
			= (scopeProxy.props.parallaxPropsDemoexampleJson !== undefined
			&& scopeProxy.props.parallaxPropsDemoexampleJson !== null)
			? scopeProxy.props.parallaxPropsDemoexampleJson
			: "loading...";
		let parallaxCssDemoExample
			= (scopeProxy.props.parallaxCssDemoexampleCss !== undefined
			&& scopeProxy.props.parallaxCssDemoexampleCss !== null)
			? scopeProxy.props.parallaxCssDemoexampleCss
			: "loading...";
		let parallaxDeployExample
			= (scopeProxy.props.parallaxDeployexampleHtml !== undefined
			&& scopeProxy.props.parallaxDeployexampleHtml !== null)
			? scopeProxy.props.parallaxDeployexampleHtml
			: "loading...";
		let parallaxIntrosectionHtml
			= scopeProxy.props.parallaxIntrosectionHtml;
		let parallaxEndangeredsectionHtml
			= scopeProxy.props.parallaxEndangeredsectionHtml;
		let parallaxPreservesectionHtml
			= scopeProxy.props.parallaxPreservesectionHtml;
		//
		let parallaxProfile =
			{
				"Panel":
				{
					"Classname":"parallax-panel"
				},
				"Viewport":
				{
					"Face":
					{
						"Classname":"parallax-viewport"
					},
					"Filter":
					{
						"Blurfactor":.02
					}
				},
				"Change":function(event)
				{
					// empty
				},
				"Ready":function(event)
				{
					// empty
				}
			}
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"parallax",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":parallaxHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={parallaxPropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let reactparallaxRef = this.refs.reactparallax;"}/>
								<hr/>
								<Highlight lang="js" value={parallaxMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={parallaxPropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={parallaxCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-parallax-effect -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Parallax from 'react-parallax-effect';"}/>
								<hr/>
								<Highlight lang="html" value={parallaxDeployExample}/>
							</Panel>
						</div>
						<div id="parallax-showcase-container" ref="parallaxshowcase" className="parallax-showcase">
							<div id="parallax-heading-container" ref="parallaxheading" className="parallax-heading">
								<div id="parallax-heading-headline-container" ref="parallaxheadingheadline" className="parallax-heading-headline">
									Demo
								</div>
							</div>
							<div id="parallax-navcluster-container" className="parallax-navcluster">
								<Button className="parallax-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, "mainsection1")}>Cheetah</Button>
								<Button className="parallax-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, "mainsection2")}>Endangered</Button>
								<Button className="parallax-section-button" onClick={scopeProxy.jumpTo.bind(scopeProxy, "mainsection3")}>Preserve</Button>
							</div>
							<Parallax ref="reactparallax" {...parallaxProfile}>
								<div id="parallax-layer_0-container" ref="parallaxlayer_0" rangeIndex="1" className="parallax-layer_0">
									<div id="parallax-layer_0-section_1-container" ref="mainsection1" className="parallax-layer_0-section parallax-layer_0-section_1">
										<div id="parallax-section_1-image-container" className="parallax-section_1-image"></div>
										<div id="parallax-section_1-copy-container" className="parallax-section_1-copy" dangerouslySetInnerHTML={{"__html":parallaxIntrosectionHtml}}></div>
									</div>
									<div id="parallax-layer_0-section_2-container" ref="mainsection2" className="parallax-layer_0-section parallax-layer_0-section_2">
										<div id="parallax-section_2-copy-container" className="parallax-section_2-copy" dangerouslySetInnerHTML={{"__html":parallaxEndangeredsectionHtml}}></div>
										<div id="parallax-section_2-image-container" className="parallax-section_2-image"></div>
									</div>
									<div id="parallax-layer_0-section_3-container" ref="mainsection3" className="parallax-layer_0-section parallax-layer_0-section_3">
										<div id="parallax-section_3-image-container" className="parallax-section_3-image"></div>
										<div id="parallax-section_3-copy-container" className="parallax-section_3-copy" dangerouslySetInnerHTML={{"__html":parallaxPreservesectionHtml}}></div>
									</div>
								</div>
								<div id="parallax-layer_1-container" ref="parallaxlayer_1" rangeIndex="2" className="parallax-layer_1">
									<div id="parallax-layer_1-section-container" className="parallax-layer_1-section parallax-layer_1-section_1"></div>
									<div id="parallax-layer_1-section-container" className="parallax-layer_1-section parallax-layer_1-section_2"></div>
									<div id="parallax-layer_1-section-container" className="parallax-layer_1-section parallax-layer_1-section_3"></div>
								</div>
							</Parallax>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Parallax Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	jumpTo(sectionRef)
	{
		let scopeProxy
			= this;
		let reactparallaxRef
			= this.refs.reactparallax;
		let sectionTop
			= this.refs[sectionRef].offsetTop;
		//
		ReactGA.event(
		{
		  "category":"parallax_action",
		  "action":"section_navigate",
		  "label":"navigate-to_".concat(sectionRef)
		});
		reactparallaxRef.scrollTo(
		{
			"Location":
			{
				"Top":sectionTop,
				"Left":0
			},
			"Motion":
			{
				"Easing":"easeInOutCubic",
				"Duration":1000
			}
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}
// Map Redux state items to this.props properties
// each time the Redux state changes. When that
// happens, the render() function is called
// and the DOM is updated according to any
// changes that happened in this.props. Use this
// to retrieve values from the Redux state and
// place them in this.props.
function mapReduxstateToProps(reduxState)
{
	return(
	{
		"html":reduxState.parallaxReducer.html,
		"parallaxPropsexampleJs":reduxState.parallaxReducer.parallaxPropsexampleJs,
		"parallaxMethodsexampleJs":reduxState.parallaxReducer.parallaxMethodsexampleJs,
		"parallaxPropsDemoexampleJson":reduxState.parallaxReducer.parallaxPropsDemoexampleJson,
		"parallaxCssDemoexampleCss":reduxState.parallaxReducer.parallaxCssDemoexampleCss,
		"parallaxDeployexampleHtml":reduxState.parallaxReducer.parallaxDeployexampleHtml,
		"parallaxIntrosectionHtml":reduxState.parallaxReducer.parallaxIntrosectionHtml,
		"parallaxEndangeredsectionHtml":reduxState.parallaxReducer.parallaxEndangeredsectionHtml,
		"parallaxPreservesectionHtml":reduxState.parallaxReducer.parallaxPreservesectionHtml,
		"setViewLoadedAction":reduxState.mainReducer.setViewloadedAction,
		"setLayoutModeAction":reduxState.mainReducer.setLayoutmodeAction,
		"updateNavigationstateAction":reduxState.navigationReducer.updateNavigationstateAction
	});
}
// Map Redux action-creators to this.props properties
// when the component is initialized. This gives access
// to each action-creator to the component from within
// this.props so that actions can be dispatched. Use
// this to initially establish values in the Redux state.
export default connect(mapReduxstateToProps,
{
	"fetchParallaxHtml":fetchParallaxHtml,
	"fetchParallaxPropsexampleJs":fetchParallaxPropsexampleJs,
	"fetchParallaxMethodsexampleJs":fetchParallaxMethodsexampleJs,
	"fetchParallaxPropsDemoexampleJson":fetchParallaxPropsDemoexampleJson,
	"fetchParallaxCssDemoexampleCss":fetchParallaxCssDemoexampleCss,
	"fetchParallaxDeployexampleHtml":fetchParallaxDeployexampleHtml,
	"fetchParallaxIntrosectionHtml":fetchParallaxIntrosectionHtml,
	"fetchParallaxEndangeredsectionHtml":fetchParallaxEndangeredsectionHtml,
	"fetchParallaxPreservesectionHtml":fetchParallaxPreservesectionHtml
})(ParallaxLanding);