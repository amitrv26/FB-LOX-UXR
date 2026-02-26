"use client";

import Button from "../button/Button";

const BlingString = ({ onCommentClick }) => {
  return (
    <div className="card--bling-string">
      <div className="bling-container">
        <Button
          content="Like"
          type="secondary"
          size="large"
          style="expanding"
          deemph
          icon="like-outline"
        />
        <Button
          content="Comment"
          type="secondary"
          size="large"
          style="expanding"
          deemph
          icon="comment-outline"
          performAction={onCommentClick}
        />
        <Button
          content="Share"
          type="secondary"
          size="large"
          style="expanding"
          deemph
          icon="share-outline"
        />
      </div>
    </div>
  )
}
export default BlingString;
