import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import VersonGraph from "./StackTracecharts/Verson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOn,
  faEnvelopeOpenText,
  faArrowLeft,
  faCode,
  faChartPie,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "../../../css/StackError.css";
import DeviceOne from "./StackTracecharts/DeviceOne";
import { useHistory } from "react-router-dom";
import Navbarr from "../../ui/Navbarr";
import { useLocation } from "react-router-dom";
import { getLogMsgOccurenceWRTDate } from "../../../redux/action/ProjectAction";
// import Navbarr from '../../ui/Navbarr';
export default function StackError() {
  // const [filterDate, setFilterDate] = useState({
  //     start:"",
  //     end:""
  // });
  const search = useLocation().search;
  // console.log("search param", search.);
  const pattern = /(at).*/gm;
  const completeStack = new URLSearchParams(search).get("allStacks");

  // let completeStackMultple = completeStack.split(":")
  let completeStackMultplenew = completeStack.match(pattern);

  // const arraytoOBj = Object.assign({}, completeStackMultple);
  // console.log("arraytoOBj", [arraytoOBj]);
  console.log("completeStackMultplenew", completeStack);

  let history = useHistory();
  const [fullStack, setFullStack] = useState(true);
  const [stackInText, setStackInText] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("code");
  console.log(code);
  const projectName = urlParams.get("name");

  const macAddress = urlParams.get("macAddress");
  const loggenrateddate = urlParams.get("loggenrateddate");
  const modeltype = urlParams.get("modeltype");
  const logtype = urlParams.get("logtype");
  const version = urlParams.get("version");
  let OSArchitecture;

  console.log(
    "queryString",
    macAddress,
    loggenrateddate,
    modeltype,
    logtype,
    version
  );

  const [device, setDevice] = useState({
    eventDetails: true,
    devices: false,
  });
  const [activeClass, setActiveClass] = useState({
    eventDetails: true,
    devices: false,
  });

  const FullStack = () => {
    setFullStack(true);
    setStackInText(false);
  };
  const StackInText = () => {
    setStackInText(true);
    setFullStack(false);
  };

  const deviceSelectOne = () => {
    setDevice({
      eventDetails: true,
      devices: false,
    });
    setActiveClass({
      eventDetails: true,
      devices: false,
    });
  };
  const deviceSelectTwo = () => {
    setDevice({
      eventDetails: false,
      devices: true,
    });
    setActiveClass({
      eventDetails: false,
      devices: true,
    });
  };

  const backButtontotable = () => {
    history.push(`/`);
  };

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

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLogMsgOccurenceWRTDate({logMsg:completeStack}))
  }, []);

  return (
    <>
      <Navbarr navbardetails={navbardetail} />
      <Container>
        <div style={{ marginTop: "6%", width: "84%", float: "right" }}>
          <Row className="mt-5 d-flex justify-content-center align-center">
            <Col xl={12} className="mb-4">
              <Button onClick={backButtontotable}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </Col>
            <Col
              xl={7}
              style={{ boxShadow: "2px 2px 10px grey", borderRadius: "20px" }}
              className="m-2 p-4"
            >
              <VersonGraph logMsg={completeStack} code={code} />
            </Col>
            <Col
              xl={4}
              style={{ boxShadow: "2px 2px 10px grey", borderRadius: "20px" }}
              className="m-2 p-4"
            >
              <Row>
                <Col
                  xl={6}
                  onClick={deviceSelectOne}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "10px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className={
                    activeClass.eventDetails ? "active-stack" : "Inactive-stack"
                  }
                >
                  Event Details
                </Col>
                <Col
                  xl={6}
                  onClick={deviceSelectTwo}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "10px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className={
                    activeClass.devices ? "active-stack" : "Inactive-stack"
                  }
                >
                  Event Occurrence
                </Col>
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
                      </p>:''} 

                      {OSArchitecture ? <p>
                        OSArchitecture :{" "}
                        <span style={{ color: "rgb(62, 139, 226)" }}>
                          {OSArchitecture}
                        </span>
                      </p>:''
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
            <Col
              xl={12}
              className="mt-4 p-4"
              style={{ boxShadow: "2px 2px 10px grey", borderRadius: "20px" }}
            >
              <Row>
                <Col>
                  <Button onClick={FullStack}>
                    <FontAwesomeIcon icon={faToggleOn} />
                  </Button>
                  <Button onClick={StackInText} className="ml-2">
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                  </Button>
                </Col>
              </Row>
              {fullStack ? (
                <Row className="mt-4 d-flex">
                  <p
                    className="bg-primary"
                    style={{
                      boxShadow: "2px 2px 10px grey",
                      borderRadius: "20px",
                      padding: "10px",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    {completeStack}
                  </p>
                </Row>
              ) : null}

              {stackInText ? (
                <Row className="mt-4 d-flex  align-items-center">
                  {completeStackMultplenew == null ? (
                    <Col xl={12}>
                      <p
                        className="bg-primary"
                        style={{
                          color: "#fff",
                          boxShadow: "2px 2px 10px grey",
                          borderRadius: "20px",
                          padding: "10px",
                        }}
                      >
                        {completeStack}
                      </p>
                    </Col>
                  ) : (
                    completeStackMultplenew.map((itmes) => {
                      return (
                        <Col xl={12}>
                          <p
                            className="bg-primary"
                            style={{
                              color: "#fff",
                              boxShadow: "2px 2px 10px grey",
                              borderRadius: "20px",
                              padding: "10px",
                            }}
                          >
                            {itmes}
                          </p>
                        </Col>
                      );
                    })
                  )}
                </Row>
              ) : null}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
