import React from "react";
import PropTypes from "prop-types";

require
  .context("../assets/icons/", false)
  .keys()
  .forEach(file => {
    require("../assets/icons/" + file.slice(2));
  });

const Icon = props => (
  <svg className={`rat-icon rat-icon-${props.name}`}>
    <use xlinkHref={`#icon-${props.name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string
};

export default Icon;
