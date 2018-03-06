import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import Categorygroup from './Results/Categorygroup';
import Resultlist from './Results/Resultlist';
import {filterOptions} from '../utils/constants'
import uuid from 'uuid/v4';

class Results extends Component {

  renderCategorygroups() {
    let categorygroups = this.props.categorygroups;
    if(categorygroups) {
      return categorygroups.map((categorygroup, i) => {
        return (
          <Categorygroup key={categorygroup.group}
            handleClickExpand={this.props.handleClickExpand}
            handleClickMororless={this.props.handleClickMororless}
            queryboxcrumbs={this.props.queryboxcrumbs}
            addCategoryCrumb={this.props.addCategoryCrumb}
            removeCategoryCrumb={this.props.removeCategoryCrumb}
            categorycrumbs={this.props.categorycrumbs}
            categorygroup={categorygroup}
            filterOption={this.props.filterOption} />
        );
      });
    }
  }

  renderClearCrumbsBtn() {
    if (Object.keys(this.props.categorycrumbs).length > 0) {
      return (
        <Button bsSize="small" onClick={() => this.props.removeAllCategoryCrumbs()}>
          <img src={require("../images/cross.png")} alt={"icon"} width="8"/>
          {"Clear all filters"}
        </Button>
      )
    } else {
      return (
        <Button bsSize="small" disabled>
          {"Clear all filters"}
        </Button>
      )
    }
  }

  renderFilterOptions() {
    return filterOptions.map(filter => {
      return (
        <div key={uuid()}>
          <div className="checkboxdiv">
            {(filter === this.props.filterOption) ?
              <input className="checkbox" type="radio" name="filterOption" checked
                onChange={() => this.props.changeFilterOption(filter)} value={filter}
              /> :
              <input className="checkbox" type="radio" name="filterOption"
                onChange={() => this.props.changeFilterOption(filter)} value={filter}
              />
            }
            {" " + filter.toUpperCase()}
          </div>
        </div>
      )
    })
  }

  renderFilterTree() {
    return (
      <div className="checkboxdiv" key={uuid()}>
        {(this.props.filterTree) ?
          <input className="checkbox" type="checkbox" checked
            onChange={this.props.changeFilterTree} value="subtree"
          /> :
          <input className="checkbox" type="checkbox"
            onChange={this.props.changeFilterTree} value="subtree"
          />
        }
        {" Filter subtree"}
      </div>
    )
  }

  renderFilterOptionsBox() {
    return (
      <fieldset className="categorygroup">
        <legend className="headersubsubtitle">
          Filter options:
        </legend>
        {this.renderFilterOptions()}
        <hr/>
        {this.renderFilterTree()}
      </fieldset>
    )
  }

  render() {
    return (
      <div id="resultcontainer" >
        <div id="left" className="box">
          {this.renderFilterOptionsBox()}
          {this.renderClearCrumbsBtn()}
          {this.renderCategorygroups()}
        </div>
        <div id="middle" className="box">
          <Resultlist displaytype={this.props.displaytype}
            results={this.props.results}
            getNextResults={this.props.getNextResults}
            url={this.props.url}
            emptyquery={this.props.emptyquery}
            toggleData={this.props.toggleData}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  categorygroups: PropTypes.array.isRequired,
  handleClickExpand: PropTypes.func.isRequired,
  handleClickMororless: PropTypes.func.isRequired,
  categorycrumbs: PropTypes.object.isRequired,
  addCategoryCrumb: PropTypes.func.isRequired,
  removeCategoryCrumb: PropTypes.func.isRequired,
  queryboxcrumbs: PropTypes.array.isRequired,
  displaytype: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  getNextResults: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  emptyquery: PropTypes.string.isRequired,
  listCategories: PropTypes.array.isRequired,
  listCategorygroups: PropTypes.array.isRequired,
  filterOption: PropTypes.string.isRequired,
  filterTree: PropTypes.bool.isRequired,
  changeFilterOption: PropTypes.func.isRequired,
  changeFilterTree: PropTypes.func.isRequired
}

export default Results;
