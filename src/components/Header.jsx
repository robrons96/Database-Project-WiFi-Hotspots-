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
      <Search size='large' style = { { float: "left", paddingTop: "20px"} } />
      </div>
    );
  }
}


export default connect()(Header);
