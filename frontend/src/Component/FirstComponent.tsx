import * as React from 'react';
import { render } from 'react-dom';

interface FirstComponent {
    name? : string
}

/*const FirstComponent : React.StatelessComponent<FirstComponent> = (props)=>{
    let {name} = props;
    return(
        <div>My name is {name}, nice to meet you!</div>
    )
}
FirstComponent.defaultProps = {
    name:"Guest"
}*/

const FirstComponent : React.SFC<FirstComponent> = (props:FirstComponent) =>{
    let name : string = props.name

    return(
        <div>
            My name is {name}, nice to meet you!
        </div>
    )
}


export default FirstComponent;