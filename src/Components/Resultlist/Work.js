import React, { Component } from 'react';
import {Well, Panel, Collapse, Button} from 'react-bootstrap';
import uuid from 'uuid/v4';
import Titles from './attributes/Titles';
import RelatedWorks from './attributes/RelatedWorks';

class Work extends Component {

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getTabContents(unit, works, firstTab) {
    let content = [];
    let activeTab = this.props.unit.activeTab;
    let open = this.props.unit.open;
    if (activeTab === "Related works") {
      content = (
        <RelatedWorks unit={unit} work={true}
          hasRelatedWorks={this.props.hasRelatedWorks}
        />
      )
    } else if (activeTab !== null || open) {
      if (activeTab === -1) {
        activeTab = firstTab;
      }
      let contentType = activeTab.substring(0, activeTab.indexOf('(') - 1).toLowerCase();
      let language = activeTab.substring(activeTab.indexOf('(') + 1, activeTab.length - 1);
      let tabWorks = works.filter(work => work.contentType === contentType && work.languageOfExpression === language);
      let titles = [];
      //get contents of merged works
      tabWorks.forEach(work => {
        let manifestationsArray = this.props.getManifestationsArray(work.manifestationOfExpression);
        let foundRole = this.props.findRole(work);
        if (foundRole !== null) {
          if (titles.indexOf(foundRole) === -1) {
            titles.push(foundRole);
            if (manifestationsArray.length > 0) {
              content.push(
                <span key={uuid()} className="names Ecolor bold">
                  <Titles unit={work} work={true} />
                </span>
              );
            }
          }
        }
        content = content.concat(manifestationsArray);
      });
    }
    return content;
  }

  getRelatedWorksBtnTab() {
    let activeBtn = "expressionTab"
    let activeTab = this.props.unit.activeTab;
    let open = this.props.unit.open;
    if (activeTab === "Related works" && open) {
      activeBtn = "expressionTab activeTab"
    }
    return (
      <Button key={uuid()} className={activeBtn} bsSize="sm"
        onClick={ () => this.props.toggleData(-1, "Related works", activeTab, open, this.props.index) }>
        Related works
      </Button>
    )
  }

  getBtnTabsArray(works) {
    let tabs = [];
    let tabNames = []
    works.forEach((work, i) => {
      let tab = this.capitalizeFirstLetter(work.contentType) + " (" + work.languageOfExpression + ")";
      let tabExists = tabNames.indexOf(tab) !== -1;
      //add new tab if it does not exist
      if (!tabExists) {
        tabNames.push(tab);
        let activeBtn = "expressionTab"
        let activeTab = this.props.unit.activeTab;
        let open = this.props.unit.open;
        if (((activeTab === -1 && i === 0) || activeTab === tab) && open) {
          activeBtn = "expressionTab activeTab"
        }
        tabs.push(
          <Button key={uuid()} className={activeBtn} bsSize="sm"
            onClick={() => this.props.toggleData(i, tab, activeTab, open, this.props.index)}>
            {tab}
          </Button>
        )
      }
    })
    return tabs;
  }

  render() {
    let unit = this.props.unit;
    let btnTabsArray;
    let tabContents;
    let display = null;
    let works = unit.expressionOfWork.slice(0).reverse();
    btnTabsArray = this.getBtnTabsArray(works);
    let hasRelatedWorks = this.props.hasRelatedWorks(this.props.unit);
    if (hasRelatedWorks) {
      btnTabsArray.push(this.getRelatedWorksBtnTab());
    }
    let firstTab;
    if (btnTabsArray.length > 0) {
      firstTab = btnTabsArray[0].props.children;
    }
    tabContents = this.getTabContents(unit, works, firstTab);

    if (btnTabsArray.length > 0) {
      let rdfUrl = "http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/rdf.xquery?id=";
      let vizualizatilUrl = "http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/visualization.xquery?id=";
      display = (
        <div className="Work WorkUnit DisplayUnit">
          <div className="WorkHeader">
            <span className="WorkDescription">
              <span className="Wcolor">
                <span className="titleOfTheWork">{unit.titleOfWork + " / "}</span>
                <Titles unit={unit} work={true} />
              </span>
              <span className="lightcolor">
                {" ["}
                <span className="formOfWork">{unit.formOfWork}</span>
                {"] "}
              </span>
            </span>
            <div className="links hideable">
              <a className="rdf link linkstyle" href={rdfUrl + unit.about}
                target="rdf">rdf</a>
              <a className="visualization link linkstyle" href={vizualizatilUrl +
                  unit.about} target="viz">graph</a>
            </div>
          </div>
          <div className="secondline">
            <div>
              <Well className="expressionWell">
                {btnTabsArray}
              </Well>
              <Collapse in={this.props.unit.open}>
                <div>
                  <Panel className="expressionPanel">
                    {tabContents}
                  </Panel>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      );
    }

    return display;
  }
}

export default Work;
