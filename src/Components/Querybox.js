import React, { Component, PropTypes } from 'react';
import {Button, FormControl} from 'react-bootstrap';

class Querybox extends Component {
  constructor(props) {
    super(props);

    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickRemoveCrumb = this.handleClickRemoveCrumb.bind(this);
  }

  handleClickSubmit(event) {
    this.props.handleClickSubmit(this.queryboxinput.value);
    this.queryboxinput.value = "";
  }

  handleClickRemoveCrumb(event) {
    this.props.handleClickRemoveCrumb(event.target.value);
  }

  renderQueryboxcrumbs() {
    if(this.props.queryboxcrumbs) {
      return this.props.queryboxcrumbs.map((queryboxcrumb) => {
        return (
          <Button bsSize="xsmall" key={queryboxcrumb} style={{marginRight: '5px'}}
            value={queryboxcrumb} onClick={this.handleClickRemoveCrumb}>
            <img src={require('../images/cross.png')} alt={"icon"} width="8"/>
            {queryboxcrumb}
          </Button>
        );
      });
    };
  };

  render() {
    return (
      <div id="querybox">
        <fieldset className="queryboxfieldset">
          <legend className="headersubsubtitle">Query:</legend>
          <div id="queryboxflex">
            {this.renderQueryboxcrumbs()}
            <div id="queryboxinput">
              <FormControl
                bsSize="sm" type="text" placeholder="add query term"
                inputRef={(input) => this.queryboxinput = input }
                onKeyPress={this.props.handleEnterPressed}
               />
            </div>
            <Button bsSize="small" onClick={this.handleClickSubmit}>
              Submit
            </Button>
          </div>
        </fieldset>
      </div>
    );
  }
}

Querybox.propTypes = {
  queryboxcrumbs: PropTypes.array.isRequired,
  handleEnterPressed: PropTypes.func.isRequired,
  handleClickSubmit: PropTypes.func.isRequired,
  handleClickRemoveCrumb: PropTypes.func.isRequired
}


export default Querybox;
