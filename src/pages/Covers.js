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
    const coverList = data?.data?.docs;
    console.log(coverList);

    const [searchTerm, setSearchTerm] = useState('');
    const results = coverList?.filter((cover) =>
        cover.coverName.toLowerCase().includes(searchTerm),
    );
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <ScrollView>
                <Header />
                <Container className="cl-wrapper">
                    <Link to="/insertCover">
                        <BTN>Create a Cover Letter</BTN>
                    </Link>
                    <H2>List of Cover Letters</H2>
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    {
                        <>

                            {results?.map((item, index) => {
                                return <div key={index} onClick={() => navigate(`/covers/${item._id}`)} style={{ padding: '10px', border: '2px solid gray', margin: '0 auto', marginBottom: '20px' }}>
                                    <p><b>Company:</b> {item.coverName}</p>
                                    <p><b>To:</b> {item.dear}</p>
                                </div>;
                            })}
                            <div className="nav-wrapper" style={{ margin: '0 auto'}}>
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
