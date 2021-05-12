import React, { Component } from 'react';

import './SizeSelect.css';

class SizeSelect extends Component {

  render() {
    const { changeSize, currSize } = this.props;

    const sizes = ['xs', 'sm', 'md', 'lg'];

    return (
      <div className="size-select">
        {
          sizes.map(size => {
            return <button key={size} className={currSize === size ? 'active-size' : null} onClick={() => changeSize(size)}>{size.toLocaleUpperCase()}</button>
          })
        }
      </div>
    );
  };
};

export default SizeSelect;
