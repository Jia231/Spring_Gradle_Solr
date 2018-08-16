import * as React from 'react';
import { throws } from 'assert';

interface MyProps {
    text : string,
    click : Function
        
}

export class Button extends React.PureComponent<MyProps>{
    constructor(props:MyProps){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(){
        this.props.click();
    }

    render(){
        let {text} = this.props;
        return (
            <div>
                <input type='button' className="waves-effect waves-light btn" onClick={this.onSubmit} value={text}/>
            </div>
        )
    }
}