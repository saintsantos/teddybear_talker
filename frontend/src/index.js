import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App.js';
import { useStrict } from 'mobx';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/antd/dist/antd.min.css';
import 'semantic-ui-css/semantic.min.css';

useStrict(true);

ReactDOM.render(<App />, document.getElementById('root'));
