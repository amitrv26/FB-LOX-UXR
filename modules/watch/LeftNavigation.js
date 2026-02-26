import { useState } from "react";
import Button from "../../components/button/Button";
import UnitHeader from "../../components/content/UnitHeader";
import Search from "../../components/search";
import AccessoryListCell from "../../components/list/AccessoryListCell";

const categoryData = [
  {
    title: "For You",
    icon: "glyph-profile-circle" },
  {
    title: "Watchlist",
    icon: "glyph-clock" },
  {
    title: "News",
    icon: "glyph-news-feed-headlines" },
  {
    title: "Live",
    icon: "glyph-camcorder-live" },
  {
    title: "Sports",
    icon: "glyph-football" },
  {
    title: "Beauty",
    icon: "glyph-lipstick" },
  {
    title: "Gaming",
    icon: "glyph-games" }
]

function WatchLeftNavigation() {
  const [activeParent, setActiveParent] = useState(0);
  return (
    <div className="left-navigation">
      <UnitHeader action="true">
        <h2>Watch</h2>
        <Button
          content="Settings"
          type="secondary"
          size="small"
          deemph={true}
        />
      </UnitHeader>

      <div style={{ padding: "16px 16px 8px" }}>
        <Search placeholder="Search Videos" />
      </div>

      <div style={{ marginTop: "8px" }}>
        { categoryData.map((listCell, i) => {
          let active = activeParent === i;
          return (
            <AccessoryListCell
              active={active}
              containedIcon
              handleClick={() => { setActiveParent(i) }}
              image={`/images/glyphs/${listCell.icon}${active ? '-active' : ''}.png`}
              key={i}
              type="nonactor"
              rounded
            >
              <h4>{listCell.title}</h4>
            </AccessoryListCell>
          )
        })}
      </div>
    </div>
  )
}
export default WatchLeftNavigation;
