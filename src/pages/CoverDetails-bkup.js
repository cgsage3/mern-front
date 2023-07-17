import React from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {
    useGetCoverQuery,
} from '../services/CoverServices';

const UserDetails = () => {
    const { coverId } = useParams();

    const { data, isFetching } = useGetCoverQuery(coverId);
console.log(data);
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>Cover Details</H2>
                    <Link to="/covers">Go Back</Link>
                    {isFetching ? <p>Loading...</p> :
                        <div>
                            <p><b>Company:</b> {data?.data?.coverName}</p>
                            <p><b>To:</b> {data?.data?.dear}</p>
                            <p><b>Letter:</b> {data?.data?.letter}</p>
                        </div>
                    }
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default UserDetails;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
`;
