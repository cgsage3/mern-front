import React, { useEffect, useState } from 'react';
import { Header, Footer, H2 } from '../../components';
import styled from 'styled-components';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
    useGetPublisherAllQuery,
    useGetPublishersQuery,
} from '../../services/covers/publishedServices';
import { api } from '../../store/api/api';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';


const Publisher = () => {
    console.log('Rendered');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);// used to set number of documents per page
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


    const { data, isFetching } = useGetPublishersQuery({id: user._id, page: page + 1, limit: limit});
    const coversAll= data?.data?.coversPublished;

    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    // console.log(coversAll);

    const [totalP, setTotalP] = useState([]);
    useEffect(()=> {
      totalMDB();
    }, []);

    const totalMDB = async () => {
        fetch(`${process.env.REACT_APP_API_URL}/publishAll/` + user._id)
        .then((response) => {
            return response.json(); // << This is the problem
        })
        .then((responseData) => { // responseData = undefined
            setTotalP(responseData.data.coversPublishedAll);
            // setbio(responseData.json());
            return responseData;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    const [filteredResults, setFilteredResults] = useState(coversAll);// Created to limit Rerendering of code

    useEffect(() => {
        const newFilteredResults = data?.data?.coversPublished.filter((cover) =>
            cover.coverName.toLowerCase().includes(searchTerm),
        );
        setFilteredResults(newFilteredResults);

        console.log('effect is firing');
    }, [coversAll, searchTerm]);// run code only on change of these variables

    // console.log(filteredResults);
// console.log(Math.ceil(totalP/limit));
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

                    {isFetching ? <div style={{ margin: '0 auto' }}><p>Loading...</p></div> :
                        <>

                            {filteredResults?.map((item, index) => {
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
                                    pageCount={Math.ceil(totalP/limit)}
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

export default Publisher;

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
