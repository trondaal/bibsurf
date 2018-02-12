import React, { Component } from 'react';

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
        <div id="headercontainer">
          <div>
            <header className="headertitle">BIBSURF - Discover Bibliographic
            Entities</header>
          </div>
          <div>
            <header className="headersubtitle">by Searching for Units of
            Interest, Ranking and Filtering</header>
        </div>
      </div>
    );
  }
}

export default Header;
