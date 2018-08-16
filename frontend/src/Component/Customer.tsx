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
        <div className="row customer">
            {customer.name} - {customer.age}
        </div>
    )
}