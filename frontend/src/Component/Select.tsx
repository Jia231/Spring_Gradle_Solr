import * as React from 'react';

interface Options{
    name:string,
    value:string
}
interface MyProps{
    options : Options[],
    handleChange : (e:{})=>void
}

export const Select : React.SFC<MyProps> =(props:MyProps)=>{
    let {options} = props;
    
   const createOptions = ()=>{
       let selectables =  options.map(o=>{
            return <option key={o.value} value={o.value}>{o.name}</option>
        })
        //console.log(selectables)
        return selectables;
    }

    return (
        <select onChange={props.handleChange}>
             <option value="" selected>Choose your option</option>
            {createOptions()}
        </select>
    )
}