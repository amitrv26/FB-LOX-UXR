"use client";

import { useRouter } from "next/navigation";
import CircleButton from "../../../components/button/circleButton";
import UnitHeader from "../../../components/content/UnitHeader";
import Search from "../../../components/search";
import AccessoryListCell from "../../../components/list/AccessoryListCell";

import { categories } from "./_data";

const MarketplaceVehiclesLHC = (props) => {
  const router = useRouter();
  return (
    <div className="left-navigation">
      <div className="sidebar-wrapper">
        <div className="align-left">
          <UnitHeader>
            <div>
              <small>Marketplace › Vehicles</small>
              <h2>Vehicles</h2>
            </div>

            <CircleButton
              deemph
              style="secondary"
              size="medium"
              icon="arrow-left-filled"
              performAction={() => {
                router.back();
              }}
            />
          </UnitHeader>
        </div>

          <div style={{ padding: "16px 16px 8px" }}>
            <Search placeholder="Search Vehicles" />
          </div>

          <UnitHeader hairline={true}>
            <h3>Filters</h3>
          </UnitHeader>

          <div style={{ height: "8px" }} />

          <div className="filters">
            { categories.map((listCell, i) => {
              return (
                <AccessoryListCell
                  key={i}
                  type="inline"
                  rounded
                  dropdown={true}
                >
                  <h5>{listCell.title}</h5>
                </AccessoryListCell>
              )
            })}
          </div>

        </div>
    </div>
  )
}
export default MarketplaceVehiclesLHC;
