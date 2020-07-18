import React from 'react'

//http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{number}.png
//http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${this.state.participantData.player.profileIcon}.jpg
class Participant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            participantData: null,
            participantStats: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.participantData !== props.participantData && props.participantData != null) {
            return {
                participantData: props.participantData,
                participantStats: props.participantStats
            }
        }
        return null
    }

    render() {
        //console.log("DATA IS: ", this.state.participantData)
        //console.log("STATS ARE: ", this.state.participantStats)
        return (
            <div className="participant">
                <img src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${this.state.participantStats.championId}.png`} alt=" "></img>
                <div className="playerName">{this.state.participantData.player.summonerName}</div>
            </div>
        )
    }
}

export default Participant;