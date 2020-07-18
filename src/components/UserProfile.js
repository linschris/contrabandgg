import React from 'react'
import '../assets/styles/UserData.css'




class UserProfile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            userName: props.userName,
            summonerID: props.summonerID,
            summonerLevel: props.summonerLevel,
            profileIconID: props.profileIconID,
        }
    }

    render() {
        if(this.state.userName !== null && this.state.userName !== "Error") {
            return (
                <div className="userProfile cardStyling">
                    <img src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${this.state.profileIconID}.jpg`} alt="No profile icon found."></img>
                    <div>{this.state.userName}</div>
                    <div>{`Level ${this.state.summonerLevel}`}</div>
                </div>
            )
        }
        return null
    }
}

export default UserProfile;