import "@mohayonao/web-audio-api-shim";
import React, { Component } from "react";
import "./assets/styles";
import FilePicker from "./components/FilePicker";

export default class ReactAudioTrimmer extends Component {
  constructor(props) {
    super(props);
  }

  handleFileChange = async file => {
    console.log(file);
    // if (!isAudio(file)) {
    //   return alert('请选择合法的音频文件')
    // }

    // this.setState({
    //   file,
    //   paused: true,
    //   decoding: true,
    //   audioBuffer: null,
    // })

    // const audioBuffer = await WebAudio.decode(file)

    // window.audioBuffer = audioBuffer

    // this.setState({
    //   paused: false,
    //   decoding: false,
    //   audioBuffer,
    //   startTime: 0,
    //   currentTime: 0,
    //   endTime: audioBuffer.duration / 2,
    // })
  };

  render() {
    return (
      <div className="react-audio-trimmer">
        Our Awesome Audio Trimmer
        <FilePicker onChange={this.handleFileChange} />
      </div>
    );
  }
}
