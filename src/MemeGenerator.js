import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            allMemeImgs: [],
            randomImg: "",
            topText: "",
            bottomText: "",
            currentMeme: {
                topText: "",
                bottomText: "",
                imgUrl: "",
                id: ""
            },
            memeList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addMeme = this.addMeme.bind(this);
        this.getRandomImg = this.getRandomImg.bind(this);
        this.editMeme = this.editMeme.bind(this);
    }

    getRandomImg(){
        let ran = Math.floor(Math.random() * this.state.allMemeImgs.length);
        this.setState({
            randomImg : this.state.allMemeImgs[ran].url,
            id: this.state.allMemeImgs[ran].id
        });
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                const {memes} = response.data;
                this.setState({ 
                    allMemeImgs: memes  
                })
                this.getRandomImg(); // render a random meme
            })
    }

    addMeme(evt) {
        evt.preventDefault();
        // console.log("Adding a Meme ");
        this.setState({
            currentMeme : {
                topText: this.state.topText, 
                bottomText: this.state.bottomText, 
                imgUrl: this.state.randomImg,
                id: this.state.id
            }
        })

        this.setState(state => {
            return {memeList : [...state.memeList, state.currentMeme]}
        });
        // console.log("New Meme List: ", this.state.memeList);
        this.refresh(evt);
    }

    editMeme(meme){
        const filteredMemes = this.state.memeList.filter( (m) => {
            return m.id !== meme.id;
        });
        
        this.setState({
            topText: meme.topText,
            bottomText: meme.bottomText,
            randomImg: meme.imgUrl,
            memeList: filteredMemes
        })
    }

    handleChange(evt){
        const {name, value} = evt.target;
        this.setState({ [name] : value})
    }

    refresh(evt){
        evt.preventDefault();
        this.getRandomImg();
        this.setState({
            topText: "",
            bottomText: "",
            currentMeme: {}
        })
    }

    render() {
        const memes = this.state.memeList.map(meme => {
            return (
                <div className="meme-small" key = {meme.id}>
                    <img  src={meme.imgUrl} alt="" />
                    <h2 className="top">{meme.topText}</h2>
                    <h2 className="bottom">{meme.bottomText}</h2>
                    <button onClick={() => this.editMeme(meme)}>Edit</button>
                    <button onClick={console.log("delete: ", meme.id)}>Delete</button>
                </div>
            )
          })

        return (
            <div>
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
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
                <hr />
                <div className="all-memes">
                    {memes}
                </div>
            </div>
        )
    }
}

export default MemeGenerator;