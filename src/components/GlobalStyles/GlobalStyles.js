import React from 'react';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return React.Children.only(children); // chi cho ep truyen vao 1 children
}

// GlobalStyles.propTypes = {
//     children: PropTypes.node.isRequired,
// };

export default GlobalStyles;
