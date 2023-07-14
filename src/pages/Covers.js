import React, { useEffect, useState } from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    useGetCoversQuery,
} from '../services/CoverServices';
import { api } from '../services/api';
import ReactPaginate from 'react-paginate';

const Covers = () => {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const { data, isFetching } = useGetCoversQuery(page + 1);
    console.log('data', page);
    // const getUsers = () => {
    // 	dispatch(api.endpoints.getUsers.initiate());
    // };

    // useEffect(() => {
    // 	getUsers();
    // }, []);

    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>Covers</H2>
                    {isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <>
                            {data?.data?.docs.map((item, index) => {
                                return <div key={index} onClick={() => navigate(`/users/${item._id}`)} style={{ padding: '10px', border: '2px solid gray', width: '500px', margin: '0 auto', marginBottom: '20px' }}>
                                    <p><b>Name:</b> {item.name}</p>
                                    <p><b>Email:</b> {item.email}</p>
                                </div>;
                            })}
                            <div style={{ margin: '0 auto', width: '500px' }}>
                                <ReactPaginate
                                    initialPage={page}
                                    onPageChange={(page) => setPage(page.selected)}
                                    pageRangeDisplayed={5}
                                    pageCount={data?.data?.totalPages}
                                    activeClassName="active"
                                />
                            </div>
                        </>
                    }
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default Covers;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    padding-top: 50px;
`;
