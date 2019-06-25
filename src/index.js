import "@mohayonao/web-audio-api-shim";
import React, { PureComponent } from "react";

import FilePicker from "./components/FilePicker";

export default class ReactAudioTrimmer extends PureComponent {
  render() {
    return (
      <div className="react-audio-trimmer">
        Our Awesome Audio Trimmer
        <FilePicker />
      </div>
    );
  }
}
