const Default = ({ glyph, children }) => {
  return (
    <div className="default-content">
      {glyph && (
        <div className="default-icon">
          <img src={`/images/glyphs/${glyph}.png`} alt="" />
        </div>
      )}
      <div className="default-message">{children}</div>
    </div>
  );
};

export default Default;
