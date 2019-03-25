import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import {newQuery, getNext} from '../../actions/resultActions'
import Result from '../../components/ResultComponents/Result'
import {ResultContainer} from './style'


class WorksList extends Component {

    componentDidMount(){
        this.props.newQuery('http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/search.xquery?query=murder&querytype=all&displaytype=works&subcollection=&rankingtype=default&categories=%7B%7D&roles=%7B%7D&filtermethod=&subtree=false')
    }

    renderResults = () => {
        return this.props.results.map(result => {
            return <Result result={result} key={uuid()}/>
        })
    }

    getNext = () => {
        this.props.getNext(this.props.next)
    }


    render() {
        console.log(this.props.results);
        if(!this.props.results) {
            return (
                <ResultContainer/>
            )
        }    
        return (
            <ResultContainer>
                {this.renderResults()}
                <button onClick={this.getNext}>Get more result</button>
            </ResultContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.result.results,
        next: state.result.next
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newQuery: (url) => dispatch(newQuery(url)),
        getNext: (next) => dispatch(getNext(next))
    }
}


export default connect(mapStateToProps, mapDispatchToProps )(WorksList);