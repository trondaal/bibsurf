import {INIT_SEARCH, NEW_QUERY} from '../constants'

import axios from 'axios'

export const newQuery = (url) => dispatch => {
    dispatch({
        type: INIT_SEARCH
    })
    return (
        axios.get(url).then(res => {
            dispatch({
                type: NEW_QUERY,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    )
}