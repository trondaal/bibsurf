import React, { Component, PropTypes } from 'react';
import uuid from 'uuid/v4';
import {relationList} from '../../../utils/constants'

class RelatedWorks extends Component {
  getSafe(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
  }

  getRelationText(text) {
    let newText = text;
    newText = newText.replace(/([A-Z])/g, ' $1').toLowerCase();
    return newText.charAt(0).toUpperCase() + newText.slice(1) + ": ";
  }

  render() {
    let relatedworks;
    let unit = this.props.unit.workExpressed;
    if(this.props.work){
      unit = this.props.unit;
    }
    let hasRelatedWorks = this.props.hasRelatedWorks(unit);
    if (hasRelatedWorks) {
      relationList.forEach(relation => {
        if (unit[relation]) {
          let thisrelatedworks = unit[relation].map(item => {
            return (
              <li key={uuid()}>
                {this.getRelationText(relation) + item}
              </li>
            );
          })
          relatedworks =
          <div>
            {relatedworks}
            {thisrelatedworks}
          </div>;
        }
      })
    }
    return (
      <ul className="contentlisting relatedwork">
        {relatedworks}
      </ul>
    )
  }
}

RelatedWorks.propTypes = {
  unit: PropTypes.object
}

export default RelatedWorks;
