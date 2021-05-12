import React, { Component } from 'react';

import './Row.css'

class Row extends Component {
  render() {
    const { index, id, moveRowUpDown, addNewRow, deleteSelectedRow, select_row, drop } = this.props;
    
    return (
      <div 
        className="row-component"
      >
        <div className="row-control">
          <div>
            <span
              title="Move row up"
              onClick={() => moveRowUpDown('up', index)} 
              className="glyphicon glyphicon-arrow-up">
            </span>
          </div>
          <div>
            <span 
              title="Move row down"
              onClick={() => moveRowUpDown('down', index)} 
              className="glyphicon glyphicon-arrow-down">
            </span>
          </div>
          <div>
            <span
              title="Add new row"
              onClick={() => addNewRow(index)}
              className="glyphicon glyphicon-plus">
            </span>
          </div>
          <div>
            <span
              title="Delete row"
              onClick={() => deleteSelectedRow(id)}
              className="glyphicon glyphicon-remove">
            </span>
          </div>
        </div>
        <div
          onClick={() => select_row(id)} 
          className="row row-content"
          droppable="true"
          onDragOver={e => e.preventDefault()}
          onDrop={e => drop(e, id)}
        >
          <p className="row-label">Row {id}</p>
          {this.props.children}
        </div>
      </div>
    );
  };
};

export default Row;
