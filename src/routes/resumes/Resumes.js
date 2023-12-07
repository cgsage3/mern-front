import React from 'react';
import { Header, Footer, H2, Button } from '../../components';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';


const Resumes = () => {
    return (
        <>
            <div>
                <Header />
                <div className="resume-wrapper">
                    <H2>Add your Resume information</H2>

                    <Link to="/add-experiences">
                        <Button>Add experiences</Button>
                    </Link>

                    <Link to="/add-bio">
                        <Button>Add biography</Button>
                    </Link>
                    <Link to="/add-edu">
                        <Button>Add education</Button>
                    </Link>
                    <Link to="/add-skills">
                        <Button>Add skills</Button>
                    </Link>
                    <Link to="/view-resume">
                        <Button>View resume</Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
        );
};

export default Resumes;

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
