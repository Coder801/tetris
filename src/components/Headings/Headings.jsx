import React from "react";
import PropTypes from "prop-types";

import styles from "./Headings.module.scss";

const Headings = ({ children, level = 2 }) => {
  const Tag = `h${level}`;
  return <Tag className={styles[level]}>{children}</Tag>;
};

Headings.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

export default Headings;
