import "@mohayonao/web-audio-api-shim";
import React, { Component } from "react";
import "./assets/styles";
import FilePicker from "./components/FilePicker";
import { isAudio, readBlobURL, download, rename } from "./libs/utils";
import { sliceAudioBuffer } from "./libs/audioHelper";
import WebAudio from "./libs/webAudio";
import DecodingIndicator from "./components/DecodingIndicator";
import Player from "./components/Player";
import Icon from "./components/Icon";
import MetaSecondsInfo from "./components/MetaSecondsInfo";
import Controllers from "./components/Controllers";
import PropTypes from "prop-types";
import { encode } from "./libs/workerClient";

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

  static propTypes = {
    timeLimit: PropTypes.number,
    timeRange: PropTypes.number
  };

  static defaultProps = {
    timeLimit: 0,
    timeRange: 0
  };

  defaultProps;

  handleFileChange = async file => {
    if (!isAudio(file)) {
      return alert("Unsupported File Type");
    }

    this.setState({
      file,
      paused: true,
      decoding: true,
      audioBuffer: null,
      startTime: 0,
      currentTime: 0
    });

    setTimeout(async () => {
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
    }, 300);
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
    const type = e && e.currentTarget ? e.currentTarget.dataset.type : "wav";
    // const type = "wav"
    this.encodeAudio(type);
  };

  encodeAudio = (type = "wav") => {
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
      .then(file => {
        file.name = this.state.file.name;
        file.lastModified = this.state.file.lastModified;
        file.lastModifiedDate = this.state.file.lastModifiedDate;
        return { file, blobURL: readBlobURL(file) };
      })
      .then(({ blobURL, file }) => {
        const onAudioEncode = this.props.onAudioEncode;
        if (!onAudioEncode && this.props.download) {
          download(blobURL, rename(this.state.file.name, type));
        } else if (onAudioEncode && typeof onAudioEncode === "function") {
          onAudioEncode(file);
        } else {
          console.log("Audio Encoded", blobURL);
        }
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
                timeRange={this.props.timeRange}
                timeLimit={this.props.timeLimit}
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

            <Controllers
              onFileChange={this.handleFileChange}
              onPauseClick={this.handlePlayPauseClick}
              paused={state.paused}
              onReplayClick={this.handleReplayClick}
              processing={state.processing}
              onEncode={this.handleEncode}
              showEncodeBtn={this.props.showEncodeBtn}
            />

            {state.audioBuffer && isFinite(this.state.endTime) && (
              <MetaSecondsInfo
                secondsRange={this.displaySeconds(
                  state.endTime - state.startTime
                )}
                duration={this.displaySeconds(state.audioBuffer.duration)}
                startTime={this.displaySeconds(state.startTime)}
                endTime={this.displaySeconds(state.endTime)}
              />
            )}
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
