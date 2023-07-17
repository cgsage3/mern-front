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
    // console.log('data', page);
    console.log(data);
    // const getCovers = () => {
    // 	dispatch(api.endpoints.getCovers.initiate());
    // };

    // useEffect(() => {
    // 	getCovers();
    // }, []);

    return (
        <>
            <ScrollView>
                <Header />
                <Container className="cl-wrapper">
                    <H2>List of Cover Letters</H2>
                    {isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
                        <>
                            {data?.data?.docs.map((item, index) => {
                                return <div key={index} onClick={() => navigate(`/covers/${item.coverName}`)} style={{ padding: '10px', border: '2px solid gray', width: '500px', margin: '0 auto', marginBottom: '20px' }}>
                                    <p><b>To:</b> {item.dear}</p>
                                    <p><b>Company:</b> {item.coverName}</p>
                                </div>;
                            })}
                            <div className="nav-wrapper" style={{ margin: '0 auto', width: '500px' }}>
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
