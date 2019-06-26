import "@mohayonao/web-audio-api-shim";
import React, { Component } from "react";
import "./assets/styles";
import FilePicker from "./components/FilePicker";
import { isAudio, readBlobURL, download, rename } from "./libs/utils";
import WebAudio from "./libs/webAudio";
import DecodingIndicator from "./components/DecodingIndicator";
import Player from "./components/Player";
import Icon from "./components/Icon";

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

  handleStartTimeChange = time => {
    this.setState({
      startTime: time
    });
  };

  handleEndTimeChange = time => {
    this.setState({
      endTime: time
    });
  };

  handleCurrentTimeChange = time => {
    this.setState({
      currentTime: time
    });
  };

  handlePlayPauseClick = () => {
    this.setState({
      paused: !this.state.paused
    });
  };

  handleReplayClick = () => {
    this.setState({
      currentTime: this.state.startTime
    });
  };

  get startByte() {
    return parseInt(
      (this.audioBuffer.length * this.state.start) /
        this.widthDurationRatio /
        this.duration,
      10
    );
  }

  get endByte() {
    return parseInt(
      (this.audioBuffer.length * this.state.end) /
        this.widthDurationRatio /
        this.duration,
      10
    );
  }

  handleEncode = e => {
    const type = e.currentTarget.dataset.type;
    const { startTime, endTime, audioBuffer } = this.state;
    const { length, duration } = audioBuffer;

    const audioSliced = sliceAudioBuffer(
      audioBuffer,
      ~~((length * startTime) / duration),
      ~~((length * endTime) / duration)
    );

    this.setState({
      processing: true
    });

    encode(audioSliced, type)
      .then(readBlobURL)
      .then(url => {
        download(url, rename(this.state.file.name, type));
      })
      .catch(e => console.error(e))
      .then(() => {
        this.setState({
          processing: false
        });
      });
  };

  displaySeconds(seconds) {
    return seconds.toFixed(2) + "s";
  }

  render() {
    const { state } = this;

    return (
      <div className="react-audio-trimmer">
        {this.state.audioBuffer || this.state.decoding ? (
          <React.Fragment>
            <h2>Our Awesome Audio Trimmer</h2>

            {this.state.decoding ? (
              <DecodingIndicator />
            ) : (
              <Player
                audioBuffer={this.state.audioBuffer}
                paused={this.state.paused}
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                currentTime={this.state.currentTime}
                onStartTimeChange={this.handleStartTimeChange}
                onEndTimeChange={this.handleEndTimeChange}
                onCurrentTimeChange={this.handleCurrentTimeChange}
                ref="player"
              />
            )}

            <div className="controllers">
              <FilePicker onChange={this.handleFileChange} type="control" />
              <a
                className="ctrl-item"
                title="播放/暂停"
                onClick={this.handlePlayPauseClick}
              >
                <Icon name={this.state.paused ? "play" : "pause"} />
              </a>

              <a
                className="ctrl-item"
                title="回放"
                onClick={this.handleReplayClick}
              >
                <Icon name="replay" />
              </a>

              <div className="dropdown list-wrap">
                <a className="ctrl-item">
                  <Icon name={this.state.processing ? "spin" : "download"} />
                </a>
                {!this.state.processing && (
                  <ul className="list">
                    <li>
                      <a onClick={this.handleEncode} data-type="wav">
                        Wav
                      </a>
                    </li>
                    <li>
                      <a onClick={this.handleEncode} data-type="mp3">
                        MP3
                      </a>
                    </li>
                  </ul>
                )}
              </div>

              {isFinite(this.state.endTime) && (
                <span className="seconds">
                  Select{" "}
                  <span className="seconds-range">
                    {this.displaySeconds(state.endTime - state.startTime)}
                  </span>{" "}
                  of{" "}
                  <span className="seconds-total">
                    {this.displaySeconds(state.audioBuffer.duration)}
                  </span>{" "}
                  (from{" "}
                  <span className="seconds-start">
                    {this.displaySeconds(state.startTime)}
                  </span>{" "}
                  to{" "}
                  <span className="seconds-end">
                    {this.displaySeconds(state.endTime)}
                  </span>
                  )
                </span>
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className="landing">
            <FilePicker onChange={this.handleFileChange} />
          </div>
        )}
      </div>
    );
  }
}
