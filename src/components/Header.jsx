import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Map style={{width: '100%', height: '100%'}} google={this.props.google} zoom={14}>
        <Search size='large' style={{ float: "left", paddingTop: "20px", position: "absolute"}} />
        </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAQ6YdJQNioPpb3uiJ6JviM_sBJngu9Y4s'
})(Header)