import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Lib from "./index.js";

class Main extends PureComponent {
  handleAudioEncode = file => {
    console.log(file);
  };
  encodeAudio = () => {
    this.encoder.encodeAudio();
  };
  render() {
    return (
      <div className="page-container">
        <Lib
          onAudioEncode={this.handleAudioEncode}
          ref={el => (this.encoder = el)}
        />
        {/* <span onClick={this.encodeAudio}>Encode</span> */}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("main"));
module.hot.accept();
