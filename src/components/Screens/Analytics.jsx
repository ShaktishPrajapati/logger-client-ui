import React, { useState, useEffect } from "react";
import { faDatabase, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogTypeCounts,
  getLogByDate,
  getErrorWRTOS,
  getErrorWRTVersion,
  getProjectDetails,
} from "../../redux/action/ProjectAction";
import { Col, Row, Dropdown, DropdownButton, Container } from "react-bootstrap";
import { multiSelectFilter } from "react-bootstrap-table2-filter";

// todo : 1:2 custome imports

import Navbarr from "../ui/Navbarr";
import "../../css/Analytics.css";

import SpinLoader from "../utils/SpinLoader";
import PieCharts from "../utils/PieChart";
import LineGraphs from "../utils/LineGraphs";
import DonutChart from "../utils/DonutChart";
import OsArchitectureDonut from "../utils/OsArchitectureDonut";
import ErrorWithVersion from "../utils/ErrorWithVersion";
import { getDeviceInfoReducer } from "../../redux/reducer/ProjectReducer";
import ProjectDetailCard from "../utils/ProjectDetailCard";
import { PieChartNew } from "../charts/PieChartNew";
import { OsArchitectureDonutNew } from "../charts/OsArchitectureDonutNew";
import VerboseNewChart from "../charts/VerboseNewChart";
import { VerticalBarChart } from "../charts/VerticalBarChart";
import { OsArchitectureDonutNewVerticalChart } from "../charts/OsArchitectureDonutNewVerticalChart";
import { LineGraphNew } from "../charts/LineGraph";

import LineGraphOsError from "../charts/LineGraphsOSError"

function Analytics() {
  const [date, setdate] = useState({
    start: null,
    end: null,
  });

  const filterOnDate = ({ startDate = null, endDate = null, diff = null }) => {
    console.log(diff);
    if (diff != null) {
      var dt = new Date();
      const endd = dt.toISOString().slice(0, 10);
      console.log(date);
      dt.setDate(dt.getDate() - diff);
      setdate({ start: dt.toISOString().slice(0, 10), end: endd });
      console.log(date);
    } else {
      console.log("Does not execute");
    }
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  const navbardetail = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
      link: `/newlogTable?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: faChartPie,
      linkName: "Analytics",
      link: `/analytics?code=${code}&name=${projectName}`,
    },
  };

  const dispatch = useDispatch();

  const dispatchmultiple = () => {
    dispatch(getLogTypeCounts(code));
    dispatch(getErrorWRTOS(code));
    dispatch(getProjectDetails(code));
    dispatch(getErrorWRTVersion(code));
    dispatch(getLogByDate(code, date));
  };
  useEffect(() => {
    dispatchmultiple();
  }, [date]);
  return (
    <>
      <Navbarr navbardetails={navbardetail} />

      <Container>
        <div
          style={{
            marginTop: "10%",
            width: "84%",
            float: "right",
          }}
        >


          {/* all data fields*/}
          <Row className="d-flex justify-content-center align-items-center">
            <Col xl={5}> <VerboseNewChart /></Col>
            <Col xl={5} style={{ backgroundColor: "#3E8BE2", borderRadius: "15px", padding: "20px" }}> <ProjectDetailCard /></Col>
          </Row>

          <Row className="mt-5 d-flex justify-content-center align-items-center">
            <Col xl={6}>   {/*<PieChartNew options={{ width: "200" }} /> */}  <VerticalBarChart /> </Col>
            <Col xl={6} >{/* <OsArchitectureDonutNewVerticalChart /> <OsArchitectureDonutNew />*/} <LineGraphOsError />  </Col>
          </Row>


          < Container className="mt-5" >
            <Row style={{ marginLeft: "45px" }}>
              <Col className=" d-flex justify-content-center align-items-center">
                <label
                  style={{
                    color: "#3E8BE2",
                    fontWeight: "bold",
                    float: "left",
                  }}
                >
                  Start date
                  <input
                    type="date"
                    value={date.start}
                    onChange={(e) =>
                      setdate({ ...date, start: e.target.value })
                    }
                    className="form-control"
                    style={{
                      color: "#3E8BE2",
                      fontWeight: "bold",
                      float: "left",
                    }}
                  />
                </label>
              </Col>
              <Col className=" d-flex justify-content-center align-items-center">
                <label
                  style={{
                    color: "#3E8BE2",
                    fontWeight: "bold",
                    float: "left",
                  }}
                >
                  End date
                  <input
                    type="date"
                    max={Date.now}
                    value={date.end}
                    onChange={(e) => setdate({ ...date, end: e.target.value })}
                    className="form-control"
                    style={{
                      color: "#3E8BE2",
                      fontWeight: "bold",
                      float: "left",
                    }}
                  />
                </label>
              </Col>
              <Col
                className=" d-flex justify-content-center align-items-center mt-3"
              >
                <DropdownButton
                  id="dropdown"
                  title="Select duration"
                  bg="light"

                >
                  {/* <Dropdown.Item onClick={()=>{setdate({start:Date.now, end:Date().setDate(Date.now - 3)})}}>3 Days</Dropdown.Item> */}
                  <Dropdown.Item onClick={() => filterOnDate({ diff: 5 })}>
                    5 Days
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => filterOnDate({ diff: 7 })}>
                    Week
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => filterOnDate({ diff: 30 })}>
                    Month
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
              <Col>

                <LineGraphs />
                {/*
                <LineGraphNew />
                */}

              </Col>
            </Row>
          </Container >
        </div >
      </Container >
    </>
  );
}

export default Analytics;
