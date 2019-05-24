import React from 'react'
import uuid from 'uuid'

import {formatCamelCase} from '../../utils'
import {DetailDiv} from './style'

const RelatedWorks = (props) => {
  const getWork = () => {
    return Object.keys(props.relation.relations).map((key) => {
      const title = formatCamelCase(key)
      return (
        <div key={uuid()}>
          <h4>{title}</h4>
          <ul>
            {props.relation.relations[key].map(work => {
              relatedWorkFields[0].forEach(field => {
                if(work[field[1]]){
                  field[1] === "author" ? line += `${field[0]} ${work[field[1]][0].nameOfPerson} ${field[2]}`
                    : line += `${field[0]} ${work[field[1]]} ${field[2]}`
                }
              })
              relatedWorkFields[1].forEach(field => {
                if(work[field[1]]) type += `${field[0]}${work[field[1]]}${field[2]}`
              })
              return (
                <li key={uuid()}>
                  <span className={"manifestation-title"}>{line}</span>
                  <span className={"manifestation-type"}>{type}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  return(
    <DetailDiv last>
      {props.relation !== undefined && getWork()}
    </DetailDiv>
  )
}

export default RelatedWorks