import React, { useEffect, useStates } from "react";
import { Button, Modal, Col, Row, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../../../css/filterModal.css";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByCode } from "../../../redux/action/ProjectAction";
import toast from "react-hot-toast";
import { data } from "jquery";

export default function FilterButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [emptyDate, setEmptyDate] = useState(false);
  const [dateFieldDisplay, setDateFieldDisplay] = useState(true);
  const [selectionOptionDisplay, setSelectionOptionDisplay] = useState(false);
  const [dataperPageDisplay, setDataperPageDisplay] = useState(false);
  const [activeClass, setActiveClass] = useState({
    dateField: true,
    selectionField: false,
    datePerPage: false,
  });
  const [date, setDate] = useState({
    start: localStorage.getItem("selected_date")
      ? JSON.parse(localStorage.getItem("selected_date")).start
      : "",
    end: localStorage.getItem("selected_date")
      ? JSON.parse(localStorage.getItem("selected_date")).end
      : "",
  });
  const [logType, setLogType] = useState({
    error: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).error
      : false,
    info: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).info
      : false,
    warn: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).warn
      : false,
    debug: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).debug
      : false,
    verbose: localStorage.getItem("selected_log")
      ? JSON.parse(localStorage.getItem("selected_log")).verbose
      : false,
  });

  const [record, setRecords] = useState(
    parseInt(localStorage.getItem("selected_records"))
      ? parseInt(localStorage.getItem("selected_records"))
      : 25
  );
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  // console.log("getAllLogByCodeReducer", getAllLogByCodeReducer);

  useEffect(() => {}, []);

  // 1) active data fields
  const dateField = () => {
    setDateFieldDisplay(true);
    setSelectionOptionDisplay(false);
    setDataperPageDisplay(false);
    setActiveClass({
      dateField: true,
      selectionField: false,
      datePerPage: false,
    });
  };
  // 2) active selection fields
  const selectionField = () => {
    setSelectionOptionDisplay(true);
    setDateFieldDisplay(false);
    setDataperPageDisplay(false);
    setActiveClass({
      dateField: false,
      selectionField: true,
      datePerPage: false,
    });
  };
  // 3) active date per page
  const datePerPage = () => {
    setDataperPageDisplay(true);
    setDateFieldDisplay(false);
    setSelectionOptionDisplay(false);
    setActiveClass({
      dateField: false,
      selectionField: false,
      datePerPage: true,
    });
  };

  const applyDataFiledForm = () => {
    if (
      logType.error ||
      logType.info ||
      logType.warn ||
      logType.debug ||
      logType.verbose
    ) {
      return dispatch(getProjectByCode(code, date, logType, pageNo, record));
    }
    if (!date.start && !date.end) {
      setEmptyDate(true);
    }
    if (date.start || data.end) {
      return dispatch(getProjectByCode(code, date, logType));
    }
    if (record && (!date.start || !data.end)) {
      return dispatch(getProjectByCode(code, null, null, null, record));
    }
    dispatch(getProjectByCode(code, date, logType));
  };

  const saveSearch = () => {
    // console.log("save searches");
    // localStorage.removeItem("name of localStorage variable you want to remove");
    localStorage.setItem("selected_log", JSON.stringify(logType));
    if (date.start.length > 0 || date.end.length > 0) {
      localStorage.setItem("selected_date", JSON.stringify(date));
    }
    if (record == 10) {
      localStorage.setItem("selected_records", JSON.stringify(record));
    }
    if (record == 25) {
      localStorage.setItem("selected_records", JSON.stringify(record));
    }
    if (record == 50) {
      localStorage.setItem("selected_records", JSON.stringify(record));
    }
    if (record == 100) {
      localStorage.setItem("selected_records", JSON.stringify(record));
    }

    // console.log(
    //   "localstorage itmes",
    //   parseInt(localStorage.getItem("selected_records"))
    // );

    toast.success(
      "Filter saved"
      // {
      // icon: '👏',
      // style: {
      //   borderRadius: '10px',
      //   background: '#333',
      //   color: '#fff',
      // }}
    );
    dispatch(getProjectByCode(code, date, logType, pageNo, record));
  };

  const resetAllfilters = () => {
    setDate({
      start: "",
      end: "",
    });
    setLogType({
      error: false,
      info: false,
      warn: false,
      debug: false,
      verbose: false,
    });
    setPageNo(0);
    localStorage.removeItem("selected_log");
    localStorage.removeItem("selected_date");
    localStorage.removeItem("selected_records");
    dispatch(getProjectByCode(code, date, null, pageNo, record));
    toast.success("all Filter Reset done");
  };

  return (
    <>
      <Button onClick={handleShow} className="ml-1">
        Filter <FontAwesomeIcon icon={faFilter} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Row>
            <Col>
              <Button className="btn btn-primary" onClick={resetAllfilters}>
                Reset Filter
              </Button>
              <Button className="btn btn-primary ml-2" onClick={saveSearch}>
                Save Filter
              </Button>
              <Button
                className="btn btn-primary ml-2"
                onClick={applyDataFiledForm}
              >
                Apply Filter
              </Button>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <ListGroup>
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  className={
                    activeClass.dateField ? "Active-opt" : "Inactive-opt"
                  }
                  onClick={dateField}
                >
                  Date
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  className={
                    activeClass.selectionField ? "Active-opt" : "Inactive-opt"
                  }
                  onClick={selectionField}
                >
                  {" "}
                  Select an option
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  className={
                    activeClass.datePerPage ? "Active-opt" : "Inactive-opt"
                  }
                  onClick={datePerPage}
                >
                  {" "}
                  Data per page
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/*Dynamic column*/}
            <Col>
              {dateFieldDisplay ? (
                <section>
                  <label style={{ color: "#3E8BE2" }} className="p-1">
                    Start date
                  </label>
                  <input
                    style={{
                      border: "1px solid #3E8BE2",
                      borderRadius: "10px",
                    }}
                    type="date"
                    className="p-1"
                    value={date.start}
                    onChange={(e) =>
                      setDate({ ...date, start: e.target.value })
                    }
                  />
                  <label style={{ color: "#3E8BE2" }} className="p-1">
                    Last date
                  </label>
                  <input
                    style={{
                      border: "1px solid #3E8BE2",
                      borderRadius: "10px",
                    }}
                    type="date"
                    className="p-1"
                    value={date.end}
                    onChange={(e) => setDate({ ...date, end: e.target.value })}
                  />
                </section>
              ) : null}

              {/* error , debug , warnings , info section  --Debug,warn,Info,Error*/}
              {selectionOptionDisplay ? (
                <section>
                  <Row>
                    <label for="Debug" style={{ color: "#3E8BE2" }}>
                      <input
                        type="checkbox"
                        id="Debug"
                        checked={logType.debug}
                        onClick={(e) => {
                          setLogType({
                            ...logType,
                            debug: !logType.debug,
                          });
                        }}
                      />
                      &nbsp; Debug
                    </label>
                  </Row>
                  <Row>
                    <label for="warn" style={{ color: "#3E8BE2" }}>
                      <input
                        type="checkbox"
                        id="warn"
                        checked={logType.warn}
                        onClick={(e) => {
                          setLogType({
                            ...logType,
                            warn: !logType.warn,
                          });
                        }}
                      />
                      &nbsp; Warn
                    </label>
                  </Row>
                  <label for="Info" style={{ color: "#3E8BE2" }}>
                    <input
                      type="checkbox"
                      id="Info"
                      onClick={(e) => {
                        setLogType({
                          ...logType,
                          info: !logType.info,
                        });
                      }}
                    />
                    &nbsp; Info
                  </label>
                  <Row>
                    <label for="Error" style={{ color: "#3E8BE2" }}>
                      <input
                        type="checkbox"
                        id="Error"
                        onClick={(e) => {
                          setLogType({
                            ...logType,
                            error: !logType.error,
                          });
                        }}
                      />
                      &nbsp; Error
                    </label>
                  </Row>
                </section>
              ) : null}

              {/*data per page*/}
              {dataperPageDisplay ? (
                <section>
                  <Row>
                    <label for="10" style={{ color: "#3E8BE2" }}>
                      <input
                        type="checkbox"
                        id="10"
                        checked={record === 10}
                        onClick={(e) => {
                          setRecords(10);
                        }}
                      />
                      &nbsp; 10
                    </label>
                  </Row>
                  <Row>
                    <label for="25" style={{ color: "#3E8BE2" }}>
                      <input
                        type="checkbox"
                        id="25"
                        checked={record === 25}
                        onClick={(e) => {
                          setRecords(25);
                        }}
                      />
                      &nbsp; 25
                    </label>
                  </Row>
                  <label for="50" style={{ color: "#3E8BE2" }}>
                    <input
                      type="checkbox"
                      id="50"
                      checked={record === 50}
                      onClick={(e) => {
                        setRecords(50);
                      }}
                    />
                    &nbsp; 50
                  </label>
                  <Row>
                    <label for="100" style={{ color: "#3E8BE2" }}>
                      <input
                        type="checkbox"
                        id="100"
                        checked={record === 100}
                        onClick={(e) => {
                          setRecords(100);
                        }}
                      />
                      &nbsp; 100
                    </label>
                  </Row>
                </section>
              ) : null}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
