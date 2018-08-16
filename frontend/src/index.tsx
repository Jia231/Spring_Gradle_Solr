import * as React from 'react';
import * as ReactDOM from 'react-dom'
//import FirstComponent from './Component/FirstComponent'


import {AllUsers} from './Component/AllUsers'

const css = require('./css/app.scss')
ReactDOM.render(
    <div>
        <AllUsers/>
    </div>,
    document.getElementById('app')
)