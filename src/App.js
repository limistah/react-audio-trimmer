import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Lib from "./index.js";

class Main extends PureComponent {
  render() {
    return (
      <div className="page-container">
        <Lib />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("main"));
module.hot.accept();
