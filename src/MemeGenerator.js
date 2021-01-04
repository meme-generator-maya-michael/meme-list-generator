import React, {Component} from "react";
import MemeList from "./MemeList"

class MemeGenerator extends Component {
    constructor() {
        super()
         this.state = {
            topText: "",
            bottomText: "",
            currentMeme: {
                id: '',
                url : '',
                },
            allMemeImgs: [],
            memeList: []
            }

        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addMeme = this.addMeme.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
       this.tryAnotherEdit = this.tryAnotherEdit.bind(this)
    }


    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                const {memes} = response.data;
                this.setState({ 
                    allMemeImgs: memes,  
                    currentMeme: memes[Math.floor(Math.random() * this.state.allMemeImgs.length)]
                    
                })
            })
    }

    addMeme(evt) {
        evt.preventDefault();

        console.log(this.state.currentMeme);
        const newMeme = {
            topText : this.state.topText,
            bottomText : this.state.bottomText,
            url : this.state.currentMeme.url,
            id : this.state.currentMeme.id,
            edited : false
        }
        

        this.setState(prevState => ({
            ...prevState,
            memeList : [...prevState.memeList, newMeme]
        }))
        console.log("New Meme List: ", this.state.memeList);
        this.refresh(evt);
    }



    handleChange(evt){
        const {name, value} = evt.target;
        this.setState({ [name] : value})
    }

    refresh(evt){
        evt.preventDefault();
        this.setState({
            topText: "",
            bottomText: "",
            currentMeme: this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)]
        })
    }

    tryAnotherEdit(memeId, stringOne, stringTwo){
        this.setState(prevState =>{
            let memeIndex = prevState.memeList.findIndex(meme => meme.id === memeId.id)
            let editedArray = [...prevState.memeList]
            console.log(editedArray[memeIndex])
            editedArray[memeIndex] = {...editedArray[memeIndex], topText:stringOne, bottomText : stringTwo}
            console.log(editedArray[memeIndex])
            return{...prevState, memeList : editedArray}

            
        })
    }

    
    handleEdit(meme){
        const filteredMemes = this.state.memeList.filter( (m) => {
            return m.id !== meme.id;
        });
        
        this.setState({
            topText: meme.topText,
            bottomText: meme.bottomText,
            currentMeme:{
                url: meme.url

            }, 
            memeList: filteredMemes
        })

    }

    handleDelete(obj){
        let editedArray = this.state.memeList.filter(meme => obj !== meme.id)
        this.setState(prevState =>({
            ...prevState,
            memeList : editedArray
        }))
        


    }

    render() {

        // TODO: map the memelist to render all memes on the page
    

        let memeList = this.state.memeList.map(meme => {
            return <MemeList 
                url = {meme.url} 
                topText = {meme.topText} 
                bottomText = {meme.bottomText} 
                handleDelete ={this.handleDelete} 
                meme = {meme} 
                handleEdit = {this.handleEdit}/>
                
        
        })

        console.log(this.state.currentMeme);

        return (
            <div className = 'row'>
                <div className = 'column one'>
                    <div className = 'test'>
                    <form className="meme-form">
                        <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        /> 
                        <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        /> 
                
                        <button onClick={this.addMeme}>Add</button>
                        <button onClick={this.refresh}>Refresh</button>
                    </form>
                    <div className="meme">
                        <img src={this.state.currentMeme.url} alt="" />
                        <h2 className="top">{this.state.topText}</h2>
                        <h2 className="bottom">{this.state.bottomText}</h2>
                    </div>
                        
                    </div>
                    

                </div>
                <div className = 'column two'>
                    {memeList}
                </div>

            </div>
        )
    }
}

export default MemeGenerator;
