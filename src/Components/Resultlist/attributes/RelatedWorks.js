import React, { Component, PropTypes } from 'react';
import uuid from 'uuid/v4';
import {relationList} from '../../../utils/constants'
import Titles from './Titles';

class RelatedWorks extends Component {
  getSafe(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
  }

  getRelationText(text) {
    let newText = text.replace(/([A-Z])/g, ' $1').toLowerCase();
    return newText.charAt(0).toUpperCase() + newText.slice(1) + ": ";
  }


  render() {
    let related = Object.keys(this.props.unit.related).map(relation => {
        return (<div key={uuid()}>
                    <div>{this.getRelationText(relation)}</div>
                    <ul className="contentlisting relatedwork">{
                        this.props.unit.related[relation].map(work => {
                            return(
                            <li key={uuid()}>
                            <span className="WorkDescription">
                                <span className="Wcolor">
                                    <span className="titleOfTheWork">{work.titleOfWork + " / "}</span>
                                    <Titles unit={work} work={true} />
                                    <span className="lightcolor">{" ["}
                                        <span className="formOfWork">{work.formOfWork}</span>
                                        {"] "}
                                    </span>
                                </span>
                            </span>
                            </li>);
                })}
            </ul>
        </div>)
    });
    console.log(related);
    return (<div>{related}</div>);
  }
}

RelatedWorks.propTypes = {
  unit: PropTypes.object
}

export default RelatedWorks;
