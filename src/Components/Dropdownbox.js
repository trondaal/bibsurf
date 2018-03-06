import React, { Component , PropTypes } from 'react';
import {FormControl} from 'react-bootstrap'
import {dropdownboxes} from '../utils/constants';

class Dropdownbox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChangeOption(this.props.param, event.target.value);
  }

  getValue(option) {
    let value = option.toLowerCase();
    let param = this.props.param;
    if (param === 'rankingtype') {
      if (option === "Publications #") {
        value = "manifestationcount";
      } else {
        value = value.replace(/ /g,'');
      }
    } else if (param === 'subcollection') {
      if (option === "Murders") {
        value = "murder";
      } else if (option === "Search all collections") {
        value = "";
      } else {
        value = value.replace(/ /g,".");
      }
    }
    return value;
  }

  renderOptions() {
    return dropdownboxes[this.props.param].options.map((option) => {
      let value = this.getValue(option);
      return <option key={option} value={value}>{option}</option>
    })
  };

  render() {
    return (
      <div id={this.props.param}>
        <fieldset className="queryboxfieldset">
          <legend className="headersubsubtitle">{dropdownboxes[this.props.param].title}:</legend>
          <FormControl bsSize="sm" componentClass="select" value={this.props.value} onChange={this.handleChange}>
            {this.renderOptions()}
          </FormControl>
        </fieldset>
      </div>
    );
  }
}

Dropdownbox.propTypes = {
  param: PropTypes.string.isRequired,
  handleChangeOption: PropTypes.func.isRequired
}

export default Dropdownbox;
