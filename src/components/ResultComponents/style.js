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
  padding-bottom: 10px;
  box-shadow: 1px 1px 0px 0px darkgrey;
`

export const WorkTitleDiv = styled.div`
  padding-bottom: 2px;
  border-bottom: solid #ddd 1px;
  padding-left: 10px;
  padding-right: 0px;
  width: calc(100% - 10px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const TabBarDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 3em;
  border-radius: 5px 5px 0 0;
  border-bottom: solid lightgrey 1px;
`

export const TabButton = styled.button`
  padding: 0 10px 0 10px;
  height: 100%;
  background-color: ${props => props.active ? '#f4f2f2' : '#ddd'};
  border: none;
  text-align: center;
  font-size: 15px;
  border-radius: 10px 10px 0 0;
  transition: 0.3s;
  &:hover {
    transition: 0.5s;
    background-color: #f4f2f2;
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
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
  padding-right: 10px;
  padding: 20px 0 20px 20px;
`

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 25vw;
  margin-top: 1em;
`