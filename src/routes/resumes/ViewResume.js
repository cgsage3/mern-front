import React, { useEffect, useState } from 'react';
import { Header, Footer, H2 } from '../../components';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import {
    useGetExperiencesQuery,
    useGetBioQuery,
    useGetEdusQuery,
    useGetSkillsQuery,
} from '../../services/resumes/ResumeServices';
// import { api } from '../../store/api/api';

const ViewResume = () => {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const { data, isFetching } = useGetExperiencesQuery(page + 1);
    // console.log('data', data);
    const resumeList = data?.data?.docs;

    const { data: bioRespond} = useGetBioQuery('6567a340e80d8a0aa96295b4');
    const bio = bioRespond?.data?.biography;

    const { data: eduRespond, isFetching: eduFetching } = useGetEdusQuery(page + 1);
    const edu = eduRespond?.data?.docs;
    console.log(edu);

    const { data: skillsRespond, isFetching: skillsFetching } = useGetSkillsQuery(page + 1);
    const skills = skillsRespond?.data?.docs;
    console.log(skills);

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <ScrollView>
                <Header />
                <Container className="resume-wrapper">
                    <H2>Biography</H2>
                    <div>
                        <p>{bio}</p>
                    </div>
                    <H2>Experiences</H2>
                    {isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <>
                        <div style={{ padding: '10px', margin: '0 auto', marginBottom: '20px' }}>
                            {resumeList.map((item, index) => {
                                return <ul key={index}>
                                    <li><b>Year:</b> {item.year}</li>
                                    <li><b>Position:</b> {item.position}</li>
                                    <li><b>Company:</b> {item.companyName}</li>
                                    <li>
                                        {item.details.map((item, index) => {
                                             return <ul key={index}>
                                                <li>{item}</li>
                                             </ul>;
                                        })}
                                    </li>
                                </ul>;
                            })}
                        </div>
                        </>
                    }
                    <H2>Education</H2>
                    {eduFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <>
                        <div style={{ padding: '10px', margin: '0 auto', marginBottom: '20px' }}>
                            {edu.map((item, index) => {
                                return <ul key={index}>
                                    <li><b>year:</b> {item.year}</li>
                                    <li><b>degree:</b> {item.degree}</li>
                                    <li><b>field:</b> {item.field}</li>
                                    <li><b>insitution:</b> {item.insitution}</li>
                                    <li><b>address:</b> {item.address}</li>
                                </ul>;
                            })}
                        </div>
                        </>
                    }
                    <H2>Skills</H2>
                    {skillsFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <>
                        <div style={{ padding: '10px', margin: '0 auto', marginBottom: '20px' }}>
                            {skills.map((item, index) => {
                                return <ul key={index}>
                                    <li><b>category:</b> {item.category}</li>
                                    <li><b>skills:</b> {item.skills}</li>
                                </ul>;
                            })}
                        </div>
                        </>
                    }

                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default ViewResume;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    padding-top: 50px;
`;

