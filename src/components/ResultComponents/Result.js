import React, { Component } from 'react';

class Result extends Component {

    state = {
        activeTab: null,
        toggled: false,
        tabs: ["tab1", "tab2"],
    }


    toggleTab = (e) => {
        if(!this.state.toggled) {
            this.setState({
                activeTab: e.target.id,
                toggled: true,
            })
        }

        else if(this.state.activeTab !== e.target.id){
            this.setState({
                activeTab: e.target.id
            })
        }

        else{
            this.setState({
            activeTab: e.target.id,
            toggled: !this.state.toggled,
            })
        }
    }

    render() {
        console.log(this.state.toggled);
        return (
            <div className="result">
                <div className="tab-bar">
                    <button onClick={this.toggleTab} id={0}>Tab1</button>
                    <button onClick={this.toggleTab} id={1}>Tab2</button>
                </div>
                {this.state.toggled  && <h1>{this.state.tabs[this.state.activeTab]}</h1>}
            </div>
        )
    }
}

export default Result;