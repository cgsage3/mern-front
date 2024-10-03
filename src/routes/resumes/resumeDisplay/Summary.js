import React, { useEffect, useState } from 'react';
import {H2 } from '../../../components';

const Summary = (props) => {
    const userInfo = props.user;
    const bio = props.bio.data[0];
console.log(bio);
    const rName = userInfo?.name ? userInfo.name : 'Cesar Granda';
    const formatPhoneNumber = function(phoneNumberString) {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + ' - ' + match[3];
        }
        return null;
    };

    return (
        <>
        <div className="row">
            <h1>{rName} </h1>
            <div className="contact-info">
                <div>
                    <p>Phone: {formatPhoneNumber(bio.phone)}</p>
                    <p>Email: {bio.email}</p>
                    <p>Address: {bio.address} </p>
                </div>
            </div>
        </div>
        <div className="section row">
            <H2 className="col">Summary</H2>
            <div className="section-text col-right row">
                <div className="bio-text">
                    {bio.biography}
                </div>
            </div>
        </div>
        </>
    );
};
export default Summary;
