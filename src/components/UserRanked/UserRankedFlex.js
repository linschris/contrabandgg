import React from 'react'
import Images from '../../index.js'



class UserRankedFlex extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            rankedFlexData: null
        }
    }


    static getDerivedStateFromProps(props, state) {
        if(state.rankedFlexData !== props.rankedFlex && props.rankedFlex != null) {
            return {
                rankedFlexData: props.rankedFlex,
            }
        }
        return null
    }


    render() {
        if(this.state.rankedFlexData !== null) {
            let rankTier = this.state.rankedFlexData.tier.toLowerCase()
            return (
                <div className="userRanked cardStyling" id="userRankedFlex">
                    <div id="ranked-queue">Ranked Flex</div>
                    <img src={Images.ranks[rankTier]} alt=" "></img>
                    <div><strong>{(this.state.rankedFlexData.tier + ' ' + this.state.rankedFlexData.rank)}</strong> | {this.state.rankedFlexData.leaguePoints}LP</div>
                    <div className="wins-losses">
                        <span className="wins">{this.state.rankedFlexData.wins}W</span> | <span className="losses">{this.state.rankedFlexData.losses}L</span>
                    </div>
                    <div><span>Win-ratio: <strong>{Math.round(this.state.rankedFlexData.wins / (this.state.rankedFlexData.losses + this.state.rankedFlexData.wins) * 100) }%</strong></span></div>
                </div>
            )
        }
        return null
    }
}


export default UserRankedFlex;