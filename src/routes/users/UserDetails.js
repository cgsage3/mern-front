import React from 'react';
import { Header, Footer, H2 } from '../../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../store/auth/AuthReducer';
import apiRequest, { showToast } from '../../utils/Utilities';
import {
    useGetUserQuery,
} from '../../services/users/UserServices';

const UserDetails = () => {
    const { userId } = useParams();

    const { data, isFetching } = useGetUserQuery(userId);
    const dispatch = useDispatch();
    // const cData= data?.data?.coversPublished;
console.log(data);
    // const del = async () => {
    //   try {
    //     const l = `${process.env.REACT_APP_API_URL}/users/${userId}`;
    //     console.log(l);
    //     const result = await fetch(l, {
    //      method: 'DELETE',
    //     });
    //     dispatch(AuthActions.logout());
    //       // setMessagePdf(result.status);
    //       console.log(result.status);
    //   } catch (err) {
    //         // catch any unexpected errors
    //         // setMessage(response.status);
    //         console.log(err);
    //   }
    // };
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>User Details</H2>
                    <Link to="/users">Go Back</Link>
                {/* <button className="click" onClick={del}>
                  Delete User
                </button>*/}
                    {isFetching ? <p>Loading...</p> :
                        <div>
                            <p><b>Name:</b> {data?.data?.name}</p>
                            <p><b>Email:</b> {data?.data?.email}</p>

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
