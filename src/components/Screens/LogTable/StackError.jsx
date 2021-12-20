import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import VersonGraph from './StackTracecharts/Verson';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faEnvelopeOpenText, faArrowLeft, faCode, faChartPie, faHome, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import "../../../css/StackError.css"
import DeviceOne from './StackTracecharts/DeviceOne';
import { useHistory } from "react-router-dom";
import Navbarr from '../../ui/Navbarr';
import { useLocation } from "react-router-dom";
// import Navbarr from '../../ui/Navbarr';
export default function StackError() {

    const search = useLocation().search;
    // console.log("search param", search.);
    const pattern = /(at).*/gm;
    const completeStack = new URLSearchParams(search).get('allStacks');


    // let completeStackMultple = completeStack.split(":")
    let completeStackMultplenew = completeStack.match(pattern)


    // const arraytoOBj = Object.assign({}, completeStackMultple);
    // console.log("arraytoOBj", [arraytoOBj]);
    console.log("completeStackMultplenew", completeStack);

    let history = useHistory();
    const [fullStack, setFullStack] = useState(true)
    const [stackInText, setStackInText] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    const code = urlParams.get("code");
    const projectName = urlParams.get("name");


    const macAddress = urlParams.get("macAddress");
    const loggenrateddate = urlParams.get("loggenrateddate");
    const modeltype = urlParams.get("modeltype");
    const logtype = urlParams.get("logtype");
    const version = urlParams.get("version");

    console.log("logtype", logtype)

    console.log("queryString", macAddress, loggenrateddate, modeltype, logtype, version)

    const [device, setDevice] = useState({
        eventDetails: true,
        devices: false,
    })
    const [activeClass, setActiveClass] = useState({ eventDetails: true, devices: false, })


    const [displayLowerInfo, setDisplayLowerInfo] = useState(false)
    const [displayLowerInfoStackError, setDisplayLowerInfoStackError] = useState(true)

    const FullStack = () => {
        setFullStack(true)
        setStackInText(false)

    }
    const StackInText = () => {
        setStackInText(true)
        setFullStack(false)
    }


    const deviceSelectOne = () => {
        setDevice({
            eventDetails: true,
            devices: false,

        })
        setActiveClass({
            eventDetails: true,
            devices: false,

        })
    }
    const deviceSelectTwo = () => {
        setDevice({
            eventDetails: false,
            devices: true,

        })
        setActiveClass({
            eventDetails: false,
            devices: true,

        })
    }

    const backButtontotable = () => {

        history.push(`/`)
    }



    const navbardetail = {
        name: projectName,
        dashName: projectName,
        link1: {
            iconName: faCode,
            linkName: "Stack",
            link: `/`,
        },
        link2: {
            iconName: faHome,
            linkName: "Home",
            link: `/`,
        },
    };

    const ShowInnerInfo = () => {
        if (displayLowerInfo) {
            return setDisplayLowerInfo(false)
        }
        if (!displayLowerInfo) {
            return setDisplayLowerInfo(true)
        }
        return setDisplayLowerInfo(false)
    }

    const ShowInnerInfoStackError = () => {
        if (displayLowerInfoStackError) {
            return setDisplayLowerInfoStackError(false)
        }
        if (!displayLowerInfoStackError) {
            return setDisplayLowerInfoStackError(true)
        }
        return setDisplayLowerInfoStackError(false)
    }



    return (
        <>

            <Navbarr navbardetails={navbardetail} />
            <Container>
                <div style={{ marginTop: "6%", width: "84%", float: "right" }}>
                    <Row className="mt-5 d-flex justify-content-center align-center">
                        <Col xl={12} className='mb-4'><Button onClick={backButtontotable}><FontAwesomeIcon icon={faArrowLeft} /></Button></Col>
                        <Col xl={7} style={{ boxShadow: "2px 2px 10px grey", borderRadius: "20px" }} className="m-2 p-4"><VersonGraph /></Col>
                        <Col xl={4} style={{ boxShadow: "2px 2px 10px grey", borderRadius: "20px" }} className="m-2 p-4">
                            <Row>
                                <Col xl={6} onClick={deviceSelectOne} style={{ cursor: "pointer", padding: "5px", borderRadius: "10px", color: "#fff", display: "flex", justifyContent: "center" }} className={activeClass.eventDetails ? "active-stack" : "Inactive-stack"} >Event Details</Col>
                                <Col xl={6} onClick={deviceSelectTwo} style={{ cursor: "pointer", padding: "5px", borderRadius: "10px", color: "#fff", display: "flex", justifyContent: "center" }} className={activeClass.devices ? "active-stack" : "Inactive-stack"}>Event Occurrence</Col>
                            </Row>
                            <Row>
                                <Col xl={12} className="p-3" style={{ heigh: "100%" }}>
                                    {device.eventDetails ?
                                        <>
                                            <p>macAddress : <span style={{ color: "rgb(62, 139, 226)" }}>{macAddress}</span></p>
                                            <p>loggenrateddate : <span style={{ color: "rgb(62, 139, 226)" }}>{loggenrateddate}</span></p>
                                            <p>modeltype : <span style={{ color: "rgb(62, 139, 226)" }}>{modeltype}</span></p>
                                            <p>logtype :
                                                {logtype == "info" ? <span style={{ color: "rgb(62, 139, 226)" }}>{logtype}</span> : null}
                                            </p>
                                            <p>version : <span style={{ color: "rgb(62, 139, 226)" }}>{version}</span></p>
                                        </>
                                        : null}
                                    {device.devices ? <p>macAddress : <span style={{ color: "rgb(62, 139, 226)" }}>stack duplicacy</span></p> : null}

                                </Col>
                            </Row>


                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12} className="mt-4 p-4" style={{ boxShadow: "2px 2px 10px grey", borderRadius: "20px" }}>
                            <Row>
                                <Col>
                                    <Button onClick={FullStack} ><FontAwesomeIcon icon={faToggleOn} /></Button>
                                    <Button onClick={StackInText} className="ml-2" >Txt</Button>
                                </Col>
                            </Row>
                            {fullStack ?
                                <Row className="mt-4 d-flex">
                                    <div style={{ border: "1px solid #ABABAB", borderRadius: "10px", padding: "0px", color: "#707070", fontSize: ".9rem", margin: "0px", }}>
                                        <div style={{ display: "flex" }}>
                                            <p style={{ backgroundColor: "#EEEEEE", border: "1px solid #ABABAB", borderRadius: "10px", padding: "5px", color: "#707070", fontSize: "1rem", margin: "0px", width: "100%", fontWeight: "bold" }} onClick={ShowInnerInfoStackError}>Stack Errors
                                                <span style={{ float: "right", }}><FontAwesomeIcon icon={faArrowDown} /></span>
                                            </p>
                                        </div>

                                        {displayLowerInfoStackError ? <p style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "10px", color: "#707070", fontSize: ".9rem", margin: "0px", width: "100%" }} > {completeStack}</p> : null}


                                    </div>
                                </Row> : null}

                            {stackInText ? <Row className="mt-4 d-flex  align-items-center">
                                {completeStackMultplenew == null ? <Col xl={12} >
                                    <div>
                                        <div style={{ border: "1px solid #ABABAB", borderRadius: "10px", }}>
                                            <p style={{ backgroundColor: "#EEEEEE", border: "1px solid #ABABAB", borderRadius: "10px", padding: "5px", color: "#707070", fontSize: ".9rem", margin: "0px" }} onClick={ShowInnerInfo}>{completeStack}
                                                <span style={{ float: "right", }}><FontAwesomeIcon icon={faArrowDown} /></span>
                                            </p>
                                            {displayLowerInfo ? <p style={{
                                                color: "#707070", fontSize: ".9rem", padding: "5px"
                                            }}>
                                                {completeStack}
                                            </p> : null}
                                        </div>

                                    </div>


                                </Col> :
                                    completeStackMultplenew.map((itmes) => {
                                        return (
                                            <Col xl={12} className="mt-2" >
                                                <div>
                                                    <div style={{ border: "1px solid #ABABAB", borderRadius: "10px", }}>
                                                        <p style={{ backgroundColor: "#EEEEEE", border: "1px solid #ABABAB", borderRadius: "10px", padding: "5px", color: "#707070", fontSize: ".9rem", margin: "0px" }} onClick={ShowInnerInfo}>{itmes}
                                                            <span style={{ float: "right", }}><FontAwesomeIcon icon={faArrowDown} /></span>
                                                        </p>
                                                        {displayLowerInfo ? <p style={{
                                                            color: "#707070", fontSize: ".9rem", padding: "5px"
                                                        }}>
                                                            {itmes}
                                                        </p> : null}
                                                    </div>

                                                </div>
                                            </Col>

                                        )
                                    })
                                }

                            </Row> : null}
                        </Col>
                    </Row>
                </div>
            </Container >


        </>
    );
}
