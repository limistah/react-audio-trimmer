import React from "react";

export default function MetaInfo({
  secondsRange,
  duration,
  startTime,
  endTime
}) {
  return (
    <span className="rat-meta-seconds">
      Select <span className="rat-meta-seconds-range">{secondsRange}</span> of{" "}
      <span className="rat-meta-seconds-total">{duration}</span> (from{" "}
      <span className="rat-meta-seconds-start">{startTime}</span> to{" "}
      <span className="rat-meta-seconds-end">{endTime}</span>)
    </span>
  );
}
