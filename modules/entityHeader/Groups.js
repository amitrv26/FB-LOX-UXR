import { useSelector } from "react-redux";
import classNames from "classnames";
import Search from "../../components/search";
import UnitHeader from "../../components/content/UnitHeader";
import StickyHeader from "../../components/StickyHeader";
import PivotLink from "../../components/navigation/pivotLink";

function EntityHeaderGroups() {

  // Redux
  const sticky = useSelector(state => state.app.sticky);
  const windowWidth = useSelector(state => state.app.windowWidth);

  return (
    <div className="entity-header--groups">
      <StickyHeader style={
        { height: windowWidth < 640 ? "106px" : "60px" }
      }>
        <div className={classNames(
          "tab-actions",
          sticky ? "tab-sticked" : null
        )}>
          <UnitHeader>
            <h2>Groups</h2>

            <div className="flowing-links">
              <PivotLink
                style="secondary"
                label="Feed"
                selected
              />
              <PivotLink
                style="secondary"
                label="Discover"
              />
              <PivotLink
                style="secondary"
                label="Your Groups"
              />
              <PivotLink
                style="secondary"
                label="Create New Group"
                icon="plus"
              />
            </div>

            <div className="align-right">
              <Search placeholder="Search Marketplace" />
            </div>
          </UnitHeader>
        </div>
      </StickyHeader>
    </div>
  )
}
export default EntityHeaderGroups;
