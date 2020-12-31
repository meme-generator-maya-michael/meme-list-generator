import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            currentMeme: {
                topText: "",
                bottomText: "",
                imgUrl: ""
            },
            allMemeImgs: [],
            randomImg: "",
            memeList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.addMeme = this.addMeme.bind(this);
        this.getRandomImg = this.getRandomImg.bind(this);
    }

    getRandomImg(){
        console.log("im in get random img...heres the length of allmemes ", this.state.allMemeImgs.length )
        this.setState({randomImg : this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)].url});
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({ 
                    allMemeImgs: memes  
                })
                this.getRandomImg(); // render a random meme
            })
    }

    addMeme(evt) {
        evt.preventDefault();
        console.log("Adding a Meme ");
        this.setState({
            currentMeme : {topText: this.state.topText, bottomText: this.state.bottomText, imgUrl: this.state.randomImg}
        })

        this.setState(state => {
            return {memeList : [...state.memeList, state.currentMeme]}
        });
        console.log("New Meme List: ", this.state.memeList);
        this.refresh(evt);
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
        console.log("Refreshing")
    }

    render() {
        // TODO: map the memelist to render all memes on the page
        console.log("im Rendering! ");
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
            </div>
        )
    }
}

export default MemeGenerator;