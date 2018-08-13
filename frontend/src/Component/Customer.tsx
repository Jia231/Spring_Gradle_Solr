import * as React from  "react";

interface Customer{
    id:String,
    name:String,
    age:Number
}

interface MyProps{
    customer : Customer
}

export const Customer : React.SFC<MyProps> = (props:MyProps)=>{
    let customer = props.customer;
    return (
        <div>
            <div>{customer.id}</div>
            <div>{customer.name}</div>
            <div>{customer.age}</div>
        </div>
    )
}