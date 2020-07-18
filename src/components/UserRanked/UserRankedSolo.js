import React from 'react'
import Images from '../../index.js'



class UserRankedSolo extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            rankedSoloData: null,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if(state.rankedSolo !== props.rankedSolo && props.rankedSolo != null) {
            return {
                rankedSoloData: props.rankedSolo,
            }
        }
        return null
    }


    render() {
        if(this.state.rankedSoloData !== null) {
            let rankTier = this.state.rankedSoloData.tier.toLowerCase()
            return (
                <div className="userRanked cardStyling">
                    <div id="ranked-queue">Ranked Solo</div>
                    <img src={Images.ranks[rankTier]} alt=" "></img>
                    <div><strong>{this.state.rankedSoloData.tier + ' ' + this.state.rankedSoloData.rank}</strong> | {this.state.rankedSoloData.leaguePoints}LP</div>
                    <div className="wins-losses">
                    <span className="wins">{this.state.rankedSoloData.wins}W</span> | <span className="losses">{this.state.rankedSoloData.losses}L</span>
                    </div>
                    <div><span>Win-ratio: <strong>{Math.round(this.state.rankedSoloData.wins / (this.state.rankedSoloData.losses + this.state.rankedSoloData.wins) * 100)}%</strong></span></div>
                </div>
            )
        }
        return null
    }
}


export default UserRankedSolo;