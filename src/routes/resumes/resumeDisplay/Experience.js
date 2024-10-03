import React, { useEffect, useState } from 'react';
import {H2 } from '../../../components';

const Experience = (props) => {
    const sortedExperience = props.experience;
    return (
    <>
    <div className="section row">
    <H2 className="col">Work Experience</H2>
        <>
        <div className='section-text col-right'>
            {sortedExperience.map((item, index) => {
                return <div className="exp-section" key={index}>
                    <div className='row'>
                        <div className='col'>
                            <h3>{item.companyName}</h3>
                        </div>
                    </div>
                    <div className="row subsection">
                        <div className="emph col">{item.position}</div>
                        <div className="col-right light">{item.year}</div>
                    </div>
                    <ul className="desc">
                        {item.details.map((item, index) => {
                            return (
                                <li key={index}><span className="itemWrap">{item}</span></li>
                            );
                        })}
                    </ul>
                </div>;
            })}
        </div>
        </>
    </div>
    </>
    );
};

export default Experience;
