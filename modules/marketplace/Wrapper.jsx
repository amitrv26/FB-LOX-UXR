"use client";

import { useSelector } from "react-redux";
import MarketplaceLHC from "./LHC";
import EntityHeaderMarketplace from "../entityHeader/Marketplace";

const MarketplaceWrapper = (props) => {
    const responsiveView = useSelector(state => state.app.responsiveView);

    return (
        <div className="marketplace-wrapper">
            { responsiveView !== "desktop" ? <EntityHeaderMarketplace /> : null }

            <MarketplaceLHC {...props} />

            <div className="main--marketplace perspective">
                { props.children }
            </div>
        </div>
    )
}
export default MarketplaceWrapper;
