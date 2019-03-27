import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const UpStoxLoader = ({ type, color, ...props }) => {
	return <Loader type={type} color={color} height="100" width="100" />;
};

UpStoxLoader.propTypes = {
	type: PropTypes.string,
	color: PropTypes.string,
};

UpStoxLoader.defaultProps = {
	type: 'Puff',
	color: '#00BFFF',
};

export default UpStoxLoader;
