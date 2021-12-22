import React from "react";
import "../../css/ProjectCard.css";
import { Col, Card } from "react-bootstrap";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../../css/theme.css";

const ProjectCard = (props) => {
  return (
    <>
      <Col sm={4} md={6} xl={4}>
        <Card className="addProjectDiv">
          <Card.Body
            style={{
              width: "100%",
              padding: "25px",
            }} /* className="addProjectButton" */
          >
            <Card.Title
              style={{ textAlign: "left", color: "#212529", width: "100%" }}
            >
              {props.data.name}
            </Card.Title>
            <Card.Subtitle
              style={{ textAlign: "left" }}
              className="mb-2 text-muted"
            >
              {props.data.description && props.data.description}{" "}
            </Card.Subtitle>
            <Card.Text>
              {/* Some quick example text to build on the card title and make up the bulk of
                        the card's content. */}
            </Card.Text>
            {/* <Card.Link href="#">Card Link</Card.Link> */}
            {/* <Card.Link className="leftLinkButton" href="#">{props.data.createdAt} </Card.Link> */}
            {/* <Link to={`/newlogTable?code=${props.data.code}&name=${props.data.name} `} className="rightLinkButton"> <FontAwesomeIcon style={{fontSize:'200%'}}  className='fontAwesomeIconRight' icon={faArrowCircleRight} /> </Link> */}
            <Link
              to={`/newlogTable?code=${props.data.code}&name=${props.data.name} `}
              className="rightLinkButton"
            >
              {" "}
              <FontAwesomeIcon
                style={{ fontSize: "200%" }}
                className="fontAwesomeIconRight"
                icon={faArrowCircleRight}
              />{" "}
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ProjectCard;
