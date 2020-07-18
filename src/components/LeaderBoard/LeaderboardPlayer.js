import React from 'react'


export default class LeaderboardPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            leaguePoints: null,
            number: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.name !== props.name && props.name != null) {
            return {
                name: props.name,
                leaguePoints: props.leaguePoints,
                number: props.number
            }
        }
        return null
    }

    render() {
        if(this.state.name !== null && this.state.name !==undefined) {
            return (
            <div className="leaderBoard-player"><div id="player-name-number"><strong>{this.state.number}.</strong>  {this.state.name}</div><span>{this.state.leaguePoints} LP</span></div>
            )
        }
        return <div className="leaderBoard-player">No player found.<span> N/A</span></div>
    }

}