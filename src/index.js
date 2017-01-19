import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import _ from "lodash";
//
//*************************
//*************************
// Nonpublished Imports
//
function updateState(ScopeProxy, Parcel)
{
	let existingState
		= (ScopeProxy.state !== null)
		? _.cloneDeep(ScopeProxy.state)
		: {};
	let adjustedState
		= _.merge(existingState, _.cloneDeep(Parcel));
	//
	try
	{
		ScopeProxy.setState(adjustedState);
	}
	catch(event)
	{
		console.warn("::react-parallax:problem::updateState:", event);
	}
}
function watch(Testfunction)
{
	let watchCore =
		{
			"Match":function(Target, Complete, ExpireAt)
			{
				let intervalCount
					= 0;
				let maximumAttempts
					= (ExpireAt !== undefined)
					? ExpireAt
					: 2000;
				//
				let watchInterval =
					setInterval(function()
					{
						if(Testfunction() === Target)
						{
							Complete();
							//
							clearInterval(watchInterval);
						}
						if(intervalCount >= maximumAttempts)
						{
							console.warn("react-parallax.js::watch::exceeded watch limit timeout::action halted.")
							//
							clearInterval(watchInterval);
						}
						intervalCount++;
					},
					1);
				//
			}
		}
	//
	return watchCore;
}
//
//*************************
//*************************
// Exports
//
export default class Parallax extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;		
		//
		updateState(scopeProxy,
		{
			"Ready":false,
			"Panel":
			{
				"Style":{},
				"Classname":this.props.Panel.Classname
			},
			"Viewport":
			{
				"Style":
				{
					"display":"inline-block",
					"position":"relative",
					"width":"100%",
					"height":"100%",
					"overflow":"hidden",
					"box-sizing":"border-box"
				},
				"Classname":this.props.Viewport.Face.Classname,
				"Filter":
				{
					"Blurfactor":this.props.Viewport.Filter.Blurfactor
				},
				"Ready":this.props.Ready
			},
			"Scroll":
			{
				"Style":
				{
					"position":"absolute",
					"visibility":"hidden",
					"opacity":0,
					"width":"0px",
					"height":"0px"
				},
				"Profile":
				{
					"runOnMount":false
				},
				"Change":this.props.Change,
			},
			"Content":
			{
				"Size":
				{
					"Width":"0px",
					"Height":"0px"
				}
			}
		});
		this.setListeners();
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
				scopeProxy.state.Viewport.Ready(
				{
					"Elements":scopeProxy.props.children
				});
				scopeProxy.adjustContentSize();
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let viewportChildren
			= (this.props.children !== undefined
			&& this.props.children !== null)
			? this.props.children
			: null;
		let panelStyle
			= _.has(this, "state.Panel.Style")
			? this.state.Panel.Style
			: null;
		let panelClassname
			= _.has(this, "state.Panel.Classname")
			? this.state.Panel.Classname
			: "parallax-panel";
		let viewportStyle
			= _.has(this, "state.Viewport.Style")
			? this.state.Viewport.Style
			: null;
		let viewportClassname
			= _.has(this, "state.Viewport.Classname")
			? this.state.Viewport.Classname
			: "parallax-viewport";
		let scrollelementsStyle
			= _.has(this, "state.Scroll.Style")
			? this.state.Scroll.Style
			: null;
		let scrollelementsProfile
			= _.has(this, "state.Scroll.Profile")
			? this.state.Scroll.Profile
			: null;
		//
		let renderParallaxLayers =
			(layerElements) =>
			{
				let elementCount
					= 0;
				let totalElements
					= layerElements.length;
				//
				let parallaxElements =
					layerElements.map(function(layerElement)
					{
						let elementId
							= "parallax-layer_".concat(elementCount.toString());
						let elementRef
							= "parallaxlayer_".concat(elementCount.toString());
						let layerTopValue
							= (elementCount > 0
							&& _.has(scopeProxy, "state.Profiles.Top"))
							? scopeProxy.state.Profiles.Top[elementCount]
							: null;
						let layerLeftValue
							= (elementCount > 0
							&& _.has(scopeProxy, "state.Profiles.Left"))
							? scopeProxy.state.Profiles.Left[elementCount]
							: null;
						let layerBlurValue
							= (elementCount > 0
							&& _.has(scopeProxy, "state.Profiles.Blur")
							&& scopeProxy.state.Profiles.Blur !== "0")
							? "blur(".concat(scopeProxy.state.Profiles.Blur, "px)")
							: null;
						let contentWidth
							= _.has(scopeProxy, "state.Content.Size")
							? scopeProxy.state.Content.Size.Width
							: "0px";
						let contentHeight
							= _.has(scopeProxy, "state.Content.Size")
							? scopeProxy.state.Content.Size.Height
							: "0px";
						let overflowValue
							= (elementCount === 0)
							? "auto"
							: "hidden";
						let widthValue
							= (elementCount === 0)
							? "100%"
							: contentWidth;
						let heightValue
							= (elementCount === 0)
							? "100%"
							: contentHeight;
						let zIndexValue
							= totalElements
							- elementCount;
						//
						let elementStyle =
							{
								"display":"block",
								"position":"absolute",
								"top":layerTopValue,
								"left":layerLeftValue,
								"width":widthValue,
								"height":heightValue,
								"margin":"0",
								"padding":"0",
								"overflow":overflowValue,
								"zIndex":zIndexValue,
								"box-sizing":"border-box",
								"filter":layerBlurValue
							}
						//
						let elementProfile =
							{
								"id":elementId,
								"ref":elementRef,
								"style":elementStyle
							}
						//
						let parallaxElement
							= <div {...elementProfile}>{layerElement}</div>
						//
						layerElement.props.style
						= {};
						//
						elementCount++;
						//
						return parallaxElement;
					});
				//
				return parallaxElements;
			}
		//
		return(
			<div id="parallax-panel-container" ref="parallaxpanel" style={panelStyle} className={panelClassname}>
				<div id="parallax-viewport-container" ref="parallaxviewport" style={viewportStyle} className={viewportClassname}>
					{renderParallaxLayers(viewportChildren)}
				</div>
				<VelocityComponent {...scrollelementsProfile}>
					<div id="scroll-elements-container" ref="scrollelements" style={scrollelementsStyle}></div>
				</VelocityComponent>
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	setListeners()
	{
		let scopeProxy
			= this;
		let totalElements
			= this.props.children.length;
		let mainelementRef
			= this.refs.parallaxlayer_0;
		let blurMagnitude
			= 0;
		let layerTopValues
			= [];
		let layerLeftValues
			= [];
		let scrollLocations
			= [];
		//
		mainelementRef.addEventListener("scroll", _.debounce(function()
		{
			scrollLocations
			= [];
			//
			updateState(scopeProxy,
			{
				"Profiles":
				{
					"Top":layerTopValues,
					"Left":layerLeftValues,
					"Blur":"0"
				}
			});
		},
		100));
		mainelementRef.addEventListener("scroll", function(event)
		{
			let scrollTop
				= event.target.scrollTop;
			let scrollLeft
				= event.target.scrollLeft;
			let totalScrollLocations
				= scrollLocations.length;
			let blurFactor
				= (scopeProxy.state !== null)
				? scopeProxy.state.Viewport.Filter.Blurfactor
				: 0;
			//
			scrollLocations.push(
			{
				"Top":scrollTop,
				"Left":scrollLeft
			});
			let scrolltopDelta
				= (totalScrollLocations > 0)
				? scrollTop
				- scrollLocations[totalScrollLocations - 1].Top
				: 0;
			let scrollleftDelta
				= (totalScrollLocations > 0)
				? scrollLeft
				- scrollLocations[totalScrollLocations - 1].Left
				: 0;
			let scrollDelta
				= (Math.abs(scrolltopDelta) > Math.abs(scrollleftDelta))
				? scrolltopDelta
				: scrollleftDelta;
			let elementIndex
				= 0;
			//
			layerTopValues
			= [];
			layerLeftValues
			= [];
			blurMagnitude
			= Math.abs(scrollDelta * blurFactor);
			//
			scopeProxy.props.children.map(function(parallaxChild)
			{
				let elementRangeIndex
					= parallaxChild.props.rangeIndex;
				let elementMotionRatio
					= 1 / parseInt(elementRangeIndex);
				let adjustedTopLocation
					= (elementIndex !== 0)
					? parseInt((-scrollTop * elementMotionRatio)).toString().concat("px")
					: scrollTop.toString().concat("px");
				let adjustedLeftLocation
					= (elementIndex !== 0)
					? parseInt((-scrollLeft * elementMotionRatio)).toString().concat("px")
					: scrollLeft.toString().concat("px");
				//
				elementIndex++;
				//
				layerTopValues.push(adjustedTopLocation);
				layerLeftValues.push(adjustedLeftLocation);
			});
			updateState(scopeProxy,
			{
				"Profiles":
				{
					"Top":layerTopValues,
					"Left":layerLeftValues,
					"Blur":blurMagnitude.toString()
				}
			});
			scopeProxy.onChange(
			{
				"Top":layerTopValues,
				"Left":layerLeftValues
			});
		});
	}
	onChange(Parcel)
	{
		let layerTopValues
			= Parcel.Top;
		let layerLeftValues
			= Parcel.Left;
		let changeParcels
			= [];
		let elementIndex
			= 0;
		//
		this.props.children.map(function(parallaxLayer)
		{
			let changeParcel =
				{
					"Element":parallaxLayer,
					"Location":
					{
						"Top":layerTopValues[elementIndex],
						"Left":layerLeftValues[elementIndex]
					}
				}
			//
			elementIndex++;
			//
			changeParcels.push(changeParcel);
		});
		this.state.Scroll.Change(changeParcels);
	}
	scrollTo(Parcel)
	{
		let scopeProxy
			= this;
		let primarychildRefvalue
			= this.props.children[0].ref;
		let primarylayerRef
			= this.refs[primarychildRefvalue];
		let topScrollto
			= Parcel.Location.Top;
		let leftScrollto
			= Parcel.Location.Left;
		let scrollDuration
			= Parcel.Motion.Duration;
		let scrollEasing
			= Parcel.Motion.Easing;
		let existingScrolltop
			= primarylayerRef.scrollTop;
		let existingScrollleft
			= primarylayerRef.scrollLeft;
		let deltaTop
			= topScrollto
			- existingScrolltop;
		let deltaLeft
			= leftScrollto
			- existingScrollleft;
		//
		let scrollelementsProfile =
			{
				"duration":scrollDuration,
				"easing":scrollEasing,
				"runOnMount":false,
				"animation":
				{
					"opacity":1
				},
				"progress":function(elements, complete, remaining, start, tweenValue)
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity. This must be avoided so that the
					// rotation of the sections does not revert to its original
					// rotation value.
					//
					let opacityValue
						= (elements[0].style.opacity > 0)
						? elements[0].style.opacity
						: 1;
					let adjustedScrolltop
						= deltaTop * opacityValue
						+ existingScrolltop;
					let adjustedScrollleft
						= deltaLeft * opacityValue
						+ existingScrolltop;
					//
					primarylayerRef.scrollTop
					= adjustedScrolltop;
					primarylayerRef.scrollLeft
					= adjustedScrollleft;
				},
				"complete":function()
				{
					updateState(scopeProxy,
					{
						"Scroll":
						{
							"Style":
							{
								"position":"absolute",
								"visibility":"hidden",
								"opacity":0
							},
							"Profile":
							{
								"duration":0,
								"easing":"easeOutQuad",
								"runOnMount":false,
								"animation":
								{
									"opacity":0
								}
							}
						}
					});
				}
			}
		//
		updateState(scopeProxy,
		{
			"Scroll":
			{
				"Profile":scrollelementsProfile
			}
		});
	}
	adjustContentSize()
	{
		let scopeProxy
			= this;
		let mainlayerRefvalue
			= this.props.children[0].ref;
		let mainlayerElement
			= this.refs[mainlayerRefvalue];
		let mainlayerWidth
			= ReactDOM.findDOMNode(mainlayerElement).firstChild.offsetWidth;
		let mainlayerHeight
			= ReactDOM.findDOMNode(mainlayerElement).firstChild.offsetHeight;
		//
		updateState(scopeProxy,
		{
			"Content":
			{
				"Size":
				{
					"Width":mainlayerWidth.toString().concat("px"),
					"Height":mainlayerHeight.toString().concat("px")
				}
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