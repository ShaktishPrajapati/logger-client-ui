import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Navbarr from "../../ui/Navbarr";
// import ProjectSideBar from './ProjectSideBar'
import "../../../css/NewLogTable.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDatabase,
  faFileCsv,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByCode } from "../../../redux/action/ProjectAction";
import SpinLoader from "../../utils/SpinLoader";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as IoIcons from "react-icons/io";
import * as jQuery from "jquery";
import ReactPaginate from "react-paginate";
import Dropdown from "@restart/ui/esm/Dropdown";
import { Col, Container, DropdownButton, Row, Button } from "react-bootstrap";
import { CSVExport } from "react-bootstrap-table2-toolkit";
import ReactReadMoreReadLess from "react-read-more-read-less";
import FilterButton from "./FilterButton";
import { Link, Redirect } from "react-router-dom";
import StackError from "./StackError";
// import NewTable from './NewTable';

const { SearchBar } = Search;

function errorFormatter(cell, row) {

  if (row.logType) {
    return (
      <span>
        {cell === "error" ? (
          <strong style={{ color: "red" }}>{cell.toUpperCase()}</strong>
        ) : cell === "warn" ? (
          <strong style={{ color: "violet" }}>{cell.toUpperCase()}</strong>
        ) : cell === "info" ? (
          <strong style={{ color: "blue" }}>{cell.toUpperCase()}</strong>
        ) : cell === "verbose" ? (
          <strong style={{ color: "green" }}>{cell.toUpperCase()}</strong>
        ) : (
          <strong style={{ color: "orange" }}>{cell.toUpperCase()}</strong>
        )}
      </span>
    );
  }

  return <span>$ {cell} NTD</span>;
}

const { ExportCSVButton } = CSVExport;

const defaultSorted = [
  {
    dataField: "name",
    order: "desc",
  },
];






