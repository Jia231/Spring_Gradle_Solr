import * as React from 'react';
import * as ReactDOM from 'react-dom'
import FirstComponent from './Component/FirstComponent'
const css = require('./css/app.scss')
ReactDOM.render(
    <div>
        Good Morning!!
        <FirstComponent name={"Laura"}/>
    </div>,
    document.getElementById('app')
)