import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    resizeWindow,
    minimizeSearch,
    setResponsive,
    setMarketplaceTest
} from "../store/appSlice";

import Header from "./header";
import Frame from "./Frame";
import MarketplaceWrapper from "../modules/marketplace/Wrapper";

const BREAKPOINT_MOBILE = 700;
const BREAKPOINT_TABLET = 1100;

const Layout = (props) => {

    // Dispatch Event
    const dispatch = useDispatch();

    const setWindowSize = () => {
        let vh = window.innerHeight * 0.01;
        let vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        document.documentElement.style.setProperty("--vw", `${vw}px`);

        let windowSizeObj = {
            height: window.innerHeight,
            width: window.innerWidth
        }

        // TODO: debounce this later
        dispatch(resizeWindow(windowSizeObj)); // Update window size redux

        if ( windowSizeObj.width > BREAKPOINT_TABLET ){
            dispatch(setResponsive("desktop"));
        }

        else if ( windowSizeObj.width <= BREAKPOINT_TABLET && windowSizeObj.width > BREAKPOINT_MOBILE){
            dispatch(setResponsive("tablet"));
        }

        else if ( windowSizeObj.width <= BREAKPOINT_MOBILE ){
            dispatch(setResponsive("mobile"));
        }
    }

    const handleView = () => {
        if ( props.product === "marketplace" ){
            return (
                <MarketplaceWrapper {...props}>
                    { props.children }
                </MarketplaceWrapper>
            )
        } else {
            return props.children;
        }
    }

    // Mounted
    useEffect(() => {
        // Set Test Parameters
        if (Object.entries(props.query).length > 0){
            if ( props.query.marketplace.length > 0 ) {
                dispatch(setMarketplaceTest(props.query.marketplace));
            }
        }

        // Handle window sizes
        setWindowSize();
        window.addEventListener("resize", setWindowSize, false);

        // Only run if ResizeObserver is supported.
        if ('ResizeObserver' in self) {
            // Create a single ResizeObserver instance to handle all
            // container elements.
            const ro = new ResizeObserver(function(entries) {
                // Default breakpoints that should apply to all observed
                // elements that don't define their own custom breakpoints.
                const defaultBreakpoints = {
                    MB: 196,
                    TB: 540,
                    TABLET: 700,
                    SM: 960,
                    MD: 1024,
                    LG: 1140,
                    XL: 1280
                };

                entries.forEach(function(entry) {
                    // If breakpoints are defined on the observed element,
                    // use them. Otherwise use the defaults.
                    const breakpoints = entry.target.dataset.breakpoints ?
                        JSON.parse(entry.target.dataset.breakpoints) :
                        defaultBreakpoints;

                    // Update the matching breakpoints on the observed element.
                    Object.keys(breakpoints).forEach(function(breakpoint) {
                        const minWidth = breakpoints[breakpoint];
                        if (entry.contentRect.width >= minWidth) {
                            entry.target.classList.add(breakpoint);
                        } else {
                            entry.target.classList.remove(breakpoint);
                        }
                    });
                });
            });

            // Find all elements with the `data-observe-resizes` attribute
            // and start observing them.
            const elements = document.querySelectorAll('[data-observe-resizes]');
            for (let element, i = 0; element = elements[i]; i++) {
                ro.observe(element);
            }
        }

        return () => {
            window.removeEventListener("resize", setWindowSize);
        }
    }, []);


    // Searchbar Status
    useEffect(() => {
        dispatch(minimizeSearch(props.minSearch));
    }, [props.minSearch]);

    return (
        <div className="layout-container">
            <Header />
            <Frame page={props.product}>{handleView()}</Frame>
        </div>
    );
}
export default Layout;
