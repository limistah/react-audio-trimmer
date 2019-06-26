import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Lib from "./index.js";

class Main extends PureComponent {
  handleAudioEncode = file => {
    console.log(file);
  };
  render() {
    return (
      <div className="page-container">
        <Lib onAudioEncode={this.handleAudioEncode} />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("main"));
module.hot.accept();
