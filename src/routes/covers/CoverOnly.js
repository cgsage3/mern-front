import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    useGetCoverQuery,
} from '../../services/covers/CoverServices';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const CoverOnly = () => {
    const parser = ReactHtmlParser;

    const { coverId } = useParams();

    const { data, isFetching } = useGetCoverQuery(coverId);
    console.log(data);

    return (
        <>
                <div id="pdf" className="pdf-cover">
                                    {isFetching ? <p>Loading...</p> :
                                    <>
                    <div className="page">
                        <div className="section row">
                            <h1 className="col"><span className="myname">Cesar Granda</span> </h1>
                            <div className="contact-info col-right">
                                <div>347 . 495 . 4107</div>
                                <div><a href="mailto:info@cgranda.com">info@cgranda.com</a></div>
                                <div><a href="http://cgranda.com">cgranda.com</a></div>
                            </div>
                        </div>
                        <div className="section row">
                            <div className="section-text col-right row address">
                                <div className="col light">
                                    <p>Phone: (347) 495-4107 I Email: info@cgranda.com I Address: 48 Liberty Avenue, New Jersey</p>
                                </div>
                            </div>

                            <h2 className="coverletter">Cover Letter</h2>

                            <div className="section-text col-right row cletter-wrapper">
                                <div className="col">

                                    <h4>Dear {data?.data?.dear},</h4>
                                    <div id="cletter">
                                        {parser(data?.data?.letter)}
                                    </div>

                                    <p>Sincerely,</p>
                                    <h4>Cesar Granda</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                                    </>
                                    }
                </div>
        </>
    );
};

export default CoverOnly;
