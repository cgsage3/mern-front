import React from 'react';
import { Header, Footer, Button } from '../../../components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
    useGetBioQuery,
} from '../../../services/resumes/ResumeServices';

const ViewBio = () => {
    const { bioId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const { data: bioRespond, isFetching: bioFetch} = useGetBioQuery(bioId);
    const bio = bioRespond?.data;


    console.log(bio);
    return (
        <>
            <ScrollView>
                <Header />
                <Container className="cl-wrapper">
                    <ul>
                    {
                        bioFetch ? <div style={{ margin: '0 auto' }}><p>Loading...</p></div> :
                        Object.keys(bio).map((key, index)=>(
                            <li key={index}>{bio[key]}</li>
                        ))
                    }
                    </ul>

                    <button onClick={() => navigate(`/bio/edit/${bio._id}`)}> Edit Bio </button>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default ViewBio;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
    margin: 0 auto;
`;
const CL = styled.button`
    margin: 40px 0 0 0;
    font-size: 20px;
    font-weight: bold;
`;
const BTN = styled.button`
    padding: 15px 30px;
    cursor: pointer;
    font-size: 18px;
    letter-spacing: 0.5px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    border-radius: 25px;
    background-color: #4c84ff;
    border: none;
    display: block;
    margin: 30px auto 16px;
`;
