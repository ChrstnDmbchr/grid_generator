import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Resizable from 're-resizable';

import './Col.css';

class Col extends Component {
  state = {
    dragging: false
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this).style.removeProperty('height');
    ReactDOM.findDOMNode(this).style.removeProperty('width');
  }

  startResize = (e, direction, ref) => {
    this.setState({
      dragging: true
    });
  };

  reSize = (e, direction, ref, delta) => {
    this.setState({
      dragging: false
    }, () => {
      const bootstrapWidth = Number(ref.style.width.split('p')[0]) / (e.path[5].clientWidth / 12) > 10.8 ? 12 : Math.round(Number(ref.style.width.split('p')[0]) / (e.path[5].clientWidth / 12))

      this.props.changeColumnWidth(this.props.row, this.props.id, bootstrapWidth > 0 ? bootstrapWidth : 1, this.props.size);
  
      ref.style.removeProperty('height');
      ref.style.removeProperty('width');
    })
  }


  dragOver = e => {
    e.preventDefault()
  };

  render() {
    const { select_column, config, deleteSelectedColumn, row, id, onDrag, drop } = this.props;
    const { dragging } = this.state;

    let colSizes = '';
    for(let colWidth in config.width) {
      colSizes += `col-${colWidth}-${config.width[colWidth]} `
    }

    const colInfo = {
      id: this.props.id,
      row: this.props.row
    };
    
    return (
      <Resizable 
        onClick={() => select_column({...config, ...colInfo})}
        className={`${colSizes} col no-gutter ${dragging ? 'no-transition' : null}`}
        enable={{ 
          top: false, 
          right: true, 
          bottom: false, 
          left: false, 
          topRight: false, 
          bottomRight: false, 
          bottomLeft: false, 
          topLeft: false 
        }}
        bounds={'parent'}
        onResizeStop={this.reSize}
        onResizeStart={this.startResize} 
        onDragStart={e => onDrag(e, row, id)}
        onDragOver={this.dragOver}
        onDrop={e => drop(e, row, id)}
      >
        <div draggable className="col-inner">
          <div className="col-sizes">
            { colSizes }
          </div>
          <span 
            className="glyphicon glyphicon-remove"
            onClick={() => deleteSelectedColumn(id, row)}
          ></span>
        </div>
      </Resizable>
    );
  };
};

export default Col;
