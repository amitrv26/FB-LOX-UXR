import Button from "../../components/button/Button";

const GroupsBlock = (props) => {
  return (
    <div className="category-overview">
      <div className="category-header">
        <h3>{props.category}</h3>
        <Button
          content="See All"
          type="secondary"
          size="small"
          deemph={true}
        />
      </div>
      <div className="group-cards">
        {
          props.blocks.map((block, i) => {
            return (
              <div key={i} className="block">
                <div className="img" />
                <GroupContent name={block} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default GroupsBlock;

const GroupContent = (props) => {
  return (
    <div className="content">
      <h4>{props.name}</h4>
      <small>245 Members · 5 posts a week</small>
      <div className="mutual">
        <span className="friend" />
        <span className="friend" />
        <small>2 mutual friends</small>
      </div>
      <Button
        content="Join"
        type="secondary"
        style="expanding"
        size="medium"
      />
    </div>
  )
}
