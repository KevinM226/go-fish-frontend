import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
   const { Tag, className, text } = props;

   return (
      <Tag className={className}>
         {text}
      </Tag>
   );
}

Header.propTypes = {
   Tag: PropTypes.string.isRequired,
   className: PropTypes.string,
   text: PropTypes.string.isRequired
}

export default Header;