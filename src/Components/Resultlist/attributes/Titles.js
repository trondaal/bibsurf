import React, { Component, PropTypes } from 'react';
import uuid from 'uuid/v4';

const listRoles =  ['actor', 'artist', 'author', 'editor', 'composer',
  'contributor', 'director', 'interviewee', 'interviewer', 'lyricist',
  'screenwriter', 'producer', 'abridger', 'adapter', 'conductor',
  'narrator', 'performer', 'translator'
];

class Titles extends Component {
  getPerson(role) {
    let unit = this.props.unit.workExpressed;
    if (this.props.work) {
      unit = this.props.unit;
    }
    let title = "";
    if (unit[role]) {
      title = unit[role].map(person => {
        return (
          <span key={uuid()} className={role + " name"}>
            {person["nameOfPerson"]}
          </span>
        )
      });
    };
    return title;
  }

  getPersons(roles) {
    return roles.map(role => {
      return this.getPerson(role);
    })
  }

  render() {
    return (
      <span className="names">
        {this.getPersons(listRoles)}
      </span>
    );
  }
}

Titles.propTypes = {
  unit: PropTypes.object.isRequired
}

export default Titles;
