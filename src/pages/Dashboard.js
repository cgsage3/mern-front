import React from 'react';
import { Header, Footer } from '../components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <h1>Dashboard</h1>
                    <p>
                        <b>Name</b>: {user.name}
                    </p>
                    <p>
                        <b>Email</b>: {user.email}
                    </p>
                    <Link to="/covers">
                        <CL>View Cover Letters</CL>
                    </Link>
                    <Link to="/insertCover">
                        <BTN>Create a Cover Letter</BTN>
                    </Link>

                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default Dashboard;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
    width: 800px;
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
