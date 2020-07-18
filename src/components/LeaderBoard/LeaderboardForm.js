import React from 'react'

export default function LeaderboardForm({handleChange, handleButtonUp, handleButtonDown, tier, division}) {
    return (
        <div id="leaderBoard-buttons">
            <select name="tier" onChange={handleChange} defaultValue={tier}id="form-tier">
                <option value="CHALLENGER">Challenger</option>
                <option value="GRANDMASTER">Grandmaster</option>
                <option value="MASTER">Master</option>
                <option value="DIAMOND">Diamond</option>
                <option value="PLATINUM">Platinum</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
                <option value="BRONZE">Bronze</option>
                <option value="IRON">Iron</option>
            </select>
            <select name="division" onChange={handleChange} defaultValue={division} id="form-division">
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
            </select>
            <button onClick={handleButtonUp} className="form-button">
                <i className="fa fa-arrow-up"></i>
            </button>
            <button onClick={handleButtonDown} className="form-button">
                <i className="fa fa-arrow-down">
            </i></button>
        </div>
    )

}
