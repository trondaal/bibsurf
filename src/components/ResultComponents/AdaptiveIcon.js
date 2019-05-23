import React from 'react'
import HeadsetIcon from '@material-ui/icons/HeadsetOutlined'
import BookIcon from '@material-ui/icons/BookOutlined'
import LocalMoviesIcon from '@material-ui/icons/LocalMoviesOutlined'

import {carrierTypeToIcon} from '../../constants'

/**
 * Translates carrierType into an Icon using the carrierTypeToIcon map
 * @param {obj} carrierType
 */
export function AdaptiveIcon({carrierType}) {
  return(
    carrierTypeToIcon[carrierType] === "book" ? <BookIcon /> :
      carrierTypeToIcon[carrierType] === "headset" ? <HeadsetIcon /> :
        carrierTypeToIcon[carrierType] === "local_movies" ? <LocalMoviesIcon />
          : null
  )
}