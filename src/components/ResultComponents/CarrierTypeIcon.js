import React from 'react'
import HeadsetIcon from '@material-ui/icons/HeadsetOutlined'
import BookIcon from '@material-ui/icons/BookOutlined'
import LocalMoviesIcon from '@material-ui/icons/LocalMoviesOutlined'

import {carrierTypeToIcon} from '../../constants'

/**
 * Translates carrierType into an Icon using the carrierTypeToIcon map
 * @param {obj} carrierType
 */
export function CarrierTypeIcon({carrierType}) {
  // TODO: Refactor
  let Icon

  switch (carrierTypeToIcon[carrierType]) {
  case "book":
    Icon = BookIcon
    break
  case "headset":
    Icon = HeadsetIcon
    break
  case "local_movies":
    Icon = LocalMoviesIcon
    break
  default:
    break
  }

  return Icon ? <Icon /> : null
}