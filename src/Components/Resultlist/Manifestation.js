import React, { Component, PropTypes } from 'react';
import Titles from './attributes/Titles';
import axios from 'axios';
import uuid from 'uuid/v4';

class Manifestation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreorlessdescriptionlink: true,
      contents: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    let moreorlessdescriptionlink = this.state.moreorlessdescriptionlink;
    moreorlessdescriptionlink = !moreorlessdescriptionlink;

    if(this.state.contents.length === 0) {
      let url = "http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/contents.xquery";
      axios.get(url, {
                params: {
                  manifestationid: this.props.unit.about
                }
              })
      .then(response => {
      let contents = response.data;
      if (!Array.isArray(contents)) {
        contents = [contents]
      };
      this.setState({moreorlessdescriptionlink, contents})
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.setState({moreorlessdescriptionlink})
    }
  }

  render() {
    let unit = this.props.unit;
    let className = "Manifestation Mcolor framed ";
    if (unit.carrierType) {
      className += unit.carrierType.replace(/ /g,'') + "icon";
    }
    let publisher = "";
    if (unit.placeOfPublication) {
      publisher += unit.placeOfPublication + ": ";
    }
    if (unit.publisher) {
      publisher += unit.publisher + ", ";
    }
    publisher += unit.dateOfPublication + ". ";
    let statementOfResponsibility = ". ";
    if (unit.statementOfResponsibility) {
      statementOfResponsibility = " / " + unit.statementOfResponsibility + ". "
    }
    let editionStatement = "";
    if (unit.editionStatement) {
      editionStatement += unit.editionStatement + " ";
    }
    if (unit.extent) {
      editionStatement += unit.extent + " ";
    }
    if (unit.dimensions) {
      editionStatement += unit.dimensions + " ";
    }
    if (unit.identifierForTheManifestation){
      let identifierelements = unit.identifierForTheManifestation.split(":");
      let idtype = identifierelements[1].toUpperCase();
      let idvalue = identifierelements[2];
      editionStatement += idtype + " " + idvalue;
    }
    let moreorless;
    if (this.state.moreorlessdescriptionlink) {
      moreorless = "show more >>"
    } else {
      moreorless = "show less <<"
    }
    let moreManifestation;
    let list = "";
    if(!this.state.moreorlessdescriptionlink) {
      if (this.state.contents[0] !== null && this.state.contents.length !== 0) {
        list = this.state.contents.map((item) => {
          let space = ""
          if (this.props.findRole(item.workExpressed) !== null && this.props.findRole(item) !== null) {
            space = "; "
          }
          return (
            <li key={uuid()} className="contentitem">
              <span className="contenttitle">{item.title} / </span>
              <Titles unit={item} />
              {space}
              <Titles unit={item} work={true} />
              <span className="contenttype">
                {" [ "}
                <span>{item.workExpressed.formOfWork}</span>
                {" - "}
                <span>{item.contentType}</span>
                {" - "}
                <span>{item.languageOfExpression}</span>
                ]
              </span>
            </li>
          )
        })
      }

      moreManifestation =
          <div className="ManifestationLine moreManifestation">
            <span>
              <div className="contentheading">Contents:</div>
                <ul className="contentlisting">
                  {list}
                </ul>
            </span>
          </div>
    } else {
      moreManifestation = ""
    }
    let links;
    if (this.props.manifestation) {
      let rdflink = "http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/rdf.xquery?id=" + unit.about;
      let visualizationlink = "http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/visualization.xquery?id=" + unit.about;
      links = (
        <div className="rightbox">
          <div className="links man">
            <a className="rdf link linkstyle" href={rdflink} target="rdf">rdf</a>
            <a className="visualization link linkstyle" href={visualizationlink} target="viz">graph</a>
          </div>
        </div>
      )
    }
    return (
      <div className="ManifestationUnit DisplayUnit">
        <div className={className}>
          <div className="ManifestationLine">
            <span className="titleProper man">
              {unit.titleProper + statementOfResponsibility}
            </span>
            <span className="man carrierandmedia">
              {(unit.mediaType) ? "[" : ""}
              <span className="mediaType">
                {unit.mediaType}
              </span>
                {(unit.mediaType) ? " - " : ""}
              <span className="carrierType">
                {unit.carrierType}
              </span>
              {(unit.mediaType) ? "]" : ""}
            </span>
          </div>
          <div className="ManifestationLine">
            <span className="publisher man">
              {publisher}
            </span>
            <span className="editionStatement man">
              {editionStatement}
            </span>
            <div className="man moreorlessdescriptionlink" onClick={this.handleClick}>
              {moreorless}
            </div>
          </div>
          {moreManifestation}
        </div>
        {links}
      </div>
    );
  }
}

Manifestation.propTypes = {
  unit: PropTypes.object.isRequired
}

export default Manifestation;
