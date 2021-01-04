import React from "react"

class MemeList extends React.Component{
    render(){
        let className = this.props.meme === undefined ? 'hidden' : 'form'


        return(
            <div className = {className}>
                <div className = 'meme'>
                    <img src={this.props.url} alt=""/>
                    <h2 className="top">{this.props.topText}</h2>
                    <h2 className="bottom">{this.props.bottomText}</h2>
                    <button onClick = {() => this.props.handleEdit(this.props.meme)}>Edit</button>
                    <button onClick ={() => this.props.handleDelete(this.props.meme.id)}>Delete</button>
                </div>
            </div>
            
          
        )
    }
}

export default MemeList