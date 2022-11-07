import React from 'react';
 

function Helmet(props) {
    const { title, children } = props;
    document.title = 'Shop Iphone - ' + title;

    return <div>{children}</div>;
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
};

Helmet.defaultProps = {
    title: 'Iphone',
};

export default Helmet;
