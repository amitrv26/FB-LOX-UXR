"use client";

import { useEffect, useRef, useCallback, Suspense } from "react";
import { Provider, useDispatch } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import {
  resizeWindow,
  setResponsive,
  setMarketplaceTest,
  setAsPath,
} from "../store/appSlice";
import { store } from "../store/redux";
import Frame from "../layout/Frame";
import ShakeToNavigate from "../components/ShakeToNavigate";
import { UseCaseProvider } from "../contexts/UseCaseContext";
import PasswordGate from "../components/PasswordGate";

const BREAKPOINT_MOBILE = 700;
const BREAKPOINT_TABLET = 1100;

function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const hasProcessedParams = useRef(false);

  useEffect(() => {
    if (hasProcessedParams.current) return;
    hasProcessedParams.current = true;

    const marketplace = searchParams.get("marketplace");
    if (marketplace) {
      dispatch(setMarketplaceTest(marketplace));
    }
  }, [searchParams, dispatch]);

  return null;
}

function LayoutContent({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const hasInitialized = useRef(false);

  const setWindowSize = useCallback(() => {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);

    let windowSizeObj = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    dispatch(resizeWindow(windowSizeObj));

    if (windowSizeObj.width > BREAKPOINT_TABLET) {
      dispatch(setResponsive("desktop"));
    } else if (
      windowSizeObj.width <= BREAKPOINT_TABLET &&
      windowSizeObj.width > BREAKPOINT_MOBILE
    ) {
      dispatch(setResponsive("tablet"));
    } else if (windowSizeObj.width <= BREAKPOINT_MOBILE) {
      dispatch(setResponsive("mobile"));
    }
  }, [dispatch]);

  useEffect(() => {
    // Update asPath in Redux when pathname changes
    dispatch(setAsPath(pathname));
  }, [pathname, dispatch]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Handle window sizes
    setWindowSize();
    window.addEventListener("resize", setWindowSize, false);

    // ResizeObserver for container queries
    if ("ResizeObserver" in self) {
      const ro = new ResizeObserver(function (entries) {
        const defaultBreakpoints = {
          MB: 196,
          TB: 540,
          TABLET: 700,
          SM: 960,
          MD: 1024,
          LG: 1140,
          XL: 1280,
        };

        entries.forEach(function (entry) {
          const breakpoints = entry.target.dataset.breakpoints
            ? JSON.parse(entry.target.dataset.breakpoints)
            : defaultBreakpoints;

          Object.keys(breakpoints).forEach(function (breakpoint) {
            const minWidth = breakpoints[breakpoint];
            if (entry.contentRect.width >= minWidth) {
              entry.target.classList.add(breakpoint);
            } else {
              entry.target.classList.remove(breakpoint);
            }
          });
        });
      });

      const elements = document.querySelectorAll("[data-observe-resizes]");
      for (let element, i = 0; (element = elements[i]); i++) {
        ro.observe(element);
      }
    }

    return () => {
      window.removeEventListener("resize", setWindowSize);
    };
  }, [setWindowSize]);

  return (
    <UseCaseProvider>
      <div className="layout-container">
        <Suspense fallback={null}>
          <SearchParamsHandler />
        </Suspense>
        <ShakeToNavigate>
          <Frame>{children}</Frame>
        </ShakeToNavigate>
      </div>
    </UseCaseProvider>
  );
}

export default function ClientLayout({ children }) {
  return (
    <PasswordGate>
      <Provider store={store}>
        <LayoutContent>{children}</LayoutContent>
      </Provider>
    </PasswordGate>
  );
}
