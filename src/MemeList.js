import React from "react"

class MemeList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            topText : '',
            bottomText : '',
            edited : false
        }
        this.handleThisChange =this.handleThisChange.bind(this)
        this.showForm = this.showForm.bind(this)
    }
    handleThisChange(event){
        const {name, value} = event.target
        this.setState({[name]:value})
        
    }
    showForm(event){
        event.preventDefault()
        this.setState({edited:true})
    }
    render(){
        let className = this.props.meme === undefined ? 'hidden' : 'form'
        let buttonClass = this.state.edited === false ? 'hidden' : 'edit'
        

        console.log(this.state.topText)
        return(
            <div className = {className}>
                <div className = 'meme'>
                    <img src={this.props.url} alt=""/>
                    <h2 className="top">{this.props.topText}</h2>
                    <h2 className="bottom">{this.props.bottomText}</h2>
                    <div>
                        <button onClick = {() => this.props.handleEdit(this.props.meme)}>Edit</button>
                        <button onClick ={() => this.props.handleDelete(this.props.meme.id)}>Delete</button>
                        <button onClick = {this.showForm}>anotherEdit</button>

                    </div>
                    
                        <form  className = {buttonClass} onSubmit = {(event) =>{event.preventDefault()
                             this.props.tryAnotherEdit(this.props.meme, this.state.topText, this.state.bottomText)}}>
                            <input
                            name = 'topText'
                            type = 'text'
                            value = {this.state.topText}
                            onChange = {this.handleThisChange}
                            />
                            <input
                            name = 'bottomText'
                            type = 'text'
                            value = {this.state.bottomText}
                            onChange = {this.handleThisChange}
                            />
                            <button >Submit</button>
                        </form>
                </div>
            </div>
            
          
        )
    }
}

export default MemeList
