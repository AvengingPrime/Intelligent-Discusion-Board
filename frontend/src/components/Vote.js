import React from "react";
import '../styles/Vote.css';

class Vote extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            count: props.count, // count here should be pulled from database from replyID and incremented accordingly
            addend: 0
        }
    }

    toggleIncrement = () => {
        this.setState(prevState => ({
            addend: prevState.addend === 1 ? 0 : 1
        }))
    }

/*
    toggleDecrement = () => {
        this.setState(prevState => ({
            addend: prevState.addend === -1 ? 0 : -1
        }))
    }
*/

    render() {
        return (
            <body className="vote">
                <p>{this.state.count + this.state.addend}</p>
                <button className = "upvote" onClick={this.toggleIncrement}>+</button>
                {/* <button className = "downvote" onClick={this.toggleDecrement}>-</button> */}
            </body>
        );
    }
}
    {/*
    return (
        <body className="vote">
                <p className="votecount">{votes}</p>
                <button className="upvote" onClick={upvote}>Upvote</button>
                <button className="downvote" onClick={downvote}>Downvote</button>

                
            </body>
    )
    */}


export default Vote