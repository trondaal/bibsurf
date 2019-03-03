import React, { Component } from 'react';
import { ResultDetail} from './ResultDetail'
import {ResultDiv,WorkTitleDiv,TabBarDiv,TabButton, DetailContainer} from './style.js'

class Result extends Component {

    state = {
        activeTab: null,
        toggled: false,
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

    getTabs = () => {
        let tabs = []
        this.props.result.expressionOfWork.map(expression => {
            let type = `${expression.contentType} (${expression.languageOfExpression})`;
            if(!tabs.some(tab => (tab.tabTitle === type))){
                tabs.push({
                    tabTitle: type,
                    manifestations: [...expression.manifestationOfExpression]
                });
            }
            else{
                const tab = tabs.filter(t => (t.tabTitle === type))[0]
                tab.manifestations = [...tab.manifestations, ...expression.manifestationOfExpression]
            }
        })
        return tabs;
            
    }

    
    getManifestationsOfTab = (tabManifestations) => {
        return tabManifestations.map((manifestation, i) => {
            return <ResultDetail detail={manifestation} 
                last={i === tabManifestations.length - 1} 
                key={manifestation.identifierForTheManifestation} />
        })
    }

    render() {

        const tabs = this.getTabs()
        const tabManifestations = this.state.activeTab ? tabs.filter(tab => (tab.tabTitle === this.state.activeTab))[0].manifestations : null;
        const {result} = this.props
        console.log(result);
        return (
            <ResultDiv>
                <WorkTitleDiv><h3>{result.titleOfWork[0]} /</h3></WorkTitleDiv>
                <TabBarDiv>
                    {tabs.map(tab => {
                        return <TabButton 
                            onClick={this.toggleTab} 
                            id={tab.tabTitle}
                            key={tab.manifestations[0].about} 
                            active={tab.tabTitle === this.state.activeTab && this.state.toggled}>{tab.tabTitle}</TabButton> 
                    })}
                </TabBarDiv>
                {this.state.toggled && <DetailContainer>{this.getManifestationsOfTab(tabManifestations)}</DetailContainer>}
            </ResultDiv>
        )
    }
}

export default Result;