import React from 'react';

const Nav = (props) => {
  return (
    <div> 
      <select name="allEntries" onChange={props.onUserSelected}>
        {props.options.map((option, index) => {
          return (<option key={index} value={option}>{option}</option>)
        })}
      </select>
    </div>
  )
}


export default Nav;