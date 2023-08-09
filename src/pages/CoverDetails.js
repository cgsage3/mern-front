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
    const coverIndex = data?.data?._id;
    console.log(data);

    const [messageG, setMessageG] = useState(null);
    const [messagePdf, setMessagePdf] = useState(null);
    const [messageDel, setMessageDel] = useState(null);
    // const [bio, setbio] = useState([]);
    // useEffect(()=> {
    //   bioMDB();
    // }, []);

    const handleClick = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/pdf/covers/${coverId}`,
          );
          const result = await fetch(url, { method: 'HEAD' });
            setMessageG(response.status);
            console.log(response.status);
        } catch (err) {
            // catch any unexpected errors
            setMessage(response.status);
            console.log(err);
        }
    };

    const pdfUrl = `https://cover-letter-mern-back.onrender.com/uploads/cover${coverId}.pdf`;
    // const pdfUrl = `http://localhost:8080/uploads/cover${coverId}.pdf`;
    const pdfName = `${coverId}.pdf`;

    // const bioMDB = async () => {
    //     const response = await fetch(pdfUrl, { method: 'HEAD' });

    //     setbio(await response.json());
    // };

    const downloadFile = async () => {
      const result = await fetch(pdfUrl, { method: 'HEAD' });
      setMessagePdf(result.status);
      console.log(result.status);
    };

    const l = `${process.env.REACT_APP_API_URL}/covers/${coverId}`;
    const delFile = async () => {
        try {
            const fetchResult = await fetch(l, {
             method: 'DELETE',
            });
            const result = await fetchResult.json();

            if (fetchResult.ok) {
              setMessageDel(result.message);
              return result;
            }
            const responseError = {
              type: 'Error',
              message: result.message || 'Something went wrong',
              data: result.data || '',
              code: result.code || '',
            };

            let error = new Error();
            error = { ...error, ...responseError };
            throw (error);
        } catch (e) {
            setMessageDel('Failed deleting cover', e);
            console.log('Failed deleting cover', e); // handle error
        }
    };

    // console.log(bio.message);
    return (
        <>
        <ScrollView>
            <Header />
            <Container>

                <button className="click" onClick={handleClick}>Generate Pdf</button>
                <button className="click" onClick={downloadFile}>
                  view Pdf
                </button>
                {messagePdf == 404 && <div>No Pdf found</div>}
                {messagePdf == 200 && <div><a href={pdfUrl} download={pdfName}>Download Cover Letter Pdf</a></div>}
                <CoverOnly/>
                <button className="click del" onClick={delFile}>
                  Delete Cover Letter
                </button>
                <div>{messageDel}</div>
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
    margin: 0 auto;
`;
