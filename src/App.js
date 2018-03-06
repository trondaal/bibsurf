import React, { Component } from 'react';
import Header from './Components/Header';
import Results from './Components/Results';
import Querybox from './Components/Querybox';
import Dropdownbox from './Components/Dropdownbox';
import {categorygroupList, categoryList} from './utils/constants';
import {sortCategories} from './utils/helperFunctions';
import {Button, FormControl, Col} from 'react-bootstrap';
import FontAwesome from "react-fontawesome";
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSearch: true,
      params: {querytype: 'all', displaytype: 'works', rankingtype: 'default', subcollection: ''},
      categorygroups: this.createEmptyCategorygroups(categorygroupList),
      initCategorygroups: [],
      categorycrumbs: {},
      queryboxcrumbs: [],
      results: [],
      resultsNext: [],
      url: '',
      emptyquery: '',
      filterOption: 'and',
      filterTree: false,
      andorgroups: []
    };

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleEnterPressed = this.handleEnterPressed.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.addCrumb = this.addCrumb.bind(this);
    this.handleClickRemoveCrumb = this.handleClickRemoveCrumb.bind(this);
    this.addCategoryCrumb = this.addCategoryCrumb.bind(this);
    this.removeCategoryCrumb = this.removeCategoryCrumb.bind(this);
    this.handleClickExpand = this.handleClickExpand.bind(this);
    this.handleClickMororless = this.handleClickMororless.bind(this);
    this.getData = this.getData.bind(this);
    this.getNextResults = this.getNextResults.bind(this);
    this.changeFilterOption = this.changeFilterOption.bind(this);
    this.changeFilterTree = this.changeFilterTree.bind(this);
    this.removeAllCategoryCrumbs = this.removeAllCategoryCrumbs.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.click = this.click.bind(this);
  }

  handleChangeOption(param, value) {
    let params = this.state.params;
    params[param] = value;
    this.getData(params, [], {}, this.state.queryboxcrumbs, this.state.filterOption, this.state.filterTree, []);
  }

  createEmptyCategorygroups(array) {
    return array.map(categorygroup => {
      return {group: categorygroup, categories: [], isExpanded: false, hideCheckboxes: true};
    });
  }

  changeFilterOption(option) {
    this.getData(this.state.params, [], {}, this.state.queryboxcrumbs, option, this.state.filterTree, []);
  }

  changeFilterTree() {
    this.getData(this.state.params, [], {}, this.state.queryboxcrumbs, this.state.filterOption, !this.state.filterTree, []);
  }

  handleEnterPressed(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      let value = event.target.value;
      if (value) {
        this.addCrumb(value);
        event.target.value = "";
      }
    }
  }

  handleClickSubmit(crumb) {
    if (crumb) {
      this.addCrumb(crumb);
    }
  }

  //add breadcrumbs in querybox
  addCrumb(crumb) {
    let queryboxcrumbs = this.state.queryboxcrumbs;
    //if the added crumb was not in the array of crumbs, then add to array
    if (queryboxcrumbs.indexOf(crumb) === -1){
      queryboxcrumbs.push(crumb);
      this.getData(this.state.params, [], {}, queryboxcrumbs, this.state.filterOption, this.state.filterTree, []);
    }
  }

  //remove query "crumb"
  handleClickRemoveCrumb(crumb) {
    let queryboxcrumbs = this.state.queryboxcrumbs;
    queryboxcrumbs.splice(queryboxcrumbs.indexOf(crumb), 1);
    if (queryboxcrumbs.length === 0) {
      this.setState({queryboxcrumbs, categorycrumbs: {}, andorgroups: [],
        categorygroups: this.createEmptyCategorygroups(categorygroupList),
        results: [], url: '', resultsNext: '', emptyquery: 'Empty query'})
    } else {
      this.getData(this.state.params, [], {}, queryboxcrumbs, this.state.filterOption, this.state.filterTree, []);
    }
  }

  addCrumbToCategorygroup(obj, group, crumb) {
    let newObj = obj;
    if (newObj[group]) {
      if (newObj[group].indexOf(crumb) === -1) {
        newObj[group].push(crumb);
      }
    } else {
      newObj[group] = [crumb];
    }
    return newObj;
  }

  removeCrumbInCategorygroup(obj, group, crumb) {
    let newObj = obj
    newObj[group].splice(newObj[group].indexOf(crumb), 1);
    if (newObj[group].length === 0) {
      delete newObj[group];
    }
    return newObj;
  }

  addCategoryCrumb(group, crumb) {
    let andorgroups = this.state.andorgroups;
    let categorycrumbs = this.state.categorycrumbs;
    if (this.state.filterOption === "andor") {
      let groupsWithCrumbs = Object.keys(categorycrumbs).length;
      if (groupsWithCrumbs === 0) {
        //first group user clicks on, lets the user click on multiple categories
        andorgroups.push(group);
      } else if (groupsWithCrumbs === 1) {
        //if only one category is selected in first group AND the new selected category is in another group,
        //then change to the second group that the user can select multiple categories in
        if (categorycrumbs[Object.keys(categorycrumbs)[0]].length === 1 && Object.keys(categorycrumbs)[0] !== group) {
          andorgroups.splice(0);
          andorgroups.push(group);
        }
      }
    }
    categorycrumbs = this.addCrumbToCategorygroup(categorycrumbs, group, crumb);
    this.getData(this.state.params, this.state.initCategorygroups, categorycrumbs, this.state.queryboxcrumbs, this.state.filterOption, this.state.filterTree, andorgroups);
  }

  removeAllCrumbsInOtherGroups(group, categorycrumbsgroup) {
    let categorycrumbs = {};
    categorycrumbs[group] = categorycrumbsgroup;
    categorycrumbs[group].forEach(crumb => {
    })
    this.getData(this.state.params, this.state.initCategorygroups, categorycrumbs, this.state.queryboxcrumbs, this.state.filterOption, this.state.filterTree, this.state.andorgroups);
  }

  removeCategoryCrumb(group, crumb) {
    let andorgroups = this.state.andorgroups;
    //remove from categorycrumb
    let categorycrumbs = this.removeCrumbInCategorygroup(this.state.categorycrumbs, group, crumb);
    let orGroup = andorgroups.indexOf(group) !== -1;
    let removedLastCrumbInGroup = categorycrumbs[group] === undefined;
    if (removedLastCrumbInGroup || !orGroup || this.state.filterOption === "and" || this.state.filterOption === "or") {
      if (orGroup) {
        andorgroups.splice(andorgroups.indexOf(group), 1);
      }
      this.getData(this.state.params, this.state.initCategorygroups, categorycrumbs, this.state.queryboxcrumbs, this.state.filterOption, this.state.filterTree, andorgroups);
    } else {
      this.removeAllCrumbsInOtherGroups(group, categorycrumbs[group]);
    }
  }

  removeAllCategoryCrumbs() {
    this.getData(this.state.params, this.state.initCategorygroups, {}, this.state.queryboxcrumbs, this.state.filterOption, this.state.filterTree, []);
  }

  //hide/expand categorygroup
  handleClickExpand(selectedGroup, currentisExpanded) {
    let categorygroups = this.state.categorygroups;
    let foundCategorygroup = categorygroups.find(categorygroup =>
      categorygroup.group === selectedGroup
    );
    foundCategorygroup.isExpanded = !currentisExpanded;
    this.setState({ categorygroups });
  }

  //hide/expand checkboxes
  handleClickMororless(group) {
    let categorygroups = this.state.categorygroups;
    let foundCategorygroup = categorygroups.find(categorygroup =>
      categorygroup.group === group
    );
    foundCategorygroup.hideCheckboxes = !foundCategorygroup.hideCheckboxes;
    this.setState({ categorygroups });
  }

  //change the active tab in expressions and works display
  toggleData(index, open, activeTab) {
    let results = this.state.results;
    results[index].open = open;
    results[index].activeTab = activeTab;
    this.setState({results});
  }

  //helperfunctions to getData()
  querydata(newCategoryCrumbs, newFilterOption) {
    let categoriesObj = {};
    let rolesObj = {};
    Object.keys(newCategoryCrumbs).forEach(group => {
      let categories = newCategoryCrumbs[group];
      if (categoryList.indexOf(group) !== -1) {
        categoriesObj[group] = categories;
      } else {
        rolesObj[group] = categories;
      }
    })
    let filtersCategories = JSON.stringify(categoriesObj);
    let filtersRoles = JSON.stringify(rolesObj);
    let filterOption;
    if (Object.keys(newCategoryCrumbs).length === 0) {
      filterOption = "";
    } else {
      filterOption = newFilterOption;
    }
    return {
      filtersCategories, filtersRoles, filterOption
    }
  }

  orderCategorygroups(groups) {
    let newgroup = [];
    categorygroupList.forEach(categorygroup => {
      let foundgroup = groups.find(group => group.group === categorygroup);
      if (foundgroup) {
        if (newgroup.length < 2) {
          foundgroup.isExpanded = true;
        }
        newgroup.push(foundgroup);
      }
    })
    return newgroup;
  }

  getFilterBoxes(filterboxes, newInitCategoryGroups, newCategoryCrumbs, newAndorGroups) {
    let categorygroups = [];
    let categorycrumbs = {};
    Object.keys(filterboxes).forEach(categorygroupkey => {
      let categories = [];
      Object.keys(filterboxes[categorygroupkey]).forEach(categorykey => {
        categories.push({category: categorykey,
          total: filterboxes[categorygroupkey][categorykey]
        });
        //update categorycrumbs
        if (newCategoryCrumbs[categorygroupkey] && newAndorGroups.indexOf(categorygroupkey) === -1) {
          if (newCategoryCrumbs[categorygroupkey].indexOf(categorykey) !== -1)
          {
            categorycrumbs = this.addCrumbToCategorygroup(
              categorycrumbs, categorygroupkey, categorykey
            );
          }
        }
      })
      if (newAndorGroups.indexOf(categorygroupkey) !== -1) {
        let foundgroup = newInitCategoryGroups.find(group =>
          group.group === categorygroupkey
        );
        foundgroup.categories.forEach(category => {
          if (newCategoryCrumbs[categorygroupkey].indexOf(category.category) !== -1) {
            categorycrumbs = this.addCrumbToCategorygroup(
              categorycrumbs, categorygroupkey, category.category
            );
          }
        })
      }
      let isExpanded = false;
      let hideCheckboxes = true;
      let foundgroup = this.state.categorygroups.find(group => group.group === categorygroupkey);
      if (foundgroup) {
        isExpanded = foundgroup.isExpanded;
        hideCheckboxes = foundgroup.hideCheckboxes;
      }
      categorygroups.push({group: categorygroupkey,
        categories: sortCategories(categories), isExpanded, hideCheckboxes
      });
    })
    return {categorygroups, categorycrumbs}
  }

  getAndorCategorygroups(mergedCategorygroups, newInitCategoryGroups, newCategoryCrumbs) {
    let categorygroups = [];
    let groups = newInitCategoryGroups;
    //needs to iterate through the initial results to calculate new numbers behind the categories
    groups.forEach(group => {
      let categories = []
      let isExpanded = false;
      let hideCheckboxes = true;
      let foundGroup = mergedCategorygroups.find(newgroup => newgroup.group === group.group);
      if (foundGroup) {
        isExpanded = foundGroup.isExpanded;
        hideCheckboxes = foundGroup.hideCheckboxes;
      }
      group.categories.forEach(category => {
        if (foundGroup) {
          let foundCategory = foundGroup.categories.find(newcategory => newcategory.category === category.category)
          //first group user clicks on, lets the user click on multiple categories
          let canSelectMultiple = this.state.andorgroups.indexOf(group.group) !== -1;
          if (canSelectMultiple) {
            let result = 0;
            let total = category.total;
            let unknown = false;
            if (foundCategory) { //categories in result
              //when user have selected categories from multiple groups
              if (Object.keys(newCategoryCrumbs).length > 1) {
                unknown = true; //not possible to know if you can get more results
                result = foundCategory.total;
                total = category.total;
              } else {
                result = foundCategory.total;
                total = category.total;
              }
            } else if (newCategoryCrumbs[group.group].indexOf(category.category) !== -1) { //category is checked, but do not have any result
              result = 0;
              total = category.total;
            } else {
              //when user have selected categories from multiple groups
              if (Object.keys(newCategoryCrumbs).length > 1) {
                unknown = true; //not possible to know if you can get more results
                result = 0;
                total = category.total;
              }
            }
            categories.push({category: category.category, total, result, unknown});
          } else if (foundCategory) {
            categories.push({category: category.category, total: category.total, result: foundCategory.total, showresult: true});
          } else {
            categories.push({category: category.category, total: 0, result: 0, disable: true, showresult: true});
          }
        }
      })
      if (foundGroup) {
        //set the top two groups as open
        if (categorygroups.length < 2) {
          isExpanded = true;
        }
        categorygroups.push({group: group.group, categories, isExpanded, hideCheckboxes})
      }
    })
    return categorygroups;
  }
  getOrCategorygroups(mergedCategorygroups, newInitCategoryGroups) {
    let categorygroups = [];
    let groups = newInitCategoryGroups;
    groups.forEach(group => {
      let categories = []
      let isExpanded = false;
      let hideCheckboxes = true;
      let foundGroup = mergedCategorygroups.find(newgroup => newgroup.group === group.group);
      if (foundGroup) {
        isExpanded = foundGroup.isExpanded;
        hideCheckboxes = foundGroup.hideCheckboxes;
      }
      group.categories.forEach(category => {
        if (foundGroup) {
          let foundCategory = foundGroup.categories.find(newcategory => newcategory.category === category.category)
          if (foundCategory) {
            categories.push({category: category.category, total: category.total, result: foundCategory.total});
          } else {
            categories.push({category: category.category, total: category.total, result: 0});
          }
        } else {
          categories.push({category: category.category, total: category.total, result: 0});
        }
      })
      if (categorygroups.length < 2) {
        isExpanded = true;
      }
      categorygroups.push({group: group.group, categories, isExpanded, hideCheckboxes})
    })
    return categorygroups;
  }

  getResults(responseResults, newParams) {
    let results = responseResults;
    //saving the state of the active tab in expressions and works display
    if (newParams.displaytype === 'works' || newParams.displaytype === 'expressions') {
      results = results.map((result, i) => {
        let found = this.state.results.find(obj => obj.about === result.about);
        if (found === undefined) {
          if (i === 0 || i === 1) {
            result.open = true;
            result.activeTab = -1;
          } else {
            result.open = false;
            result.activeTab = null;
          }
        } else {
          result.activeTab = found.activeTab;
          result.open = found.open;
          if (i === 0 || i === 1) {
            result.open = true;
            if (found.activeTab === null) {
                result.activeTab = -1;
            }
          }
        }
        return result;
      })
    }
    return results;
  }

  //this.getData(this.state.params, this.state.initCategorygroups, this.state.categorycrumbs, this.state.queryboxcrumbs, this.state.filterOption, this.state.filterTree, this.state.andorgroups);
  getData(newParams, newInitCategoryGroups, newCategoryCrumbs, newQueryboxCrumbs, newFilterOption, newFilterTree, newAndorGroups) {
    let querydata = this.querydata(newCategoryCrumbs, newFilterOption);
    let baseUrl = "http://dif03.idi.ntnu.no:8080/exist/rest/db/bibsurfbeta/xql/search.xquery";
    let query = newQueryboxCrumbs.join(" ");
    let querytype = newParams.querytype;
    let displaytype = newParams.displaytype;
    let rankingtype = newParams.rankingtype;
    let subcollection = newParams.subcollection;
    let subtree = newFilterTree;
    let printouturl = new URL(baseUrl + "?query=" + query + "&querytype=" + querytype + "&displaytype=" + displaytype + "&subcollection=" + subcollection +
    "&rankingtype=" + rankingtype + "&categories=" + querydata.filtersCategories + "&roles=" + querydata.filtersRoles + "&filtermethod=" + querydata.filterOption +
    "&subtree=" + subtree)
    console.log(printouturl.href);
    axios.get(baseUrl, {
              params: {
                query: query,
                querytype: querytype,
                displaytype: displaytype,
                subcollection: subcollection,
                rankingtype: rankingtype,
                categories: querydata.filtersCategories,
                roles: querydata.filtersRoles,
                filtermethod: querydata.filterOption,
                subtree: subtree
              }
            })
    .then(response => {
      let data = response["data"];
      let results = data["results"];
      let url = null;
      if (data["next"] !== undefined) {
        url = data["next"];
      }
      if (results !== null) {
        //when the respond only includes one object (not an array) --> convert it to an array
        if (!Array.isArray(results)) {
          results = [results]
        };

        results = this.getResults(results, newParams);
        let andorgroups = newAndorGroups;
        let filterOption = newFilterOption;
        let categoryFilterBoxes = this.getFilterBoxes(data["categories"], newInitCategoryGroups, newCategoryCrumbs, newAndorGroups);
        let rolesFilterBoxes = this.getFilterBoxes(data["roles"], newInitCategoryGroups, newCategoryCrumbs, newAndorGroups);
        let mergedCategorygroups = categoryFilterBoxes.categorygroups.concat(rolesFilterBoxes.categorygroups);
        let categorygroups = [];
        //keep all categories if OR filtering is selected and update number behind category filters
        if (filterOption === "or" && Object.keys(newCategoryCrumbs).length > 0) {
          categorygroups = this.getOrCategorygroups(mergedCategorygroups, newInitCategoryGroups);
        } else if (filterOption === "andor" && Object.keys(newCategoryCrumbs).length > 0) {
          categorygroups = this.getAndorCategorygroups(mergedCategorygroups, newInitCategoryGroups, newCategoryCrumbs);
        } else {
          categorygroups = this.orderCategorygroups(mergedCategorygroups);
        }
        //merge the crumbs in category and role object
        let categorycrumbs = Object.assign({}, categoryFilterBoxes.categorycrumbs, rolesFilterBoxes.categorycrumbs);
        //save inital results
        let initCategorygroups = this.state.initCategorygroups;
        if (Object.keys(this.state.categorycrumbs).length === 0) {
          initCategorygroups = categorygroups;
        }
        if (url !== null) {
          axios.get(url).then(responseNext => {
            if (responseNext !== null) {
              let resultsNext = responseNext.data
              if (resultsNext !== null) {
                resultsNext = resultsNext.map(result => {
                  result.open = false;
                  result.activeTab = null;
                  return result;
                })
                this.setState({firstSearch: false, queryboxcrumb: newQueryboxCrumbs, params: newParams, filterOption: newFilterOption, filterTree: newFilterTree, results, categorygroups, initCategorygroups, categorycrumbs, url, resultsNext, andorgroups});
              }
            }
          })
        }
        this.setState({firstSearch: false, queryboxcrumb: newQueryboxCrumbs, params: newParams, filterOption: newFilterOption, filterTree: newFilterTree, results, categorygroups, initCategorygroups, categorycrumbs, url: '', resultsNext: '', andorgroups});
      } else if (this.state.queryboxcrumbs.length === 0) {
        this.setState({queryboxcrumb: newQueryboxCrumbs, params: newParams, filterOption: newFilterOption, filterTree: newFilterTree,
          results: [], categorygroups: this.createEmptyCategorygroups(categorygroupList),
          categorycrumbs: {}, url: '', resultsNext: '', emptyquery: 'Empty query', andorgroups: []
        });
      } else {
        //console.log(response.config);
        this.setState({firstSearch: false, queryboxcrumb: newQueryboxCrumbs, params: newParams, filterOption: newFilterOption, filterTree: newFilterTree,
          results: [], url: '', resultsNext: '', emptyquery: 'No results matching query: ' +
          query + ' ' + querytype + ' ' + displaytype + ' ' + rankingtype + ' ' + subcollection
        })
      }
    }).catch((error) => {
      //TODO: How to handle error?
      console.log(error);
      this.setState({firstSearch: false, emptyquery: 'Error'})
    });
  }

  getNextResults() {
    let resultsUpdate = this.state.results.concat(this.state.resultsNext);
    axios.get(this.state.url).then(responseNext => {
      if (responseNext !== null) {
        let resultsNext = responseNext["data"];
        if (resultsNext !== null) {
          resultsNext = resultsNext.map(result => {
            result.open = false;
            result.activeTab = null;
            return result;
          })
          this.setState({results: resultsUpdate, resultsNext: resultsNext})
        } else {
          this.setState({results: resultsUpdate, url: '', resultsNext: ''})
        }
      }
    })
  }

  renderDropdownboxs(){
    return Object.keys(this.state.params).map((param) => {
      return (
        <Dropdownbox key={param}
          param={param} value={this.state.params[param]}
          handleChangeOption={this.handleChangeOption} />
      );
    })
  };

  renderSearchbox() {
    return(
      <div id="searchboxelements">
        <Querybox queryboxcrumbs={this.state.queryboxcrumbs}
          handleEnterPressed={this.handleEnterPressed}
          handleClickSubmit={this.handleClickSubmit}
          handleClickRemoveCrumb={this.handleClickRemoveCrumb}
        />
        {this.renderDropdownboxs()}
      </div>
    )
  }

  results() {
    return (
      <div>
        {this.renderSearchbox()}

        <Results
          categorygroups={this.state.categorygroups}
          handleClickExpand={this.handleClickExpand}
          handleClickMororless={this.handleClickMororless}
          categorycrumbs={this.state.categorycrumbs}
          addCategoryCrumb={this.addCategoryCrumb}
          removeCategoryCrumb={this.removeCategoryCrumb}
          queryboxcrumbs={this.state.queryboxcrumbs}
          displaytype={this.state.params.displaytype}
          results={this.state.results}
          getNextResults={this.getNextResults}
          url={this.state.url}
          emptyquery={this.state.emptyquery}
          listCategories={categoryList}
          listCategorygroups={categorygroupList}
          filterOption={this.state.filterOption}
          filterTree={this.state.filterTree}
          changeFilterOption={this.changeFilterOption}
          changeFilterTree={this.changeFilterTree}
          removeAllCategoryCrumbs={this.removeAllCategoryCrumbs}
          toggleData={this.toggleData}
        />
      </div>
    )
  }

  click(event) {
    this.handleClickSubmit(this.queryboxinput.value);
    this.queryboxinput.value = "";
  }

  homePage() {
    return (
      <div id="homepage">
        <div className="homepagebackground">
          <form className="homepageform">
            <Col sm={10}>
              <FormControl
                type="text" placeholder="Search in BIBSURF"
                inputRef={(input) => this.queryboxinput = input }
                onKeyPress={this.handleEnterPressed}
               />
            </Col>
            <Col sm={2}>
              <Button onClick={this.click}>
                <FontAwesome name="search" spin />
                {" Submit"}
              </Button>
            </Col>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="maincontainer">
        <Header />
        {(this.state.firstSearch) ? this.homePage() : this.results()}
      </div>
    );
  }
}

export default App;
