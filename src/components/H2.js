import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Heading = (props) => {
    return <H2>{props.children}</H2>;
};

Heading.propTypes = {
    children: PropTypes.string,
};

export default memo(Heading);

const H2 = styled.h2`
    color: rgba(0, 0, 0, 0.87);
    font-size: 24px;
    font-weight: 700;
    text-align: center;
`;
