import { useState } from "react";
import { IconInline } from "../Icon";

const Search = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`search-container ${props.collapsed && !isFocused ? 'collapsed' : ''}`}>
      <input
        type="search"
        placeholder={props.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <IconInline name="magnifying-glass-filled" size={16} className="glyph" />
    </div>
  )
}
export default Search;
