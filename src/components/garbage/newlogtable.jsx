<div className="row">
<Col>
  <Row>
    <Col xl={12}>
      {" "}
      <label
        className="p-1"
        style={{
          color: "#3E8BE2",
          fontWeight: "bold",
          float: "left",
        }}
      >
        Start date{" "}
      </label>
      <input
        type="date"
        ref={startDateRef}
        value={date.start}
        onChange={(e) =>
          setDate({ ...date, start: e.target.value })
        }
        className={
          emptyDate ? "dateempty form-control" : "form-control"
        }
        style={{
          color: "#3E8BE2",
          fontWeight: "bold",
          float: "left",
        }}
      />
    </Col>
    <Col xl={12}>
      {" "}
      <label
        className="p-1"
        style={{
          color: "#3E8BE2",
          fontWeight: "bold",
          float: "left",
        }}
      >
        End date{" "}
      </label>
      <input
        type="date"
        ref={endDatRef}
        max={Date.now()}
        value={date.end}
        onChange={(e) => setDate({ ...date, end: e.target.value })}
        className={
          emptyDate ? "dateempty form-control" : "form-control"
        }
        style={{
          color: "#3E8BE2",
          fontWeight: "bold",
          float: "left",
        }}
      />
    </Col>
    <Col xl={12}>
      {/* {" "} */}
      <button
        type="button"
        onClick={filterOnDate}
        style={{
          background: "#3E8BE2",
          fontWeight: "bold",
          float: "left",
          verticalAlign: "center",
          marginTop: "8%",
        }}
        className="btn btn-primary"
      >
        Apply date
      </button>
    </Col>
  </Row>
</Col>

<div
  className="col "
  style={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Row>
    <Col lg={12}>
      <div className="pagesOption" style={{ marginTop: "33px" }}>
        <div
          className="selectBox pagesOption"
          /* style={{borderColor:'#3E8BE2', justifyContent:'center', alignItems:'center', display:'flex'}} */ onClick={
            showCheckboxes
          }
        >
          <select
            style={{
              borderColor: "#3E8BE2",
              background: "none",
              color: "#3E8BE2",
              /* marginTop:'12%', */ borderRadius: "5px",
              height: "35px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <option>Select an option</option>
          </select>
          <div className="overSelect"></div>
        </div>
        <div
          id="checkboxes"
          style={{
            borderColor: "#3E8BE2",
            background: "none",
            borderRadius: "5px",
          }}
        >
          <label
            className="p-1"
            for="debug"
            style={{ color: "#3E8BE2" }}
          >
            <input
              type="checkbox"
              style={{ color: "#3E8BE2" }}
              id="debug"
              checked={logType.debug}
              onClick={(e) => {
                setLogType({
                  ...logType,
                  debug: !logType.debug,
                });
              }}
            />
            Debug
          </label>
          <label
            className="p-1"
            for="warn"
            style={{ color: "#3E8BE2" }}
          >
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
            Warn
          </label>
          <label
            className="p-1"
            for="info"
            style={{ color: "#3E8BE2" }}
          >
            <input
              type="checkbox"
              id="info"
              checked={logType.info}
              onClick={(e) => {
                setLogType({
                  ...logType,
                  info: !logType.info,
                });
              }}
            />
            Info
          </label>
          <label
            className="p-1"
            for="error"
            style={{ color: "#3E8BE2" }}
          >
            <input
              type="checkbox"
              id="error"
              checked={logType.error}
              onClick={(e) => {
                setLogType({
                  ...logType,
                  error: !logType.error,
                });
              }}
            />
            Error
          </label>
        </div>
      </div>
    </Col>
    <Col className="mt-4">
      <button
        type="button"
        onClick={resetFilter}
        style={{
          background: "#3E8BE2",
          fontWeight: "bold",
        }}
        className="btn btn-primary"
      >
        Reset Filter
      </button>
    </Col>
    <Col className="mt-4">
      <button
        type="button"
        onClick={saveSearch}
        style={{
          background: "#3E8BE2",
          fontWeight: "bold",
        }}
        className="btn btn-primary"
      >
        Save filter
      </button>
    </Col>
  </Row>
</div>

<Col>
  <div className="col pagesOption" style={{ marginTop: "35px" }}>
    <div className="pagesOption">
      <div className="pagesOption">
        <label
          className="p-1"
          for="10"
          style={{ color: "#3E8BE2" }}
        >
          <input
            type="checkbox"
            style={{ color: "#3E8BE2" }}
            id="10"
            checked={record === 10}
            onClick={(e) => {
              setRecords(10);
            }}
          />
          10
        </label>
        <label
          className="p-1"
          for="25"
          style={{ color: "#3E8BE2" }}
        >
          <input
            type="checkbox"
            id="25"
            checked={record === 25}
            onClick={(e) => {
              setRecords(25);
            }}
          />
          25
        </label>
        <label
          className="p-1"
          for="50"
          style={{ color: "#3E8BE2" }}
        >
          <input
            type="checkbox"
            id="50"
            checked={record === 50}
            onClick={(e) => {
              setRecords(50);
            }}
          />
          50
        </label>
        <label
          className="p-1"
          for="100"
          style={{ color: "#3E8BE2" }}
        >
          <input
            type="checkbox"
            id="100"
            checked={record === 100}
            onClick={(e) => {
              setRecords(100);
            }}
          />
          100
        </label>
      </div>
    </div>
  </div>
</Col>
</div>
