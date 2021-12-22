import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from 'react-bootstrap';
import VersonGraph from './StackTracecharts/Verson';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faEnvelopeOpenText, faArrowLeft, faCode, faChartPie, faHome, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import DeviceOne from './StackTracecharts/DeviceOne';
import { useHistory } from "react-router-dom";
import Navbarr from '../../ui/Navbarr';
import { useLocation } from "react-router-dom";
// import Navbarr from '../../ui/Navbarr';
import Style from "../../../css/stackError.module.css"
import { getLogMsgOccurenceWRTDate } from "../../../redux/action/ProjectAction";

export default function StackError() {

  const search = useLocation().search;
  const dispatch = useDispatch();
  // console.log("search param", search.);
  const pattern = /(at).*/gm;
  const completeStack = new URLSearchParams(search).get('allStacks');
  console.log("completeStack", completeStack)

  useEffect(() => {
    dispatch(getLogMsgOccurenceWRTDate({ logMsg: completeStack }))
  }, []);

  // let completeStackMultple = completeStack.split(":")
  let completeStackMultplenew = completeStack.match(pattern)
  let completeStackMultplenewArray = completeStack.split(" at")
  console.log("completeStackMultplenewArray one", completeStackMultplenewArray)

  const completeStackMultplenewArrayNew = completeStackMultplenewArray[0];



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


  // getting the query sting value which will be included in the table stack possibly

  const qeuryStingObj = localStorage.getItem('queryAllSting');
  const qeuryStingObjParse = JSON.parse(qeuryStingObj)
  const { value1 } = qeuryStingObjParse;
  console.log("qeuryStingObj", value1)


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
  let OSArchitecture;



  // const backButtontotable = () => {

  //     history.push(`/`)
  // }



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

  const ShowInnerInfo = (index) => {

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
          <Row className="mt-5 d-flex align-center">
            {/* <Col xl={12} className='mb-4'><Button onClick={backButtontotable}><FontAwesomeIcon icon={faArrowLeft} /></Button></Col> */}
            <Col xl={7} className={`${Style.versonGraph} m-2 p-4 d-flex align-items-center`}>
              {completeStackMultplenewArrayNew ?
                <VersonGraph logMsg={completeStackMultplenewArrayNew} code={code} />
                : <VersonGraph logMsg={completeStack} code={code} />

              }
            </Col>
            <Col xl={4} className={`${Style.eventOuter} p-4`}>
              <Row>
                <Col xl={5} onClick={deviceSelectOne} style={{ cursor: "pointer", padding: "5px", borderRadius: "8px", color: "#fff", display: "flex", justifyContent: "center" }} className={activeClass.eventDetails ? `${Style.activeStack}` : `${Style.InactiveStack}`} >Event Details</Col>
                <Col xl={5} onClick={deviceSelectTwo} style={{ cursor: "pointer", padding: "5px", borderRadius: "8px", color: "#fff", display: "flex", justifyContent: "center" }} className={activeClass.devices ? `${Style.activeStack}` : `${Style.InactiveStack}`}>Event Occurrence</Col>
              </Row>
              <Row>
                <Col xl={12} className="p-3" style={{ heigh: "100%" }}>
                  {device.eventDetails ? (
                    <>
                      <p>
                        MAC Address :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          {macAddress}
                        </span>
                      </p>
                      <p>
                        Log Genrated Date :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          {loggenrateddate.split("T")[0]}
                        </span>
                      </p>
                      <p>
                        Model Type :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          {modeltype.split("|")[1]}
                        </span>
                      </p>
                      <p>
                        Model Code :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          {modeltype.split("|")[0]}
                        </span>
                      </p>
                      <p>
                        Log Type :{" "}
                        <span
                          style={
                            logtype === "info"
                              ? { color: "blue" }
                              : logtype === "debug"
                                ? { color: "orange" }
                                : logtype === "warn"
                                  ? { color: "rgb(62, 139, 226)" }
                                  : logtype === "verbose"
                                    ? { color: "green" }
                                    : { color: "red" }
                          }
                        >
                          {logtype.charAt(0).toUpperCase() + logtype.slice(1)}
                        </span>
                      </p>
                      {
                        version ?
                          <p >
                            Version :{" "}
                            <span style={{ color: "rgb(62, 139, 226)" }}>
                              {version}
                            </span>
                          </p> : ''}

                      {OSArchitecture ? <p>
                        OSArchitecture :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          {OSArchitecture}
                        </span>
                      </p> : ''
                      }
                    </>
                  ) : null}
                  {device.devices ? <DeviceOne /> : null}
                  {device.os ? (
                    <>
                      <p>
                        macAddress :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          stack duplicacy
                        </span>
                      </p>
                    </>
                  ) : null}
                </Col>
              </Row>


            </Col>
          </Row>

          <Row>
            <Col xl={12} className={`${Style.dataSection} mt-4 p-4`} >
              <Row>
                <Col>
                  <Button onClick={FullStack} >Txt</Button>
                  <Button onClick={StackInText} className="ml-2" ><FontAwesomeIcon icon={faToggleOn} /></Button>
                </Col>
              </Row>
              {fullStack ?
                <Row className="mt-4 d-flex">
                  <div className={Style.innerdiv}>
                    <div style={{ display: "flex" }}>
                      <p onClick={ShowInnerInfoStackError}>Stack Errors
                        <span style={{ float: "right", }}><FontAwesomeIcon icon={faArrowDown} /></span>
                      </p>
                    </div>

                    {displayLowerInfoStackError ? <p style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "10px", color: "#707070", fontSize: ".9rem", margin: "0px", width: "100%" }} > {completeStack}</p> : null}


                  </div>
                </Row> : null}

              {stackInText ? <Row className="mt-4 d-flex  align-items-center">
                {completeStackMultplenew === null ?
                  <Col xl={12} >
                    <div>
                      <div className={`${Style.NoStackErrorDiv}`} >
                        <p onClick={ShowInnerInfo}>{completeStack}
                          <span style={{ float: "right", }}><FontAwesomeIcon icon={faArrowDown} /></span>
                        </p>
                        {displayLowerInfo ? <p style={{
                          color: "#707070", fontSize: ".9rem", padding: "5px", backgroundColor: "#fff"
                        }}>
                          {completeStack}
                        </p> : null}
                      </div>

                    </div>


                  </Col> :
                  completeStackMultplenewArray.map((itmes, index) => {
                    return (
                      <Col xl={12} className="mt-2" >
                        <div>
                          <div className={`${Style.stackErrorDiv}`} >
                            {console.log("itmes", index)}
                            <p onClick={() => ShowInnerInfo(index)}>
                              {index == 0 ? <span style={{ fontWeight: "bold" }}></span> : <span style={{ fontWeight: "bold" }}>at </span>}
                              {itmes}
                              <span style={{ float: "right", }}>
                                <FontAwesomeIcon icon={faArrowDown} />
                              </span>
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