import React, { useState, useEffect } from 'react';
import { Header, Footer, H2 } from '../../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import ResumeOnly from './ResumeOnly';


const ViewResume = () => {
    const { coverId } = useParams();
    const [messagePdf, setMessagePdf] = useState('not clicked');
    const [messageDel, setMessageDel] = useState(null);
    const [spinner, setSpinner] = useState('hidden');
    // const pdfUrl = `https://cover-letter-mern-back.onrender.com/uploads/cover${coverId}.pdf`;
    const pdfUrl = `${process.env.REACT_APP_BACK_URL}/uploads/resume.pdf`;
    const pdfName = `${coverId}.pdf`;
console.log(pdfUrl);
    const handleClick = async () => {
        try {
          const ping = await fetch(pdfUrl, { method: 'HEAD' });
          console.log(ping);
          if (ping.status == 404) {
            setMessagePdf('not-found');
          }
          if (ping.status == 200) {
            setMessagePdf('found');
          }
        } catch (err) {
            // catch any unexpected errors
            console.log(err);
        }
    };
    const generate = async () => {
        setSpinner('clicked');
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/pdf/resume`,
                setSpinner('finished'),
            );
            const r = await response.json();
            console.log('r rep', r);
        } catch (err) {
            // catch any unexpected errors
            console.log(err);
        }
    };

    const delUrl = `${process.env.REACT_APP_API_URL}/covers/${coverId}`;
    const delFile = async () => {
        try {
            const fetchResult = await fetch(delUrl, {
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
                <button className="click">
                    <Link to={`/edit-cover/${coverId}`}>
                        Edit Resume
                    </Link>
                </button>
                <button className="click" onClick={handleClick}>View Pdf</button>
                    <div>
                        {messagePdf=='not-found' &&
                        <>
                            <p>no PDF found. Click button to generate pdf:</p>
                            <button className="click" onClick={generate}>Generate Pdf</button>
                            {spinner && (
                            <p>{spinner}</p>
                            )}
                        </>
                        }
                        {messagePdf=='found' &&
                        <>
                        <a href={pdfUrl} download="resume">Download Cover Letter Pdf</a>

                        </>
                        }
                    </div>
                <ResumeOnly/>
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

export default ViewResume;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    padding-top: 50px;
    margin: 0 auto;
`;
