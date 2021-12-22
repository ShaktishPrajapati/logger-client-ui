import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Col,
  Row,
  ListGroup,
  Dropdown,
  DropdownButton,
  Spinner,
} from "react-bootstrap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getLogMsgOccurenceWRTDate } from "../../../../redux/action/ProjectAction";
import { useSelector } from "react-redux";
import SpinLoader from "../../../utils/SpinLoader";

export default function VersonGraph(props) {
  console.log(props.logMsg);
  const code = props.code;
  const [filterDate, setFilterDate] = useState({
    start: null,
    end: null,
  });

  const filterOnDate = ({ startDate = null, endDate = null, diff = 10 }) => {
    console.log(diff);
    if (diff != null) {
      var dt = new Date();
      const endd = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diff);
      setFilterDate({ start: dt.toISOString().slice(0, 10), end: endd });
    } else {
      console.log("Does not execute");
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getLogMsgOccurenceWRTDate({
        code: code,
        startDate: filterDate.start,
        endDate: filterDate.end,
        logMsg: props.logMsg,
      })
    );
  }, [filterDate]);

  const getLogMsgOccurenceWRTDateReducer = useSelector(
    (state) => state.getLogMsgOccurenceWRTDateReducer
  );
  const { loading, data } = getLogMsgOccurenceWRTDateReducer;

  return (
    <>
      <Col>
        <Row>
          <Col xl={3} className="ml-2">
            <input
              style={{
                border: "1px solid #3E8BE2",
                borderRadius: "10px",
                width: "100%",
                marginLeft: "40px"
              }}
              type="date"
              className="p-1"
              value={filterDate.start}
              onChange={(e) =>
                setFilterDate({ ...filterDate, start: e.target.value })
              }
            />
          </Col>
          <Col xl={3} className="ml-4" >
            <input
              style={{
                border: "1px solid #3E8BE2",
                borderRadius: "10px",
                width: "100%"
              }}
              type="date"
              className="p-1"
              value={filterDate.end}
              onChange={(e) =>
                setFilterDate({ ...filterDate, end: e.target.value })
              }
            />
          </Col>
          <Col xl={3} className="ml-2">
            <DropdownButton id="dropdown-basic-button" title="Duration">
              <Dropdown.Item
                //   checked={filterDate === 10 ? true : false}
                onClick={(e) => {
                  filterOnDate({ diff: 30 })
                }}
              >
                30 Days
              </Dropdown.Item>
              <Dropdown.Item
                //   checked={days === 45 ? true : false}
                onClick={(e) => {
                  filterOnDate({ diff: 45 })
                }}
              >
                45 Days
              </Dropdown.Item>
              <Dropdown.Item
                //   checked={days === 60 ? true : false}
                onClick={(e) => {
                  filterOnDate({ diff: 60 })
                }}
              >
                60 Days
              </Dropdown.Item>
              <Dropdown.Item
                //   checked={days === 90 ? true : false}
                onClick={(e) => {
                  filterOnDate({ diff: 90 })
                }}
              >
                90 Days
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          {data ? (
            data && data.response.length !== 0 ? (
              <>
                <div style={{ display: "flex" }}>
                  <LineChart
                    width={500}
                    height={200}
                    data={data && data.response}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      connectNulls
                      type="monotone"
                      dataKey="countLog"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </LineChart>
                </div>
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Data
              </div>
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SpinLoader />
            </div>
          )}
        </Row>
      </Col>


    </>
  );
}