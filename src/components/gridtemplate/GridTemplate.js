import React, { Component } from 'react';

import './GridTemplate.css';

class GridTemplate extends Component {
  render() {
    return (
      <div className="grid-template">
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
        <div className={`col-${this.props.size}-1`}></div>
      </div>
    )
  };
};

export default GridTemplate;
