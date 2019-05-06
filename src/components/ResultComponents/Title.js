import React from 'react'
import uuid from 'uuid'
import {listRoles} from '../../constants'


const Title = (props) => {
  const roles = Object.keys(props.result).filter(key => listRoles.indexOf(key) !== -1)
  const renderRole = (role, index) => {
    return(
      <span key={uuid()}> {props.result[role].map((r, i) => {

        const endNotation = roles.length - 1 === index && props.result[role].length - 1 === i ? '': '; '
        return (
          `${r['nameOfPerson']} (${role})${endNotation}`)
      })} </span>
    )
  }
  return (
    <span>{roles.map((role, i) => renderRole(role, i))}</span>
  )
}

export default Title