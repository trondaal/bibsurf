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
              const line = `${work.titleOfWork} / [${work.formOfWork}]`
              return(
                <li key={uuid()}>{line}</li>
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