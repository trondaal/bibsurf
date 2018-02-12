import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Expression from '../Resultlist/Expression';
import Manifestation from '../Resultlist/Manifestation';
import Work from '../Resultlist/Work';
import uuid from 'uuid/v4';
import {relationList, roleList} from '../../utils/constants'

class Resultlist extends Component {
  constructor(props) {
    super(props);

    this.hasRelatedWorks = this.hasRelatedWorks.bind(this);
    this.getManifestationsArray = this.getManifestationsArray.bind(this);
    this.findRole = this.findRole.bind(this);
    this.toggleData = this.toggleData.bind(this);
  }

  hasRelatedWorks(unit) {
    for (var i = 0; i < relationList.length; i++) {
      let relation = unit[relationList[i]];
      if (relation) {
        return true;
      }
    }
    return false;
  }

  getManifestationsArray(manifestationOfExpression) {
    return manifestationOfExpression.map(unit => {
      return (
          <Manifestation key={uuid()} unit={unit} findRole={this.findRole} />
      )
    });
  }

  findRole(work) {
    let role = null;
    for (var i = 0; i < roleList.length; i++) {
      if (work[roleList[i]] !== undefined) {
        role = work[roleList[i]][0].nameOfPerson + " (" + roleList[i] + ")";
        break;
      }
    }
    return role;
  }

  //set active tab and when to open/close tab
  toggleData(i, tabClicked, activeTab, open, index) {
    if (tabClicked === activeTab || (activeTab === -1 && i === 0)) {
      this.props.toggleData(index, !open, tabClicked)
    } else {
      if (open === false || activeTab === -1) {
        this.props.toggleData(index, true, tabClicked)
      } else {
        this.props.toggleData(index, open, tabClicked)
      }
    }
  }

  renderResults() {
    if (this.props.results.length !== 0) {
      let resultlist;
      if (this.props.displaytype === "expressions") {
        resultlist = this.props.results.map((unit, i) => {
          return (
            <Expression key={unit.about} unit={unit}
              hasRelatedWorks={this.hasRelatedWorks}
              getManifestationsArray={this.getManifestationsArray}
              index={i}
              toggleData={this.toggleData}
            />
          )
        })
      }
      if (this.props.displaytype === "manifestations") {
        resultlist = this.props.results.map((unit) => {
          return (
            <Manifestation key={unit.about} unit={unit}
              manifestation={true}
              findRole={this.findRole}
            />
          )
        })
      }
      if (this.props.displaytype === "works") {
        resultlist = this.props.results.map((unit, i) => {
          return (
            <Work key={uuid()} unit={unit}
              hasRelatedWorks={this.hasRelatedWorks}
              getManifestationsArray={this.getManifestationsArray}
              findRole={this.findRole}
              index={i}
              toggleData={this.toggleData}
            />
          )
        })
      }
      return resultlist;
    } else {
      return <div className='noresult '>
        {(this.props.url === '') ? this.props.emptyquery : ""}
      </div>
    }
  }

  render() {
    return (
      <div id="resultlist">
        {this.renderResults()}
        {(this.props.url !== '') ?
          (<Button bsSize="sm" onClick={() => this.props.getNextResults()}>Next 25 >></Button>) : null}
      </div>
    );
  }
}

Resultlist.propTypes = {
  displaytype: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  getNextResults: PropTypes.func,
  url: PropTypes.string,
  emptyquery: PropTypes.string
}

export default Resultlist;
