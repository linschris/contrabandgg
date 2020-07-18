import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

const images = {
  ranks: {
    iron: require('./assets/ranked-emblems/Emblem_Iron.png'),
    bronze: require('./assets/ranked-emblems/Emblem_Bronze.png'),
    silver: require('./assets/ranked-emblems/Emblem_Silver.png'),
    gold: require('./assets/ranked-emblems/Emblem_Gold.png'),
    platinum: require('./assets/ranked-emblems/Emblem_Platinum.png'),
    diamond: require('./assets/ranked-emblems/Emblem_Diamond.png'),
    master: require('./assets/ranked-emblems/Emblem_Master.png'), 
    challenger: require('./assets/ranked-emblems/Emblem_Challenger.png')
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default images;