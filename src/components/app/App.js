import React, { Component } from 'react';
import Row from '../row/Row.js';
import Col from '../col/Col.js';
import DisplayCode from '../displaycode/DisplayCode.js';
import SizeSelect from '../sizeselect/SizeSelect.js';
import GridTemplate from '../gridtemplate/GridTemplate.js';

import './App.css';

class App extends Component {
  state = {
    rows: [
      {
        row_number: 1,
        cols: [
          {width: {xs: 4}},
          {width: {xs: 6}},
          {width: {xs: 2}}
        ]
      },
      {
        row_number: 2,
        cols: [
          {width: {xs: 4, md: 8}},
        ]
      },
      {
        row_number: 3,
        cols: [
          {width: {xs: 4}},
          {width: {xs: 6, sm: 3}}
        ]
      },
    ],
    selected_col: {},
    selected_row: null,
    size: 'xs',
  }

  addRemoveLastRow = option => {
    if (option === 'add') {
      if (!this.state.rows.length) {
        return this.setState({
          rows: this.state.rows.concat({row_number: 1, cols: []})
        })
      }
      this.setState({
        rows: this.state.rows.concat({row_number: this.state.rows[this.state.rows.length - 1].row_number + 1, cols: []})
      })
    } else if (option === 'remove' && this.state.rows.length > 0) {
      this.setState({
        rows: this.state.rows.slice(0, this.state.rows.length - 1),
        selected_col: {}
      })
    };
  };

  addNewRow = index => {
    const firstHalf = this.state.rows.slice(0, index + 1)
    const secondHalf = this.state.rows.slice(index + 1, this.state.rows.length)
    
    const rows = [...firstHalf, {row_number: index, cols: []}, ...secondHalf]
    .map((row, i) => {
      row.row_number = i + 1
      return row
    })

    this.setState({
      rows,
      selected_row: null
    });
  }

  selectColumn = col => {
    this.setState({
      selected_col: col,
      selected_row: col.row
    });
  };

  selectRow = row => {
    this.setState({
      selected_row: row
    });
  };

  addOneColumn = (row_num, size) => {
    const rows = this.state.rows.map(row => {
      if (row.row_number === row_num) {
        row.cols.push({width: {[size]: '1'}})
        return row
      } else {
        return row
      }
    })

    this.setState({
      rows
    })
  }

  deleteSelectedRow = row_number => {
    const rows = this.state.rows.filter(row => {
      return row.row_number !== row_number
    }).map((row, i) => {
      row.row_number = i + 1
      return row
    });

    this.setState({
      rows,
      selected_row: null,
      selected_col: {}
    })
  }

  moveArrItems = (arr, old_index, new_index) => {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
    return arr;
  }

  moveRowUpDown = (option, index) => {
    if (option === 'up' && index !== 0) {
      const rows = this.moveArrItems(this.state.rows, index, index - 1)
      .map((row, i) => {
        row.row_number = i + 1
        return row
      });
      return this.setState({
        rows,
        selected_col: {},
        selected_row: null
      });
    } else if (option === 'down' && index !== this.state.rows.length -1){
      const rows = this.moveArrItems(this.state.rows, index, index + 1)
      .map((row, i) => {
        row.row_number = i + 1
        return row
      });
      return this.setState({
        rows,
        selected_col: {},
        selected_row: null
      });
    };
  };

  deleteSelectedColumn = (colId, colRow) => {
    const rows = this.state.rows.map(row => {
      if (row.row_number === colRow) {
        row.cols = row.cols.filter((col, i) => {
          return colId !== i
        })
        return row;
      } else {
        return row;
      }
    });

    this.setState({
      rows,
      selected_col: {}
    });
  };

  changeColumnWidth = (row_number, index, width, size) => {
    const rows = this.state.rows.map((row, id) => {
      if (row.row_number === row_number) {
        const newCol = row.cols.map((col, i) => {
          if (index === i) {
            col.width[size] = width
            return col
          } else {
            return col
          }
        })
        row.cols = newCol
        return row;
      } else {
        return row;
      }
    })

    this.setState({
      rows
    })
  };

  changeSize = size => {
    this.setState({
      size
    })
  };

  onDrag = (e, row, id) => {
    e.dataTransfer.setData('col', JSON.stringify({row, id}));
    e.target.classList.add('col-drag-item');
  };

  drop = (e, row, id) => {
    e.stopPropagation();

    const data = JSON.parse(e.dataTransfer.getData('col'));
    const movingCol = this.state.rows[data.row - 1].cols[data.id];
    
    // removes drag background 
    document.querySelectorAll('.col-drag-item').forEach(el => el.classList.remove('col-drag-item'));

    // console.log(data, `dropped on row: ${row}, index: ${id});

    if (data.row === row) {
      const rows = this.state.rows.map(stateRow => {
        if (stateRow.row_number === row) {
          stateRow.cols = this.moveArrItems(stateRow.cols, data.id, id);
          return stateRow;
        } else {
          return stateRow;
        }
      });

      this.setState({
        rows
      });
    } else if (id === undefined) {
      const rows = this.state.rows.map(stateRow => {
        if (stateRow.row_number === row) {
          stateRow.cols.push(movingCol);
          return stateRow;
        } else if (stateRow.row_number === data.row) {
          stateRow.cols = stateRow.cols.filter((col, i) => {
            return i !== data.id ? col : null
          });
          return stateRow;
        } else {
          return stateRow;
        } 
      });

      this.setState({
        rows
      });
    } else if (data.row !== row) {
      const rows = this.state.rows.map((stateRow, i) => {
        if (stateRow.row_number === data.row) {
          stateRow.cols = stateRow.cols.filter((col, i) => {
            return i !== data.id ? col : null
          });
          return stateRow;
        } else if (i === row - 1) {
          stateRow.cols = [...stateRow.cols.slice(0, id), movingCol, ...stateRow.cols.slice(id)];
          return stateRow;
        } else {
          return stateRow;
        }
      });

      this.setState({
        rows
      });
    }
  };

  createLayout = () => {
    const grid = []
    this.state.rows.forEach((row, i) => {
      grid.push(
        <Row 
          select_row={this.selectRow} 
          key={i} 
          index={i}
          id={i + 1}
          moveRowUpDown={this.moveRowUpDown}
          addNewRow={this.addNewRow}
          deleteSelectedRow={this.deleteSelectedRow}
          drop={this.drop}
        >

          {
            row.cols.map((col, i) => {
              return <Col
                        size={this.state.size}
                        select_column={this.selectColumn}
                        key={`${i}-${row.row_number}`}
                        id={i}
                        row={row.row_number}
                        config={col}
                        changeColumnWidth={this.changeColumnWidth}
                        deleteSelectedColumn={this.deleteSelectedColumn}
                        onDrag={this.onDrag}
                        drop={this.drop}
                      />
            })
          }

          <div 
            className="new-col"
            onClick={() => this.addOneColumn(i + 1, this.state.size)}
          ></div>

        </Row>
      )
    });

    return grid;
  };  

  render() {
    
    return (
      <div className="app">
        <h1>react-grid-generator</h1>
        <SizeSelect changeSize={this.changeSize} currSize={this.state.size}/>
        <div className={`grid ${this.state.size}-active`}>
          <GridTemplate size={this.state.size}/>
          {this.createLayout()}
          <div 
            className="row add-row"
            onClick={() => this.addRemoveLastRow('add')}
          ></div>
        </div>
        <DisplayCode output={this.state.rows} size={this.state.size}/>
      </div>
    );
  };
};

export default App;
