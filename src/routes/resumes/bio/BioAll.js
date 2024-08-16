import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../../../components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    useGetBioAllQuery,
    useGetBiouserQuery,
} from '../../../services/resumes/ResumeServices';

const BioAll = () => {
    const user = useSelector((state) => state.auth.user);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);// used to set number of documents per page

    const navigate = useNavigate();
    // const { data: bioRespond, isFetching: bioFetch} = useGetBioAllQuery();
    const { data: bioRespond, isFetching: bioFetch } = useGetBiouserQuery({id: user._id, page: page + 1, limit: limit});
    const bio = bioRespond?.data?.userBio;
    console.log(bioRespond);
    return (
        <>
            <ScrollView>
                <Header />
                <Container className="cl-wrapper">
                {bio?.map((item, index) => {
                    return <div key={index} onClick={() => navigate(`/bio/${item._id}`)} style={{ padding: '10px', border: '2px solid gray', margin: '0 auto', marginBottom: '20px' }}>
                        <p><b>Bio:</b> {item._id}</p>
                    </div>;
                })}

                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default BioAll;

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
