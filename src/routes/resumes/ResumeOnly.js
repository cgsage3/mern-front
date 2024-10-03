import React, { useEffect, useState } from 'react';
import {H2 } from '../../components';
import Summary from './resumeDisplay/Summary';
import Experience from './resumeDisplay/Experience';
import Education from './resumeDisplay/Education';
import Skills from './resumeDisplay/Skills';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    useGetExperiencesQuery,
    useGetBioNoIdQuery,
    useGetEdusQuery,
    useGetSkillsQuery,
} from '../../services/resumes/ResumeServices';
// import { api } from '../../store/api/api';

const ResumeOnly = () => {
    const user = useSelector((state) => state.auth.user);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const compare = function( a, b ) {
        const yearA = parseInt(a.year, 10);// convert string to integer
        const yearB = parseInt(b.year, 10);// convert string to integer
        // console.log(yearA);
        return yearB - yearA;// compare
    };


    const { data: bioRespond, isFetching: bioFetch} = useGetBioNoIdQuery();
    const bio = bioRespond?.data[0];
    console.log(bioRespond);

    const { data: experience, isFetching } = useGetExperiencesQuery(page + 1);// get data from experience doc, create new const named experience
    const experienceList = experience?.data?.docs;// get experience data conditionally if data exists

    const sortedExperience = experienceList?.slice().sort(compare);// create shallow copy then sort using compare function
    // console.log('experience', experienceList);


    const { data: eduRespond, isFetching: eduFetching } = useGetEdusQuery(page + 1);
    const edu = eduRespond?.data?.docs;
    const sortedEdu = edu?.slice().sort(compare);// create shallow copy then sort using compare function

    // console.log(edu);

    const { data: skillsRespond, isFetching: skillsFetching } = useGetSkillsQuery(page + 1);
    const skills = skillsRespond?.data?.docs;
    console.log(skillsFetching);

    const importOrder = ['languages', 'technologies', 'database ', 'miscellaneous'];
    const sortedSkills = skills?.slice().sort(
        (a, b) => importOrder.indexOf(a.category) + importOrder.indexOf(b.category),
      );

    const openInNewTab = () => {
        const newWindow = window.open('https://'+ bio.website, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
     };

    return (
        <>
            <div id="pdf" className="pdf-cover">

                <>
                    <div className="page">
                        { bioFetch ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                            <Summary user={user} bio={bioRespond}/>
                        }
                        {isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                            <Experience experience={sortedExperience}/>
                        }
                        {skillsFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                            <Skills skills={sortedSkills} fetching={skillsFetching}/>
                        }
                        {eduFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                            <Education education={sortedEdu}/>
                        }
                    </div>
                </>
            </div>
        </>
    );
};

export default ResumeOnly;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;


