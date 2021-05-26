render() {
  const { user } = this.props.auth;
  return (
    <div style={{ height: "100vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hi,</b> {user.role}.
            <p className="flow-text grey-text text-darken-1">
              You are logged in. Welcome to {" "}
              <span style={{ fontFamily: "monospace" }}>CROWN SHIPS.</span>
            </p>
          </h4>

          <div className="col s12 center-align">
          <div className="scrollbar scrollbar-primary">
      <div className="force-overflow">
             <table id='students'>
              <thead>
                <tr>{this.renderTableHeader()}</tr>
              </thead>
              <tbody>
                  {this.renderTableData()}
              </tbody>
             </table>
             </div>
           </div>
         </div>

          <p></p>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
          <span> </span>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={this.onGetAllUsersClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            refresh
          </button>
          <span> </span>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={this.oncreateClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
}
}
