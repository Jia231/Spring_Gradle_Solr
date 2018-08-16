import * as React from "react";
import {Customer} from './Customer';
import {Button} from './Button';
import {AddUserForm} from './AddUserForm'
interface Customer {
    id:String,
    name:String,
    age:Number
}

interface MyState {
    data: Customer[],
    loading:boolean,
    formVisible : string
}

export class AllUsers extends React.Component<{},MyState>{
    constructor(props:{}){
        super(props);
        this.state = {
            data:[],
            loading:true,
            formVisible : "none"
        }
        this.clearData = this.clearData.bind(this)
        this.populateDatabase = this.populateDatabase.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }
    componentDidMount(){
        fetch('http://localhost:8080/users')
        .then((res) => res.json())
        .then((res) => this.setState({data:res.data,loading:false}))
    }
    displayCustomers (){
        let customers;
        let {data} = this.state;
       if(data.length>0){
           customers =  data.map(c=><Customer key={Number(c.id)} customer={c}/>)
        }
        else if(data.length==0){
            customers = "There are no customers in the database!";
        }
      
      return customers;
    }

    showForm(){
        this.setState({formVisible:"block"})
    }

    onSubmitForm(name:string,age:number){
        fetch("http://localhost:8080/addUser", {
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/json', 
              }),
            body: `{"name":"${name}","age":${age}}` // <-- Post parameters
          })
          .then((res) => res.json())
          .then(res=>{
              if(res.data=="User saved successfully"){
                fetch('http://localhost:8080/users')
                .then((res) => res.json())
                .then((res) => this.setState({data:res.data,loading:false}))
              }
          })
          .catch((error) => {
              console.error(error);
          });
    }

    hideForm(){
        this.setState({formVisible:"none"})
    }

    clearData(){
        this.setState({loading:true})
        fetch('http://localhost:8080/delete')
        .then((res) => res.json())
        .then(res=>{
            if(res.data=="Database has been cleared."){
                fetch('http://localhost:8080/users')
                .then((res) => res.json())
                .then((res) => this.setState({data:res.data,loading:false}))
            }
        })
    }
    populateDatabase(){
        this.setState({loading:true})
        fetch('http://localhost:8080/populate')
        .then(res=>res.json())
        .then(res=>{
           
                fetch('http://localhost:8080/users')
                .then((res) => res.json())
                .then((res) => this.setState({data:res.data,loading:false}))
           
        })
    }
    render(){
        let {loading,formVisible} = this.state;
        
        return (
            <div>
                {
                    !!loading ? (<div className="row">Loading...</div>) : (this.displayCustomers())
                }
                {
                    !!loading ? (<div></div>) : (
                        <div className="card-action">
                            <div> <Button text="Clear database" click={this.clearData}/></div>
                            <div> <Button text="Populate database" click={this.populateDatabase}/></div>
                            <div> <Button text="Add user" click={this.showForm}/></div>
                            <div className="clear"></div>
                        </div>
                    )
                }
                <AddUserForm click={this.hideForm} onSubmit={this.onSubmitForm} visible={formVisible}/>
            </div>
        )
    }
}

