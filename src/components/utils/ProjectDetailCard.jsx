import React from 'react'
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ProjectDetailCard = () => {
  const getDeviceInfoReducer = useSelector((state) => state.getDeviceInfoReducer);
  const { data } = getDeviceInfoReducer;
  if (data != null) {
    let dt = data.projectCreationDate.split("T")[0]
    let year = dt.split("-")[0]
    let month = dt.split("-")[1]
    let day = dt.split("-")[2]
    var newDate = `${day}-${month}-${year}`
  }
  return (
    <>
      {
        data ? <>

          <Row className="mt-2"  >
            <Col>
              <p style={{ color: "#fff" }}>Status :</p>
            </Col>
            <Col>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p
                  className="Active"
                  style={{
                    color: "#fff",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  {data.currentStatus ? "Active" : "Not Active"}

                </p>
                <div className={data.currentStatus ? "Active-badge" : "InActive-badge"} ></div>
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <p style={{ color: "#fff" }}>Project creation date :</p>
            </Col>
            <Col>
              <span
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                {/* Monday, 13 December 2021 */}
                {newDate}
              </span>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <p style={{ color: "#fff" }}>Total devices connected :</p>
            </Col>
            <Col>
              <span
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                {data.deviceCount}
              </span>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <p style={{ color: "#fff" }}>Number of models :</p>
            </Col>
            <Col>
              <span
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                {data.modelList.length}
              </span>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <p style={{ color: "#fff" }}>
                <p style={{ color: "#fff" }}>Models :</p>
              </p>
            </Col>
            <Col>
              {data.modelList.map((dt, idx) => <span
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                {idx === 0 ? dt.typeName : `, ${dt.typeName}`}
              </span>)}
              {/* <span
                    style={{
                      color: "#fff",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                    }}
                  >
                    , Agva Advanced
                  </span> */}
            </Col>
          </Row>  </> : <div style={{ color: '#fff', height: '100%', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "600", }}>Loading...</div>
      }
    </>
  )
}

export default ProjectDetailCard
