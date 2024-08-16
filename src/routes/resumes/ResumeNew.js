import React, { useEffect, useState } from 'react';
import {H2 } from '../../components';
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

    const formatPhoneNumber = function(phoneNumberString) {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + ' - ' + match[3];
        }
        return null;
    };


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
    console.log(skills);

    const importOrder = ['languages', 'technologies', 'database ', 'miscellaneous'];
    const sortedSkills = skills?.slice().sort(
        (a, b) => importOrder.indexOf(a.category) + importOrder.indexOf(b.category),
      );

    const openInNewTab = () => {
        const newWindow = window.open('https://'+ bio.website, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
     };

    const rName = user?.name ? user.name :'Cesar Granda';
    return (
        <>
            <div id="pdf" className="pdf-cover">

                <>
                    <div className="page">
                        { bioFetch ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <div className="section row">
                            <h1 className="col"><span className="myname">{rName}</span> </h1>
                            <div className="contact-info col-right">
                                <div>{formatPhoneNumber(bio.phone)}</div>
                                <div><a href="mailto:info@cgranda.com">{bio.email}</a></div>
                                <div>
                                    <Link href="#" onClick = {openInNewTab}>{bio.website}</Link>
                                </div>
                            </div>
                        </div>
                        }
                        <div className="section row">
                            { bioFetch ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                                <div className="col light">
                                    <p>Phone: {formatPhoneNumber(bio.phone)} I Email: {bio.email} I Address: {bio.address} </p>
                                </div>
                            }
                        </div>
                        { bioFetch ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <div className="section row">
                            <H2 className="col">Summary</H2>
                            <div className="section-text col-right row">
                                <div className="bio-text">
                                    {bio.biography}
                                </div>
                            </div>
                        </div>
                        }
                        <div className="section row">
                            <H2 className="col">Work Experience</H2>
                            {isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
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
                                                        <li key={index}>{item}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>;
                                    })}
                                </div>
                                </>
                            }
                        </div>
                        <div className="section row">
                            <H2>Education</H2>
                            {eduFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
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
                            }
                        </div>
                        <div className="section row">
                            <H2 className="col">Technologies and Languages</H2>
                            {skillsFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                                <>
                                <div className="section-text col-right row">
                                    <div className="flex-cont">
                                        {sortedSkills.map((item, index) => {
                                            return <div key={item.category} className="skill-right">
                                                <h3 className="skill-title">{item.category} : </h3><p>{item.skills}</p>
                                            </div>;
                                        })}
                                    </div>
                                </div>
                                </>
                            }
                        </div>
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


