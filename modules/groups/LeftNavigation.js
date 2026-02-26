"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "../../components/search";
import UnitHeader from "../../components/content/UnitHeader";
import Button from "../../components/button/Button";
import AccessoryListCell from "../../components/list/AccessoryListCell";

const parentData = [
  {
    title: "Your Feed",
    icon: "glyph-feeds",
    path: "feed"
  },
  {
    title: "Discover",
    icon: "glyph-binoculars-gray-40",
    path: "discover"
  }
];

const groupData = [
  {
    title: "Framer",
    info: "4 new posts"
  },
  {
    title: "The Designers League",
    info: "13 new posts"
  },
  {
    title: "architecture",
    info: "7 new posts"
  },
  {
    title: "Origami Community",
    info: "8 new posts"
  },
  {
    title: "Patterns",
    info: "15 new posts"
  },
  {
    title: "xuxoe",
    info: "6 new posts"
  },
  {
    title: "Creative South",
    info: "3 new posts"
  }
];

function GroupsLeftNavigation(props) {
  const router = useRouter();
  const [activeParent, setActiveParent] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    checkPage(props.page);
  });

  useEffect(() => {
    checkPage(props.page);
  }, [props.page]);

  function checkPage(page) {
    if ( page === "feed" ){
      setActiveParent(0);
      setActiveGroup(null);
    }
    else if ( page === "discover" ){
      setActiveParent(1);
      setActiveGroup(null);
    }
    else if ( page === "group" ){
      setActiveParent(null);
      setActiveGroup(0);
    }
  }

  return (
    <div className="left-navigation">
      <UnitHeader action="true">
        <h2>Groups</h2>
      </UnitHeader>

      <div style={{ padding: "16px 16px 8px" }}>
        <Search placeholder="Search Groups" />
      </div>

      <div style={{ height: "8px" }} />
      { parentData.map((listCell, i) => {

        let active = activeParent === i;

        return (
          <AccessoryListCell
            active={active}
            containedIcon
            handleClick={() => {
              router.push(`/groups/${listCell.path}`);
            }}
            image={`/images/glyphs/${listCell.icon}${active ? '-active' : ''}.png`}
            key={i}
            rounded
            type="nonactor"
          >
            <h4>{listCell.title}</h4>
          </AccessoryListCell>
        )
      })}

      <div style={{ padding: "8px 16px" }}>
        <Button
          content="Create Group"
          type="primary"
          size="medium"
          style="expanding"
          deemph={true}
          icon="plus-filled"
        />
      </div>

      <UnitHeader hairline={true} action="true">
        <h3>Your Groups</h3>
      </UnitHeader>

      <div style={{ marginTop: "8px" }}>
        { groupData.map((listCell, i) => {

          let active = activeGroup === i;

          return (
            <AccessoryListCell
              active={active}
              dp="60"
              rounded
              handleClick={() => {
                router.push("/groups/group");
              }}
              key={i}
              type="nonactor"
            >
              <h4>{listCell.title}</h4>
              <p>{listCell.info}</p>
            </AccessoryListCell>
          )
        })}
      </div>
    </div>
  )
}
export default GroupsLeftNavigation;
