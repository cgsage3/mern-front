import React, { useState, useEffect } from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import {
    useGetCoverQuery,
} from '../services/CoverServices';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CoverOnly from './CoverOnly';


const CoverDetails = () => {
    const p = ReactHtmlParser;
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const coverOnlyMode = params.get('coveronly');

    const { coverId } = useParams();

    const { data, isFetching } = useGetCoverQuery(coverId);
    console.log(data);


    const [message, setMessage] = useState(null);
    const [messagePdf, setMessagePdf] = useState(null);

    const handleClick = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/pdf/covers/${coverId}`,
          );
          const result = await fetch(url, { method: 'HEAD' });
            setMessage(response.status);
            console.log(response.status);
        } catch (err) {
            // catch any unexpected errors
            setMessage(response.status);
            console.log(err);
        }
    };

    const pdfUrl = `http://localhost:8080/cover${coverId}.pdf`;
    const pdfName = `${coverId}.pdf`;
    const downloadFile = async () => {
      const result = await fetch(pdfUrl, { method: 'HEAD' });
      setMessagePdf(result.status);
      console.log(result.status);
    };
    return (
        <>
        <ScrollView>
            <Header />
            <Container>

                <button className="click" onClick={handleClick}>
                  Generate Pdf
                </button>
                <button className="click" onClick={downloadFile}>
                  view Pdf
                </button>
                {messagePdf == 200 && <div><a href={pdfUrl} download={pdfName}>Download Cover Letter Pdf</a></div>}
                <CoverOnly />
            </Container>
        </ScrollView>
        <Footer />
        </>
    );
};

export default CoverDetails;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    padding-top: 50px;
    width: 800px;
    margin: 0 auto;
`;
