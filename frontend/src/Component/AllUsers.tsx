import * as React from "react";
import {Customer} from './Customer';
import {Button} from './Button';
import {AddUserForm} from './AddUserForm'
import {FilterForm} from './FilterForm';


interface Customer {
    id:String,
    name:String,
    age:Number
}

interface MyState {
    data: Customer[],
    loading:boolean,
    formVisible : string,
    filterForm : string
}

export class AllUsers extends React.Component<{},MyState>{
    constructor(props:{}){
        super(props);
        this.state = {
            data:[],
            loading:true,
            formVisible : "none",
            filterForm : "none"
        }
        this.clearData = this.clearData.bind(this)
        this.populateDatabase = this.populateDatabase.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.showFilterForm = this.showFilterForm.bind(this)
        this.hideFilterForm = this.hideFilterForm.bind(this)
        this.handleSubmitFilter = this.handleSubmitFilter.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
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

    showFilterForm(){
        this.setState({filterForm:"block"})
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

    hideFilterForm(){
        this.setState({filterForm:"none"})
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

    handleSubmitFilter(letter:string,filterBy:string){
        this.setState({loading:true})
        fetch("http://localhost:8080/filter", {
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/json', 
              }),
            body: `{"letter":"${letter}","filterBy":"${filterBy}"}` 
          })
          .then(res=>res.json())
          .then(res=>this.setState({data:res.data,loading:false}))

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

    getAllUsers(){
        fetch('http://localhost:8080/users')
        .then((res) => res.json())
        .then((res) => this.setState({data:res.data,loading:false}))
    }
    render(){
        let {loading,formVisible,filterForm} = this.state;
        
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
                            <div> <Button text="Filter results" click={this.showFilterForm}/></div>
                            <div><Button text="All Users" click={this.getAllUsers}/></div>
                            <div className="clear"></div>
                        </div>
                    )
                }
                <AddUserForm click={this.hideForm} onSubmit={this.onSubmitForm} visible={formVisible}/>
                <FilterForm visible={filterForm} onCancel={this.hideFilterForm} onSubmit={this.handleSubmitFilter}/>
            </div>
        )
    }
}

