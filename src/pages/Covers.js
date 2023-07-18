import React, { useEffect, useState } from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
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
                    <Link to="/insertCover">
                        <BTN>Create a Cover Letter</BTN>
                    </Link>
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
