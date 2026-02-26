import { useSelector } from "react-redux";
import GroupsLeftNavigation from "../groups/LeftNavigation";
import EntityHeaderGroups from "../entityHeader/Group";

const MarketplaceWrapper = (props) => {

    const responsiveView = useSelector(state => state.app.responsiveView);

    return (
        <>
            { responsiveView !== "desktop"
                ? <EntityHeaderGroups /> : null }

            <GroupsLeftNavigation {...props} />

            <div className="main--groups perspective">
                {props.children}
            </div>
        </>
    )
}
export default MarketplaceWrapper;
