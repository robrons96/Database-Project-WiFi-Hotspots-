import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react'

class Header extends React.Component {
  constructor(props) {
    super(props);
  


  }

 
  render() {
    return (
      <div>`
      <Search/>
      </div>
    );
  }
}


export default connect()(Header);
