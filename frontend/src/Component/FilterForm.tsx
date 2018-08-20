import * as React from 'react';
import {Select} from './Select';
import {Button} from './Button';

interface MyProps {
    onSubmit : (letter:string,filterBy:string)=>void,
    visible : string,
    onCancel : ()=>void
}

interface MyState {
    selected : string,
    letter : string,
    options : []
}

export class FilterForm extends React.PureComponent<MyProps,MyState>{
    constructor(props:MyProps){
        super(props)
        this.state = {
            selected : "",
            letter : "",
            options : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentWillMount(){
        fetch("http://localhost:8080/actions")
        .then(res=>res.json())
        .then(res=>{          
            let {data} = res;
            //console.log(data)
            this.setState({options:data})}
        )

    }
    handleChange(e){
        this.setState({selected:e.target.value})
    }
    handleInputChange(e){
       this.setState({letter:e.target.value})
    }

    handleSubmit(){
        this.props.onCancel();
        this.props.onSubmit(this.state.letter,this.state.selected)
        this.setState({selected:"",letter:""})
    }
    handleCancel(){
        this.props.onCancel();
    }


    render(){
        let {options} = this.state;
        let myStyle = {
            "display":this.props.visible
        }
        console.log(myStyle)
        return(
            <div>
                { options.length == 0 ? (<div>Loading...</div>) :(
                <div className="row-select-form" style={myStyle} >
    
                    <div className="row">
                        <div className="input-field col s12">
                            <Select handleChange={this.handleChange} options={options}/>
                            <label>Filtering Options</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="letter" type="text" value={this.state.letter} className="validate" onChange={this.handleInputChange}/>
                            <label>Letter</label>
                        </div>
                        <div className="card-action">
                            <div> <Button text="Cancel" click={this.handleCancel}/></div>
                            <div> <Button text="Get Results" click={this.handleSubmit}/></div>
                            <div className="clear"></div>
                         </div>
                    </div>    
    
                </div>
                )}

            </div>
        )
    }
}
