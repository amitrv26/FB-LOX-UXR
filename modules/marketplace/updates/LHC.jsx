import CircleButton from "../../../components/button/circleButton";
import UnitHeader from "../../../components/content/UnitHeader";
import Search from "../../../components/search";
import AccessoryListCell from "../../../components/list/AccessoryListCell";

import { updates, earlierUpdates } from "./_data";

const MarketplaceUpdatesLHC = (props) => {
    return (
      <div className="left-navigation">
        <div className="sidebar-wrapper">
            <div className="align-left">
                <UnitHeader>
                    <div>
                        <small>Marketplace › Updates</small>
                        <h2>Updates</h2>
                    </div>
                    <CircleButton
                        deemph
                        style="secondary"
                        size="medium"
                        icon="arrow-left-filled"
                        performAction={() => {
                            props.goBack();
                        }}
                    />
                </UnitHeader>
            </div>

            <UnitHeader>
                <h3>New</h3>
            </UnitHeader>

            { updates.map((update, i) => {
                return (
                <AccessoryListCell
                    badge={update.badge}
                    dp="60"
                    rounded
                    unread={true}
                    key={i}
                    rounded
                    type="nonactor"
                >
                    <div className="context">
                    <h4 className="regular" dangerouslySetInnerHTML={{ __html: update.title }} />
                    <p>{update.timeShort}</p>
                    </div>
                </AccessoryListCell>
                )
            }) }

            <div style={{ height: "8px" }} />

            <UnitHeader>
                <h3>Earlier</h3>
            </UnitHeader>

            { earlierUpdates.map((update, i) => {
                return (
                <AccessoryListCell
                    badge={update.badge}
                    dp="60"
                    rounded
                    unread={true}
                    key={i}
                    rounded
                    type="nonactor"
                >
                    <div className="context">
                        <h4 className="regular" dangerouslySetInnerHTML={{ __html: update.title }} />
                        <p>{update.timeShort}</p>
                    </div>
                </AccessoryListCell>
                )
            }) }
          </div>
      </div>
    )
}
export default MarketplaceUpdatesLHC;
