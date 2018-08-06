import React from 'react';

import Map from '../../src/index';
import HeatMap from '../../src/components/HeatMap';

const WithHeatMap = props => {
  if (!props.loaded) return <div>Loading...</div>;

  return (
   <div>
     <img style={{marginBottom: "100px"}} src={require('./Wi-Fi-Share.png')} />
    <hr></hr>
     <img style={{ marginLeft: "40px", marginTop: "0px"}} src={require('./Borough.png')} />
   </div>
  );
};

export default WithHeatMap;
