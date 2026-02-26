import classNames from "classnames";
import { useSelector } from "react-redux";
import Search from "../../components/search";
import CircleButton from "../../components/button/circleButton";
import UnitHeader from "../../components/content/UnitHeader";

import StickyHeader from "../../components/StickyHeader";
import PivotLink from "../../components/navigation/pivotLink";

function EntityHeaderMarketPlace() {

  // Redux
  const sticky = useSelector(state => state.app.sticky);

  return (
    <div className="entity-header--marketplace">
      <StickyHeader style={{ height: "126px"}}>
        <div className={classNames(
          "tab-actions",
          sticky ? "tab-sticked" : null
        )}>
          <UnitHeader align="center">
            <h2>Marketplace</h2>
            <div className="align-right">
              <Search placeholder="Search Marketplace" />
              <CircleButton
                style="secondary"
                size="medium"
                icon="notifications-filled"
              />
            </div>
          </UnitHeader>

          <div className="flowing-links">
            <PivotLink
              style="secondary"
              label="Browse All"
              selected
            />
            <PivotLink
              style="secondary"
              label="Stores"
            />
            <PivotLink
              dropdown={true}
              style="secondary"
              label="Your Account"
            />
            <PivotLink
              dropdown={true}
              style="secondary"
              label="Categories"
            />
            <PivotLink
              style="secondary"
              label="Create New Listing"
              icon="plus"
            />
          </div>
        </div>
      </StickyHeader>
    </div>
  )
}
export default EntityHeaderMarketPlace;
