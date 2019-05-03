import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'

import {ResultDetail} from './ResultDetail'
import {RelatedWorks} from './RelatedWorks'
import {ResultDiv,WorkTitleDiv,TabBarDiv,TabButton, DetailContainer} from './style.js'
import {capitalizeFirstLetter} from '../../functions/functions'
import {Paper, Typography, Button} from '@material-ui/core'


import {getRelatedWorks} from '../../actions/resultActions'

class Result extends Component {

    state = {
      activeTab: null,
      toggled: false
    }

    toggleTab = (e) => {
      if(!this.state.toggled) {
        this.setState({
          activeTab: e.target.id,
          toggled: true
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
          toggled: !this.state.toggled
        })
      }
    }

    getTabs = () => {
      const tabs = []
      this.props.result.expressionOfWork.forEach(expression => {
        const type = capitalizeFirstLetter(`${expression.contentType} (${expression.languageOfExpression})`)
        if(!tabs.some(tab => (tab.tabTitle === type))){
          tabs.push({
            tabTitle: type,
            manifestations: [...expression.manifestationOfExpression]
          })
        }
        else{
          const tab = tabs.filter(t => (t.tabTitle === type))[0]
          tab.manifestations = [...tab.manifestations, ...expression.manifestationOfExpression]
        }
      })
      return tabs
    }

    getRelatedWorks = (e) => {
      console.log(this.props.related)
      if(!this.props.related.some(relation => relation.workId === this.props.result.about)){
        this.toggleTab(e)
        this.props.getRelatedWorks(this.props.result.about)
      }
      else{
        this.toggleTab(e)
      }
    }
    
    getManifestationsOfTab = (activeTab) => {
      if(activeTab.tabTitle === "Related works"){
        const relation = this.props.related.filter(relation => (relation.workId === this.props.result.about))[0]
        return (
          <RelatedWorks relation={relation} />
        )
      }
      else{
        return activeTab.manifestations.map((manifestation, i) => {
          return <ResultDetail detail={manifestation}
            last={i === activeTab.manifestations.length - 1}
            key={uuid()}
          />
        })
      }
    }

    render() {
      const {result} = this.props
      const tabs = this.getTabs()
      const related = result['related'] !== undefined ? {'tabTitle': 'Related works'}: null
      const tabManifestations = this.state.activeTab ? tabs.filter(tab => (tab.tabTitle === this.state.activeTab))[0] : null
      return (
        <Paper className='result-div'>
          <Typography variant='h6'>{`${title} [${result.formOfWork[0]}]`}</Typography>
          <TabBarDiv>
            {tabs.map(tab => {
              return <TabButton
                onClick={this.toggleTab}
                id={tab.tabTitle}
                key={uuid()}
                active={tab.tabTitle === this.state.activeTab && this.state.toggled}
                     >{tab.tabTitle}</TabButton>
            })}
            {related !== null && <TabButton
              onClick={this.getRelatedWorks}
              id={related.tabTitle}
              active={related.tabTitle === this.state.activeTab && this.state.toggled}
                                 >{related.tabTitle}</TabButton>}
          </TabBarDiv>
          {this.state.toggled &&
            <DetailContainer>
              {this.getManifestationsOfTab(this.state.activeTab === 'Related works' ? related: tabManifestations)}
            </DetailContainer>}
        </Paper>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    related: state.result.related
  }
}

export default connect(mapStateToProps, {getRelatedWorks})(Result)