import React from 'react'
import '../../assets/styles/MatchData.css'
import axios from 'axios'
import Participant from './Participant'
import ScoreLine from './ScoreLine'
import {v4 as uuidv4} from 'uuid'
import GameType from './GameType'

class Match extends React.PureComponent {
    
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            matchData: null,
            champPlayed: null,
            summonerName: null,
            WL: null,
            SS1: null,
            SS2: null
        }
        this.getMatchData = this.getMatchData.bind(this)
        this.getUserWin = this.getUserWin.bind(this)
    }


    static getDerivedStateFromProps(props, state) {
        if(state.data !== props.matchData && props.matchData != null) {
            return {
                data: props.matchData,
                summonerName: props.summonerName
            }
        }
        return null
    }

    componentDidMount() {
        if(this.state.data !== null) this.getMatchData(this.state.data.gameId)
    }

    getMatchData(gameId) {
        axios.get(`/matchInfo/${gameId}`).then(response => {
            this.setState({
                matchData: response.data     
            }, function() {/*console.log(this.state.matchData);*/ this.getChampName(this.state.data.champion); this.getUserWin()})
        })
    }
    getChampName = (champId) => {
        axios.get(`/champName/${champId}`).then(response => {
            this.setState({
                champPlayed: response.data.name
            })
        })
    }
    getUserWin() {
        const index = (this.state.matchData.participantIdentities.find(participant => participant.player.summonerName === this.state.summonerName).participantId) - 1
        //console.log("USER: ", this.state.matchData.participants[index])
        const WL = this.state.matchData.participants[index].stats.win ? "win" : "loss"
        const SS1 = this.state.matchData.participants[index].spell1Id
        const SS2 = this.state.matchData.participants[index].spell2Id
        this.setState({
            WL: WL,
            SS1: SS1,
            SS2: SS2
        }, function() { /*console.log("DSIDASDAS", this.state.SS1); console.log(this.state.SS2); */})

    }


    render() {
        if(this.state.data !== null) {
            if(this.state.matchData !== null && this.state.matchData !== undefined) {
                //console.log(this.state.matchData)
                //console.log(this.state.matchData)
                return (
                    <>
                    <div className={`cardStyling match ${this.state.WL}`}>
                        <GameType WL={this.state.WL} gameDuration={this.state.matchData.gameDuration} gameCreation={this.state.matchData.gameCreation} queueId={this.state.matchData.queueId}/>
                        <div id="image-container" className={`image-container ${this.state.WL}`}>
                            <img src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${this.state.data.champion}.png`} alt=" "></img>
                            <div id="champName">{this.state.champPlayed}</div>
                        </div>
                        <ScoreLine data={this.state.matchData} summonerName={this.state.summonerName}/>
                        <div className={`participant-list ${this.state.WL}`}>
                            <div className="team-one">
                                {this.state.matchData.participantIdentities.slice(0, 5).map((match, i) => {
                                    return <Participant key={uuidv4()} participantData = {this.state.matchData.participantIdentities[i]} participantStats = {this.state.matchData.participants[i]} />
                                })}
                            </div>
                            <div className="team-two">
                                {this.state.matchData.participantIdentities.slice(5, 10).map((match, i) => {
                                    return <Participant key={uuidv4()} participantData = {this.state.matchData.participantIdentities[i+5]} participantStats = {this.state.matchData.participants[i+5]} />
                                })}
                            </div>
                        </div>
                    </div>
                </>
                )
            }
            return (
                <div className="cardStyling match win">
                    Loading...
                </div>
            )
        }
        return null;
    }
}

export default Match;