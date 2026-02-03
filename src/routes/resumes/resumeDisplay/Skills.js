import React, { useEffect, useState } from 'react';
import {H2} from '../../../components';

const Skills = (props)=> {
    const {skills} = props;
    console.log(props.fetching);
    return (
        <>
        <div className="section row">
            <H2 className="col">Technologies and Languages</H2>
            <div className="section-text col-right row">
                <div className="flex-cont">
                    {skills.map((item, index) => {
                        return <div key={item.category} className="skill-right">
                            <h3 className="skill-title">{item.category}: </h3><p>{item.skills}</p>
                        </div>;
                    })}
                </div>
            </div>
        </div>
        </>
    );
};

export default Skills;
