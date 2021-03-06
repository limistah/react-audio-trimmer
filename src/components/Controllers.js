import React from "react";
import Icon from "./Icon";
import FilePicker from "./FilePicker";

export default function({
  onFileChange,
  onPauseClick,
  paused,
  onReplayClick,
  processing,
  onEncode,
  showEncodeBtn
}) {
  return (
    <div className="rat-controllers">
      <FilePicker onChange={onFileChange} type="control" />
      <a className="rat-controller-item" title="Pause" onClick={onPauseClick}>
        <Icon name={paused ? "play" : "pause"} />
      </a>

      <a className="rat-controller-item" title="Replay" onClick={onReplayClick}>
        <Icon name="replay" />
      </a>
      {!showEncodeBtn && (
        <div className="rat-controller-dropdown rat-controller-list-wrap">
          <a className="rat-controller-item" onClick={onEncode} data-type="wav">
            <Icon name={processing ? "spin" : "download"} />
          </a>
          {/* {!processing && (
          <ul className="rat-controller-list">
            <li>
              <a onClick={onEncode} data-type="wav">
                Wav
              </a>
            </li>
            <li>
              <a onClick={onEncode} data-type="mp3">
                MP3
              </a>
            </li>
          </ul>
        )} */}
        </div>
      )}
    </div>
  );
}
