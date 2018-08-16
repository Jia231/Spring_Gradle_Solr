import * as React from "react";
import {Button} from './Button';
import {ErrorMessage} from './ErrorMessage';

interface MyError {
    haveError : boolean,
    message : string
}
interface MyState {
    name:string,
    age:Number,
    validForm : MyError
}

interface MyProps{
    visible : string,
    click : Function,
    onSubmit : Function
}

export class AddUserForm extends React.PureComponent<MyProps,MyState>{
    constructor(props:MyProps){
        super(props)
        this.state = {
            name:"",
            age:0,
            validForm:{
                haveError:true,
                message:""
            }
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeAge = this.onChangeAge.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onCancel(){
        this.props.click()
    }

    validateForm(){
        let {name,age} = this.state;
        if(name==""){
            this.setState({validForm:{haveError:true,message:"Name field cannot be empty."}})
        }
        else if(age<=0 || age>100){
            this.setState({validForm:{haveError:true,message:"Age field is out of range."}})
        }
        else{
            this.setState({
                validForm:{
                    haveError:false,
                    message:""
                }
            })
        }
    }

    onSubmit(){
        this.validateForm()
        let {haveError,message} = this.state.validForm;
        let {name,age} = this.state;
        if(haveError==false){
            this.onCancel();
            this.setState({name:"",age:0})
            this.props.onSubmit(name,age);
        }
    }

    onChangeName(e){
        this.setState({name:e.target.value})
    }
    onChangeAge(e){
        this.setState({age:e.target.value})
    }

    render(){

    let myStyle = {
        "display" : this.props.visible
    }
    let {message} = this.state.validForm;
        return(
            <div className="row form" style={myStyle}>
            <ErrorMessage text={message}/>
             <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="first_name" type="text" value={this.state.name} className="validate" onChange={this.onChangeName}/>
                        <label>First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="Age" type="number" value={Number(this.state.age)} className="validate" onChange={this.onChangeAge}/>
                        <label>Age</label>
                    </div>
                 </div>
                 <div className="card-action">
                            <div> <Button text="Cancel" click={this.onCancel}/></div>
                            <div> <Button text="Add user" click={this.onSubmit}/></div>
                            <div className="clear"></div>
                </div>
             </form>
            </div>
        )
    }


}
