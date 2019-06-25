import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

export default class FilePicker extends PureComponent {
  constructor() {
    super();
    this.state = {
      key: 0
    };
  }

  handleChange = () => {
    this.props.onChange(this.refs.file.files[0]);
    this.setState({
      key: this.state.key + 1
    });
  };

  render() {
    return (
      <label className="rat-file-picker">
        <div className="rat-file-picker-main">
          <Icon name="music" />
          Select An Audio File
        </div>
        <input
          type="file"
          key={this.state.key}
          ref="file"
          accept="audio/*"
          onChange={this.handleChange}
        />
      </label>
    );
  }

  static defaultProps = {
    onChange() {}
  };

  static propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.element
  };
}
