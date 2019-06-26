import React from "react";
import Icon from "./Icon";
import FilePicker from "./FilePicker";

export default function({
  onFileChange,
  onPauseClick,
  paused,
  onReplayClick,
  processing,
  onEncode
}) {
  return (
    <div className="rat-controllers">
      <FilePicker onChange={onFileChange} type="control" />
      <a
        className="rat-controller-item"
        title="播放/暂停"
        onClick={onPauseClick}
      >
        <Icon name={paused ? "play" : "pause"} />
      </a>

      <a className="rat-controller-item" title="回放" onClick={onReplayClick}>
        <Icon name="replay" />
      </a>

      <div className="rat-controller-dropdown rat-controller-list-wrap">
        <a className="rat-controller-item">
          <Icon name={processing ? "spin" : "download"} />
        </a>
        {!processing && (
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
        )}
      </div>
    </div>
  );
}
