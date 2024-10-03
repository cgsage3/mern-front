import React, { useEffect, useState } from 'react';
import {H2 } from '../../../components';

const Education = (props)=> {
    const sortedEdu = props.education;
    return (
        <div className="section row">
        <H2>Education</H2>
            <>
            <div>
                {sortedEdu.map((item, index) => {
                    return <div className="section-text col-right row" key={index}>
                        <h3>{item.degree} - {item.field}</h3>
                        <div>{item.institution}</div>
                        <div className="row">
                            <div className="col light">{item.address}</div>
                            <div className="col-right light">{item.year}</div>
                        </div>
                    </div>;
                })}
            </div>
            </>
        </div>
    );
};

export default Education;
