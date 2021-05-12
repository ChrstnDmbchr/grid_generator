import React, { Component } from 'react';
import Prism from "prismjs";
import beautify from "js-beautify";

import './DisplayCode.css';

class DisplayCode extends Component {
  state = {
    html: '',
  };

  generateHTML = (layout, size) => {
    return layout.map(row => {
      const cols = row.cols.map(col => {
        
        let colSizes = '';
        for(let colWidth in col.width) {
          colSizes += `col-${colWidth}-${col.width[colWidth]} `
        }

        return `<div class='${colSizes}'>

                </div>`
      });
      return `<div class='row'>
                ${cols.join('')}
              </div>`
    }).join('').replace(',', '');
  };

  setHTML = html => {
    this.setState({
      html: beautify.html_beautify(html)
    });
  };

  componentDidMount () {
    Prism.highlightAll();
    this.setHTML(this.generateHTML(this.props.output, this.props.size))
  };

  componentDidUpdate (prevProps) {
    if (prevProps.output !== this.props.output) {
      this.setHTML(this.generateHTML(this.props.output, this.props.size))
    }
  };

  render() {
    const { html } = this.state;

    return (
      <div className="display-code">
        { !html.length ? null :
        <pre>
          <code className="language-html">
            {html}
          </code>
        </pre>
        }

      </div>
    );
  };
};

export default DisplayCode;