const columns = [
  {
    headerStyle: () => {
      return {
        width: "10%",
      };

    },
    dataField: "did",
    text: "Mac address",
    sort: true,
  },

  {
    dataField: "logMsg",
    text: "Log Message",
    headerAlign: "center",

    formatter: (col, row) => {
      console.log("col id mil", row);
      return (
        <div style={{ width: "250px", height: "auto", overflow: "hidden" }}>
          <ReactReadMoreReadLess
            charLimit={40}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
          >
            {col}
          </ReactReadMoreReadLess>
          <Link to={`/stackError?name=stackError&id=${row._id}&allStacks=${row.logMsg}`}>
            <Button style={{ float: "right" }} onClick={() => {
            }}>Stack</Button>
          </Link>
        </div >
      );
    },

    // style: { backgroundColor: 'green' }
  },
  {
    dataField: "logType",
    text: "Log Type",
    formatter: errorFormatter,
    sort: true,
  },
  {
    dataField: "logGeneratedDate",
    text: "Log Generated At",
    width: "20",
    formatter: (cell) => cell.split("T")[0],
    sort: true,
  },

  // {
  //     dataField: 'logGeneratedDate',
  //     text: 'Log Generated Time',
  //   //   filter: textFilter(),
  //     formatter: cell => cell.split("T")[1],
  //     sort:true
  //   },

  {
    dataField: "device_types",
    text: "Device Code",
    formatter: (cell) => cell.split("|")[0],

    //   filter: textFilter(),
    sort: true,
  },
  {
    dataField: "device_types",
    text: "Device Type",
    formatter: (cell) => cell.split("|")[1],

    //   filter: textFilter(),
    sort: true,
  },
];
const NewLogTable = () => {
  // const [date, setDate] = useState({
  //   start: localStorage.getItem("selected_date")
  //     ? JSON.parse(localStorage.getItem("selected_date")).start
  //     : "",
  //   end: localStorage.getItem("selected_date")
  //     ? JSON.parse(localStorage.getItem("selected_date")).end
  //     : "",
  // });
  // const [logType, setLogType] = useState({
  //   error: localStorage.getItem("selected_log")
  //     ? JSON.parse(localStorage.getItem("selected_log")).error
  //     : false,
  //   info: localStorage.getItem("selected_log")
  //     ? JSON.parse(localStorage.getItem("selected_log")).info
  //     : false,
  //   warn: localStorage.getItem("selected_log")
  //     ? JSON.parse(localStorage.getItem("selected_log")).warn
  //     : false,
  //   debug: localStorage.getItem("selected_log")
  //     ? JSON.parse(localStorage.getItem("selected_log")).debug
  //     : false,
  //   verbose: localStorage.getItem("selected_log")
  //     ? JSON.parse(localStorage.getItem("selected_log")).verbose
  //     : false,
  // });
  // const [debug, setDebug] = useState("false");
  const [pageNo, setPageNo] = useState(0);
  const [record, setRecords] = useState(25);
  const [showStackView, setShowStackView] = useState(false)
  // const [emptyDate, setEmptyDate] = useState(false);

  // const startDateRef = useRef(null);
  // const endDatRef = useRef(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");
  const dispatch = useDispatch();
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data } = getAllLogByCodeReducer;

  console.log("complete data", data)

  const dt = localStorage.getItem("selected_date");
  console.log(JSON.parse(dt));

  const refreshButton = () => {
    // setDate({
    //   start: "",
    //   end: "",
    // });
    // setLogType({
    //   error: false,
    //   info: false,
    //   warn: false,
    //   debug: false,
    //   verbose: false,
    // });
    dispatch(getProjectByCode(code));
  };

  // const filterOnDate = () => {
  //   if (!date.start && !date.end) {
  //     return setEmptyDate(true);
  //   }
  //   dispatch(getProjectByCode(code, date));
  //   setEmptyDate(false);
  // };

  // const filterOnLogType = () => {
  //   console.log(logType);
  //   // dispatch(getProjectByCode(code,null,logType))
  // };

  // const resetFilter = () => {
  //   startDateRef.current.value = "";
  //   endDatRef.current.value = "";
  //   setDate({
  //     start: "",
  //     end: "",
  //   
  //   setPageNo(0);
  //   setLogType({
  //     error: false,
  //     info: false,
  //     warn: false,
  //     debug: false,
  //     verbose: false,
  //   });

  //   localStorage.removeItem("selected_log");
  //   localStorage.removeItem("selected_date");
  //   // setLogType({...logType})
  //   dispatch(getProjectByCode(code, record));
  // };
  const handlePageClick = (data) => {
    if (pageNo !== data.selected) {
      setPageNo(data.selected);
    }
    dispatch(getProjectByCode(code, null, null, pageNo, record));


  };

  // useEffect(() => {
  //     dispatch(getProjectByCode(code))
  // }, [])

  // console.log("page no" + pageNo);

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

  // const saveSearch = () => {
  //   console.log("save searches");
  //   // localStorage.removeItem("name of localStorage variable you want to remove");
  //   localStorage.setItem("selected_log", JSON.stringify(logType));
  //   if (date.start.length > 0 || date.end.length > 0) {
  //     localStorage.setItem("selected_date", JSON.stringify(date));
  //   }
  //   toast.success("Filter saved"
  //     // {
  //     // icon: '👏',
  //     // style: {
  //     //   borderRadius: '10px',
  //     //   background: '#333',
  //     //   color: '#fff',
  //     // }}
  //   )
  // };

  // useEffect(() => {
  //   if (
  //     logType.error ||
  //     logType.info ||
  //     logType.warn ||
  //     logType.debug ||
  //     logType.verbose
  //   ) {
  //     dispatch(getProjectByCode(code, null, logType, pageNo, record));
  //   } else {
  //     setPageNo(0);
  //     dispatch(getProjectByCode(code, null, null, pageNo, record));
  //   }
  // }, [logType, pageNo, record]);

  // useEffect(() => {
  //   console.log("hello second useEffect")
  //   if (
  //     logType.error ||
  //     logType.info ||
  //     logType.warn ||
  //     logType.debug ||
  //     logType.verbose
  //   ) {
  //     dispatch(getProjectByCode(code, null, logType, pageNo, record));
  //   } else {
  //     dispatch(getProjectByCode(code, null, null, pageNo, record));
  //   }
  // }, [pageNo, record]);

  // var expanded = false;

  // function showCheckboxes() {
  //   var checkboxes = document.getElementById("checkboxes");
  //   if (!expanded) {
  //     checkboxes.style.display = "block";
  //     expanded = true;
  //   } else {
  //     checkboxes.style.display = "none";
  //     expanded = false;
  //   }
  // }

  // function showPagesRecord() {
  //   var checkboxes = document.getElementById("pagesRecord");
  //   if (!expanded) {
  //     checkboxes.style.display = "block";
  //     expanded = true;
  //   } else {
  //     checkboxes.style.display = "none";
  //     expanded = false;
  //   }
  // }


  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    paginationSize: 4,
    sizePerPageList: [{
      text: '10', value: 10
    }, {
      text: '25', value: 25
    },
    {
      text: '50', value: 50
    },
    {
      text: '100', value: 100
    },]

  };


  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
  };

  return (
    <>
      <Navbarr navbardetails={navbardetail} />
      {/* <ProjectSideBar /> */}
      {/* <div style={{paddingTop:'1%'}}> */}
      <Container>
        <Toaster />
        <div style={{ marginTop: "8%", width: "84%", float: "right" }}>

          {loading ? (
            <SpinLoader />
          ) : (
            <>
              {data && data.data && data.data.logs ? (
                <ToolkitProvider
                  keyField="_id"
                  data={data.data.logs}
                  columns={columns}
                  columnToggle
                  exportCSV={{ onlyExportSelection: true, exportAll: true }}
                  // noDataIndication="No data found"
                  // pagination={ paginationFactory() }
                  search
                >
                  {(props) => (
                    <div className="logtableStyle mt-5" >
                      <Row>
                        <Col>
                          <SearchBar
                            style={{ width: "100%", display: "block" }}
                            {...props.searchProps}
                            placeholder="Enter filter..."
                          />
                        </Col>
                        <Col className="mt-1">
                          <ExportCSVButton {...props.csvProps}>
                            Export CSV <FontAwesomeIcon icon={faFileCsv} />
                          </ExportCSVButton>
                          {/*filter button*/}
                          <FilterButton />
                        </Col>

                        <Col>

                        </Col>

                        <Col>
                          <IoIcons.IoIosRefreshCircle
                            onClick={refreshButton}
                            className="refreshButton"
                          />
                        </Col>
                      </Row>

                      <p className="mt-2"></p>

                      <BootstrapTable
                        selectRow={selectRow}
                        columns={columns}
                        filter={filterFactory()}
                       
                        {...props.baseProps}
                        noDataIndication="No data found"
                        pagination={paginationFactory(options)}
                      // pagination={paginationFactory({
                      //   // custom: true,
                      //   sizePerPage:25,
                      //   totalSize: data.data.logs.length
                      // })
                      // }
                      />

                    </div>
                  )}
                </ToolkitProvider>
              ) : (
                <h2 style={{ color: "#212925", alignItems: "center" }}>
                  No Log Available
                </h2>
              )}
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={data && data.data && data.data.count / record}
                // previousLabel="< Previous"
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}

              />
            </>
          )}
        </div>

        {/*
          
             <Container>
          <NewTable />
        </Container>

          */}
      </Container>





      {/* </div> */}





    </>
  );
};

export default NewLogTable;
