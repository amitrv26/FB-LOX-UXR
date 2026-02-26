import classNames from "classnames";
import Button from "../../components/button/Button";

const MarketplaceBlock = (props) => {
  return (
    <div className={classNames(
      "category-overview",
      props.noborder ? "no-border" : null
    )}>
      { props.category ? <div className="category-header">
        <h3>{props.category}</h3>
        <Button
          content="See All"
          type="secondary"
          size="small"
          deemph={true}
        />
      </div> : <div style={{ paddingTop: "24px" }} /> }
      <div className="marketplace-items">
        { props.list.map((item, i) => {
          return (
            <div className="block" key={i}>
              <div className="img" />
              <h4>{item.price}</h4>
              <p>{item.title}</p>
              <small>{item.location}</small>
              { item.notes ? <div><small>{ item.notes }</small></div> : null }
            </div>
          )
        }) }
      </div>
    </div>
  )
}
export default MarketplaceBlock;
