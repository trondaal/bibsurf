import React, { Component } from 'react';
import {Well, Panel, Button, Collapse} from 'react-bootstrap';
import Titles from './attributes/Titles';
import RelatedWorks from './attributes/RelatedWorks';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

class Expression extends Component {
  render() {
    let unit = this.props.unit;
    let activeTab = unit.activeTab;
    let open = unit.open;
    let btnTabs = [];
    //get btnTabs
    let btnactive = "expressionTab"
    if ((activeTab === -1 || activeTab === "Editions") && open){
      btnactive = "expressionTab activeTab"
    }
    btnTabs.push(
      <Button key={uuid()} className={btnactive} bsSize="sm" onClick={ () => this.props.toggleData(0, "Editions", activeTab, open, this.props.index)}>
        Editions
      </Button>
    );
    let hasRelatedWorks = this.props.hasRelatedWorks(unit.workExpressed);
    if (hasRelatedWorks) {
      let active = "expressionTab"
      if (activeTab === "Related works" && open){
        active = "expressionTab activeTab"
      }
      btnTabs.push(
        <Button key={uuid()} className={active} bsSize="sm" onClick={ ()=> this.props.toggleData(-1, "Related works", activeTab, open, this.props.index)}>
          Related works
        </Button>
      )
    }
    let tabContents;
    if (activeTab === "Related works") {
      tabContents = (
        <RelatedWorks unit={unit}
          hasRelatedWorks={this.props.hasRelatedWorks}
        />
      );
    } else if (activeTab === "Editions" || activeTab === -1) {
      tabContents = this.props.getManifestationsArray(unit.manifestationOfExpression);
    }

    return (
      <div className="ExpressionUnit DisplayUnit Expression">
        <div className="WorkHeader">
          <span className="WorkDescription">
            <span className="Wcolor">
              <span className="title">{unit.title + " / "}</span>
              <Titles unit={unit} />
              <span className="lightcolor">
                {" ["}
                <span className="formofwork">{unit.workExpressed.formOfWork}</span>
                {" - "}
                <span className="languageofexpression">{unit.languageOfExpression}</span>
                {" - "}
                <span className="contenttype">{unit.contentType}</span>
                {"] "}
              </span>
            </span>
          </span>
          <div className="links hideable">
            <a className="rdf link linkstyle" href={"http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/rdf.xquery?id=" + unit.about} target="rdf">rdf</a>
            <a className="visualization link linkstyle" href={"http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/visualization.xquery?id=" + unit.about} target="viz">graph</a>
          </div>
        </div>
        <div className="secondline">
          <div>
            <Well className="expressionWell">
              {btnTabs}
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
}

Expression.propTypes = {
  unit: PropTypes.object.isRequired
}

export default Expression;
