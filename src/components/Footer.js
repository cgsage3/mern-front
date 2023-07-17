import React, { memo } from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterWrapper>
            <div className="container">
                <div className="row">
                    <p style={{ marginLeft: '30px', marginRight: '30px' }}>
                        <span style={{ textAlign: 'left', lineHeight: '60px' }}>
                            ©2023{' '}
                            <a
                                href="/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                Cover Letter App
                            </a>
                        </span>
                        <span style={{ float: 'right', lineHeight: '60px' }}>
                            <b>By:</b>{' '}
                            <a
                                href="/"
                                rel="noreferrer"
                            >
                                {' '}
                                Cesar Granda
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </FooterWrapper>
    );
};

export default memo(Footer);

const FooterWrapper = styled.footer`
    background-color: #fff;
    width: 100%;
`;
