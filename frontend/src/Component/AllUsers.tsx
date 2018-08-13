import * as React from "react";
import {Customer} from './Customer';

interface Customer {
    id:String,
    name:String,
    age:Number
}

interface MyState {
    data: Customer[]
}

class AllUsers extends React.Component<{},MyState>{
    constructor(props:{}){
        super(props);
        this.state = {data:[]}
    }
    componentDidMount(){

    }
    displayCustomers (){
        let customers;
        let {data} = this.state;
       customers =  data.map(c=><Customer customer={c}/>)
       return customers;
    }
    render(){
        let customers = this.displayCustomers();
        return (
            {customers}
        )
    }
}

