import * as React from 'react';

interface MyProps {
    text:string
}

export const ErrorMessage : React.SFC<MyProps>  = (props:MyProps) =>{
    let {text} = props;

    return(
        <div className="Error-text" >{text}</div>
    )
}
    
