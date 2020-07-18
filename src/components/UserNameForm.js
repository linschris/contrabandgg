import React from 'react'
import '../assets/styles/searchBar.css'


function UserNameForm({value, handleChange, handleSubmit}) {
    return (
        <div id="user-search-form">
            <form onSubmit={handleSubmit}>
                <input className="user-search-input" type="text" value={value || ''} placeholder="Search a username..." onChange={handleChange} name="userName"></input>
                <button className="user-button-input" onClick={handleSubmit}>Search</button>
                <select name="numMatches" id="numMatches" onChange={handleChange} defaultValue="5">
                    <option value="1">1 Match</option>
                    <option value="5">5 Matches</option>
                    <option value="10">10 Matches</option>
                </select>
            </form>
        </div>
    )
}

export default UserNameForm;
