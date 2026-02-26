"use client";

import { useRouter } from "next/navigation";
import AccessoryListCell from "../../../components/list/AccessoryListCell";
import Card from "../../../components/card/Card";
import Button from "../../../components/button/Button";
import UnitHeader from "../../../components/content/UnitHeader";

import updates from "./_data";

const MarketplaceUpdatesBanner = (props) => {
    const router = useRouter();
    return (
        <div className="updates-container">
            <Card>
                <UnitHeader action>
                    <h3>Updates • {updates.length}</h3>
                    <Button
                        content={"See All (" + updates.length + ")"}
                        type="secondary"
                        size="small"
                        deemph={true}
                        performAction={() => {
                            if ( props.currentTest === "flow2" ){
                                props.changeState();
                            } else {
                                router.push("/marketplace/updates");
                            }
                        }}
                    />
                </UnitHeader>
                <div className="updates-list">
                    { updates.map((update, i) => {
                        return (
                            <AccessoryListCell
                                badge={update.badge}
                                dp="60"
                                rounded
                                unread={true}
                                key={i}
                                type="nonactor"
                                handleClick={() => {
                                    if ( props.currentTest === "flow2" ){
                                        props.changeState();
                                    } else {
                                        router.push("/marketplace/updates");
                                    }
                                }}
                            >
                                <div className="context">
                                    <h4 className="regular" dangerouslySetInnerHTML={{ __html: update.title }} />
                                    <p>{update.time}</p>
                                </div>
                            </AccessoryListCell>
                        )
                    }) }
                </div>
            </Card>
        </div>
    )
}

export default MarketplaceUpdatesBanner;
