import React from "react";
import PropTypes from "prop-types";

const ExternalLink = ({ link, children, bold = false }) => {
  return (
    <a href={`${link}`} target='_blank' rel='noreferrer'>
      {bold ? <strong>{children}</strong> : children}
    </a>
  );
};

ExternalLink.propTypes = {
  link: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  bold: PropTypes.bool
};

export default ExternalLink;
