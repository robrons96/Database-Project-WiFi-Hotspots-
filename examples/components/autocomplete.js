import React, { Component } from 'react';

import Map, { Marker } from '../../src/index';

import styles from './autocomplete.module.css';

import InfoWindow from '../../src/components/InfoWindow';

import SearchBar from 'material-ui-search-bar'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {List, ListItem} from 'material-ui/List';

class Contents extends Component {


  state = {
    position: null,
    points: [],
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;
    const { points, position } = this.state;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(27);
      }

      this.setState({ position: place.geometry.location });
      this.calculateRange(place.geometry.location.lat(), place.geometry.location.lng(), 0.2)

    });
  }

  calculateRange(lat, lng, distance) {

    var radius = 6371;

    // Converts from degrees to radians.
    Math.radians = function (degrees) {
      return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    Math.degrees = function (radians) {
      return radians * 180 / Math.PI;
    };

    var maxlat = lat + Math.degrees(distance / radius);
    var minlat = lat - Math.degrees(distance / radius);

    // longitude boundaries (longitude gets smaller when latitude increases)
    var maxlng = lng + Math.degrees(distance / radius / Math.cos(Math.radians(lng)));
    var minlng = lng - Math.degrees(distance / radius / Math.cos(Math.radians(lng)));

    fetch("https://data.cityofnewyork.us/resource/24t3-xqyv.json?$where=latitude > " + minlat + "AND latitude < " + maxlat + " AND longitude > "
      + minlng + "AND longitude < " + maxlng)
      .then(response => response.json())
      .then(data => this.setState({ points: data }))
  }

  render() {

    const { position, points } = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>

          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
              style={{ width: "70%" }}
            />

            <input type="submit" value="Go" style={{ height: "110%" }} />
          </form>

          <div>
            {
              points.map(point =>
                <Card>
                  <CardHeader
                    title={point.ssid}
                    subtitle={point.ntaname}
                  />
                  <CardText>
                  {point.remarks}
                  </CardText>
                </Card>
              )
            }
          </div>
        </div>
        <div className={styles.right}>
          <Map
            {...this.props}
            center={position}
            centerAroundCurrentLocation={false}
            zoom={15}
            containerStyle={{
              height: '100vh',
              position: 'relative',
              width: '100%'
            }}>
            <Marker position={position} name="Current location" icon={{ url: "https://cdn2.iconfinder.com/data/icons/basic-elements-flat/614/762_-_Location-128.png" }} onClick={this.onMarkerClick} />

            {
              points.map(point =>
                <Marker
                  name={"SSID: " + point.ssid}
                  provider={"Provider: " + point.provider}
                  remarks={"Remarks: " + point.remarks}
                  onClick={this.onMarkerClick}
                  position={{ lat: point.latitude, lng: point.longitude }}
                />
              )
            }
            <InfoWindow
              marker={this.state.activeMarker}
              onClose={this.onInfoWindowClose}
              visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <h2>{this.state.selectedPlace.provider}</h2>
                <h2>{this.state.selectedPlace.remarks}</h2>

              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

const MapWrapper = props => (
  <MuiThemeProvider>
  <Map className="map" google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
  </MuiThemeProvider>
);

export default MapWrapper;
