import styled from 'styled-components'

export const StyledDiv = styled.div``

export const ResultDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%; 
  border-radius: 3px;
  margin-bottom: 1em;
  box-shadow: 0.5px 0.5px 0px 0px black;
`

export const WorkTitleDiv = styled.div`
  padding-bottom: 2px;
  border-bottom: solid 1px #ddd;
  margin-bottom: 3px;
  padding-left: 10px;
  padding-right: 0px;
  width: calc(100% - 10px);
`

export const TabBarDiv = styled.div`
  display: flex;
  justify-content: flex-start;


  border-bottom: solid 1px lightgrey;
  border-radius: 5px 5px 0 0;
`

export const TabButton = styled.div`
  width: 15%;
  height: 3em;
  margin-right: 3px;
  background-color: white;
  border-bottom: solid ${props => props.active ? 'blue 1px' : 'lightgrey 0px'};
  text-align: center;


  &:hover {
    cursor: pointer;
    border-color: solid black;
  }
  &:focus{
    outline: 0;
  }
`

export const DetailContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const DetailDiv = styled.div `
  border-bottom: ${props => !props.last ? 'solid #ddd 1px': null};
  width: 95%;
  padding-left: 10px;
  padding: 20px 0 20px 20px;
`
