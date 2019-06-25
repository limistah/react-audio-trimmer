import "@mohayonao/web-audio-api-shim";
import React, { Component } from "react";
import "./assets/styles";
import FilePicker from "./components/FilePicker";
import { isAudio, readBlobURL, download, rename } from "./libs/utils";
import WebAudio from "./libs/webAudio";
import DecodingIndicator from "./components/DecodingIndicator";

export default class ReactAudioTrimmer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      decoding: false,
      audioBuffer: null,
      paused: true,
      startTime: 0,
      endTime: Infinity,
      currentTime: 0,
      processing: false
    };
  }

  handleFileChange = async file => {
    console.log(file);
    if (!isAudio(file)) {
      return alert("Unsupported File Type");
    }

    this.setState({
      file,
      paused: true,
      decoding: true,
      audioBuffer: null
    });

    const audioBuffer = await WebAudio.decode(file);

    window.audioBuffer = audioBuffer;

    this.setState({
      paused: false,
      decoding: false,
      audioBuffer,
      startTime: 0,
      currentTime: 0,
      endTime: audioBuffer.duration / 2
    });
  };

  render() {
    return (
      <div className="react-audio-trimmer">
        <h2>Our Awesome Audio Trimmer</h2>
        <DecodingIndicator />
        <FilePicker onChange={this.handleFileChange} />
      </div>
    );
  }
}
