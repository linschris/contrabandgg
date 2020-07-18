import React from 'react'
import '../../assets/styles/LeaderBoard.css'
import LeaderboardForm from './LeaderboardForm'
import LeaderboardPlayer from './LeaderboardPlayer'
import Images from '../../index.js'
import {v4 as uuidv4} from 'uuid'
import images from '../../index.js'

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leaderBoardData: null,
            tier: null,
            division: null,
            page: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.leaderBoardData !== props.leaderBoardData && props.leaderBoardData !== null && state.page !== props.page) {
            return {
                leaderBoardData: props.leaderBoardData,
                tier: props.tier,
                division: props.division,
                page: props.page
            }
        }
        return null
    }

    render() {
        if(this.state.leaderBoardData !== null & this.state.leaderBoardData !== undefined && images !== undefined) {
            let rankTier = this.state.tier.toLowerCase()
            return (
                <div id="leaderBoard" className="cardStyling">
                    <div id="leaderBoard-header">Leaderboards <span><i className="fa fa-user-circle-o" aria-hidden="true"></i></span></div>
                    <img src={Images.ranks[rankTier]} alt=" "></img>
                    <div id="leaderBoard-info"><strong>{this.state.tier} {this.state.division} (page {this.state.page})</strong></div>
                    {(this.state.leaderBoardData.length > 0) ? this.state.leaderBoardData.map((player, i) => {
                        return <LeaderboardPlayer key={uuidv4()} name={player.summonerName} leaguePoints={player.leaguePoints} number={(i + 1) + 13 * (this.state.page - 1)}/>
                    }) : <div id="error-data"> No data found. </div>}
                    <LeaderboardForm key={this.state.tier + this.state.division} handleChange={this.props.handleChange} handleButtonUp = {this.props.handleButtonUp} handleButtonDown = {this.props.handleButtonDown} tier={this.state.tier} division={this.state.division}/>
                </div>
            )
        }
        return (
            <div id="leaderBoard" className="cardStyling">
                <div id="leaderBoard-header">Leaderboards <i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
                <div>Loading...</div>
            </div>
        )
    }
}

export default Leaderboard;