"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { flagMarketplaceUpdates } from "../../store/appSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { transition } from "../../components/vars";

import Button from "../../components/button/Button";
import UnitHeader from "../../components/content/UnitHeader";
import Search from "../../components/search";
import AccessoryListCell from "../../components/list/AccessoryListCell";

import MarketplaceVehiclesLHC from "./vehicles/LHC";
import MarketplaceUpdatesLHC from "./updates/LHC";

import categories from "./_data";

const MarketplaceLHC = (props) => {
  const router = useRouter();

  // Track Updates State
  const marketplaceUpdates = useSelector(state => state.app.marketplaceUpdates);
  const marketplaceTest = useSelector(state => state.app.marketplaceTest);

  // Set States
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);

  // On load
  useEffect(() => {
    if (props.page === "vehicles"){
      setOpen(true);
      setCategoriesOpen(true);
    }
  }, []);

  // Track Page Updates
  useEffect(() => {
    if ( props.page === "vehicles" ){
      setOpen(true);
      setCategoriesOpen(true);
    } else {
      setOpen(false);
      setCategoriesOpen(false);
    }
  }, [props.page]);

  // When Marketplace Banner is Cleared
  useEffect(() => {
    if ( marketplaceTest === "flow2" && !marketplaceUpdates && !updatesOpen ){
      setOpen(true);
      setUpdatesOpen(true);
    }
  }, [marketplaceUpdates]);

  // Dispatch Event
  const dispatch = useDispatch();

  return (
    <div className="left-navigation">
      <motion.div
        className="sidebar-wrapper"
        animate={ open ? "exit" : "enter" }
        exit={ open ? "exit" : "enter" }
        variants={ transition.slideLeft }
      >
        <UnitHeader align="center">
          <h2>Marketplace</h2>
        </UnitHeader>

        <div style={{ padding: "16px 16px 8px" }}>
          <Search placeholder="Search Marketplace" />
        </div>

        <div style={{ height: "8px" }} />

        <AccessoryListCell
          active={props.page === "all"}
          containedIcon
          image={`/images/glyphs/marketplace${props.page === "all" ? '-active' : ''}.png`}
          type="nonactor"
          rounded
          handleClick={() => {
            router.push("/marketplace");
          }}
        >
          <h4>Browse all</h4>
        </AccessoryListCell>

        <AccessoryListCell
          active={props.page === "stores"}
          containedIcon
          image={`/images/glyphs/shopping-bag${props.page === "stores" ? '-active' : ''}.png`}
          type="nonactor"
          rounded
          handleClick={() => {
            router.push("/marketplace/stores");
          }}
        >
          <h4>Stores</h4>
        </AccessoryListCell>

        <AccessoryListCell
          active={props.page === "updates"}
          containedIcon
          image={`/images/glyphs/bell${props.page === "updates" ? '-active' : ''}.png`}
          type="nonactor"
          rounded
          chevron={marketplaceTest === "flow2"}
          handleClick={() => {
            if ( marketplaceTest === "flow2" ){
              setOpen(true);
              setUpdatesOpen(true);
              dispatch(flagMarketplaceUpdates(false))
            } else {
              router.push("/marketplace/updates");
            }
          }}
        >
          <h4>Updates</h4>
        </AccessoryListCell>

        <AccessoryListCell
          containedIcon
          image="/images/glyphs/friend-neutral.png"
          type="nonactor"
          rounded
          dropdown
        >
          <h4>Your account</h4>
        </AccessoryListCell>

        <div className="new-listing-btn">
          <Button
            content="Create new listing"
            type="primary"
            size="large"
            style="expanding"
            icon="plus-filled"
            deemph
          />
        </div>

        <div className="new-listing-btn">
          <Button
            content="Create multiple listings"
            type="secondary"
            size="large"
            style="expanding"
          />
        </div>

        <UnitHeader hairline={true}>
          <h3>Categories</h3>
        </UnitHeader>

        <div style={{ height: "8px" }} />

        { categories.map((listCell, i) => {
          return (
            <AccessoryListCell
              chevron
              key={i}
              containedIcon
              image={`/images/glyphs/${listCell.icon}.png`}
              type="nonactor"
              rounded
              handleClick={() => {
                if ( listCell.link ){
                  router.push(`/${listCell.link}`);
                }
              }}
            >
              <h4>{listCell.title}</h4>
            </AccessoryListCell>
          )
        })}
      </motion.div>

      <motion.div
        className="categories-wrapper"
        initial="initial"
        animate={ categoriesOpen ? "enter" : "initial" }
        exit="exit"
        variants={ transition.slideLeft }
      >
        <MarketplaceVehiclesLHC {...props} />
      </motion.div>

      <motion.div
        className="categories-wrapper"
        initial="initial"
        animate={ updatesOpen ? "enter" : "initial" }
        exit="exit"
        variants={ transition.slideLeft }
      >
        <MarketplaceUpdatesLHC
          {...props}
          goBack={() => {
            setOpen(false);
            setUpdatesOpen(false);
          }} />
      </motion.div>
    </div>
  )
}
export default MarketplaceLHC;
