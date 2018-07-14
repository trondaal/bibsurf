import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import uuid from 'uuid/v4';
import {customTitle} from '../../utils/helperFunctions';
import PropTypes from 'prop-types';


class Categorygroup extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickMororless = this.handleClickMororless.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCheckboxes = this.renderCheckboxes.bind(this);
  }

  getPlusOrMinusIcon() {
    if (this.props.categorygroup.isExpanded) {
      return <img src={require('../../images/minus-8.png')} alt={"icon"} height="8"/>
    } else {
      return <img src={require('../../images/plus-8.png')} alt={"icon"} height="8"/>
    }
  }

  handleClick() {
    this.props.handleClickExpand(this.props.categorygroup.group, this.props.categorygroup.isExpanded);
  }

  handleClickMororless() {
    this.props.handleClickMororless(this.props.categorygroup.group);
  }

  handleChange(event) {
    if (event.target.checked) {
      this.props.addCategoryCrumb(this.props.categorygroup.group, event.target.value);
    } else {
      this.props.removeCategoryCrumb(this.props.categorygroup.group, event.target.value);
    }
  }

  renderNumberText(category, total, result, showresult, unknown) {
    let text;
    let filterOption = this.props.filterOption;
    let checked = this.checkboxIsChecked(category);
    let crumbList = Object.keys(this.props.categorycrumbs);
    if (filterOption === "or" && crumbList.length > 0) {
      let moreResults = "";
      if (total - result > 0) {
        moreResults = " (" + (total - result) + "+)"
      }
      text = result + moreResults;
    } else if (filterOption === "andor" && crumbList.length > 0) {
      if (showresult || checked) {
        text = result;
      } else {
        if (!checked) {
          let moreResults = "";
          if (unknown) {
            moreResults = " (+)"
          } else if (total - result > 0) {
            moreResults = " (" + (total - result) + "+)"
          }
          text = result + moreResults;
        }
      }
    } else {
      text = total;
    }
    return (" " + text);
  }

  shortenText(categoryName, number) {
    let checkboxText;
    let index = categoryName.indexOf(',');
    let isRole = (index !== -1);
    let name = categoryName;
    if (isRole) {
      name = categoryName.substring(index + 1);
    }
    checkboxText = name + number;
    if (checkboxText > 26) {
      index = 26 - number.length;
      checkboxText = " " + name.substring(0, index) + ".." + number;
    }
    return checkboxText;
  }

  checkboxIsChecked(category) {
    let checked = false;
    let categorycrumbs = this.props.categorycrumbs;
    //check that there is filter
    if (Object.keys(categorycrumbs).length > 0 && categorycrumbs.constructor === Object) {
      let crumbcategories = categorycrumbs[this.props.categorygroup.group];
      if (crumbcategories) {
        if (crumbcategories.indexOf(category) !== -1) {
          checked = true;
        }
      }
    }
    return checked;
  }

  renderMoreorlessBtn() {
    let moreorless = "less <<";
    if (this.props.categorygroup.hideCheckboxes) {
      moreorless = "more >>";
    }
    return moreorless;
  }

  renderCheckboxes() {
    if (this.props.categorygroup.isExpanded) {
      return this.props.categorygroup.categories.map((category, i) => {
        let checkboxdiv = null
        if (i < 6 || (!this.props.categorygroup.hideCheckboxes && i > 5)) {
          let categoryName = category.category;
          let checkbox;
          //disable checkboxes in ANDOR
          if (category.disable) {
            checkbox = <input className="checkbox" type="checkbox" disabled />
          } else {
            if (this.checkboxIsChecked(categoryName)) {
              checkbox =
              <input className="checkbox" type="checkbox"
                onChange={this.handleChange} value={categoryName} checked
              />
            } else {
              checkbox =
              <input className="checkbox" type="checkbox"
                onChange={this.handleChange} value={categoryName}
              />
            }
          }
          let number = this.renderNumberText(categoryName, category.total, category.result, category.showresult, category.unknown);
          let categoryText = " " + categoryName + number
          if (categoryText.length > 26) {
            categoryText = this.shortenText(categoryName, number);
          }
          checkboxdiv =
          <div className="checkboxdiv">
            {checkbox}
            {categoryText}
          </div>
        }
        let moreorless = null;
        if (i === 5 && this.props.categorygroup.categories.length > 6) {
          moreorless =
          <div className="moreorless" onClick={this.handleClickMororless}>
            {this.renderMoreorlessBtn()}
          </div>
        }
        return (
          <div key={uuid()}>
            {checkboxdiv}
            {moreorless}
          </div>
        );
      });
    };
  }

  renderCategorygroup() {
    if (!(this.props.queryboxcrumbs.length > 0 && this.props.categorygroup.categories.length === 0)) {
      return (
        <fieldset className="categorygroup">
          <legend className="headersubsubtitle">
            {customTitle(this.props.categorygroup.group) + " "}
          </legend>
          <div className="legendbutton">
            <Button bsSize="xsmall" onClick={this.handleClick}>
              {this.getPlusOrMinusIcon()}
            </Button>
          </div>
          {this.renderCheckboxes()}
        </fieldset>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderCategorygroup()}
      </div>
    );
  }
}

Categorygroup.propTypes = {
  handleClickExpand: PropTypes.func.isRequired,
  handleClickMororless: PropTypes.func.isRequired,
  queryboxcrumbs: PropTypes.array.isRequired,
  addCategoryCrumb: PropTypes.func.isRequired,
  removeCategoryCrumb: PropTypes.func.isRequired,
  categorycrumbs: PropTypes.object.isRequired,
  categorygroup: PropTypes.object.isRequired,
}

export default Categorygroup;
