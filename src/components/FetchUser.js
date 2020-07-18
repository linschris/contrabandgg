import React from 'react'
import UserNameForm from './UserNameForm'
import UserProfile from './UserProfile'
import UserRankedSolo from './UserRanked/UserRankedSolo'
import UserRankedFlex from './UserRanked/UserRankedFlex'
import MatchList from './Match/MatchList'
import ChampionMasteries from './ChampionMastery/ChampionMasteries'
import LeaderBoard from './LeaderBoard/Leaderboard'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

class FetchUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formInput: {
                userName: null,
                numMatches: 5,
                //Leaderboard input
                tier: "CHALLENGER",
                division: "I",
                page: 1
            },
            searching: true,
            userData: {
                userName: null,
                accountId: null,
                summonerId: null,
                profileIconId: null,
                summonerLevel: null
            },
            userRankedData: {
                rankedSoloData: null,
                rankedFlexData: null
            },
            matchListData: null,
            championMasteriesData: null,
            leaderBoardData: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.incrementPage = this.incrementPage.bind(this)
        this.decrementPage = this.decrementPage.bind(this)
        this.handleLeaderBoardChange = this.handleLeaderBoardChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchChampionMasteries = this.fetchChampionMasteries.bind(this)
        this.fetchLeaderBoardData = this.fetchLeaderBoardData.bind(this)
    }
    
    fetchData(userName) {
        axios.get(`/fetchUser/${userName}`).then(response => {
            console.log(response.data)
            const {name, accountId, id, summonerLevel, profileIconId} = response.data;
            this.setState(prevState => ({
                userData: {
                    ...prevState.userData, accountId: accountId, userName: name, summonerId: id, summonerLevel: summonerLevel, profileIconId: profileIconId,
                },
                searching: false
            }), function() { this.fetchRankedData(this.state.userData.summonerId); this.fetchMatchList(this.state.userData.accountId); this.fetchChampionMasteries(); this.fetchLeaderBoardData()})
        })
    }

    fetchRankedData(summonerId) {
        axios.get(`/ranked/${summonerId}`).then(response => {
            if(response.data[0] !== undefined) {
                let rankedSoloData = (response.data[0].queueType === "RANKED_SOLO_5x5") ? response.data[0] : response.data[1]
                let rankedFlexData = (response.data[0].queueType === "RANKED_FLEX_SR") ? response.data[0] : response.data[1]
                this.setState(prevState => ({
                    userRankedData: {
                        ...prevState.userRankedData, rankedSoloData: rankedSoloData, rankedFlexData: rankedFlexData
                    }
                }), function() {/*console.log(this.state.userRankedData)*/;})
            }
        })
    }

    fetchMatchList(accountId) {
        axios.get(`/matchList/${accountId}/${this.state.formInput.numMatches}`).then(response => {
            this.setState({
                matchListData: response.data.matches       
            }, function() {/*console.log(this.state.matchListData)*/})
        })
    }

    fetchChampionMasteries() {
        axios.get(`/champMasteries/${this.state.userData.summonerId}`).then(response => {
            this.setState({
                championMasteriesData: response.data.slice(0, 10)
            })
        })
    }

    handleChange(e) {
        const {name, value} = e.target;
        //console.log(name + ", " + value)
        this.setState(prevState => ({
            formInput: {...prevState.formInput, [name]: value}
        }))
    }
    handleSubmit(e) {
        e.preventDefault();
        this.fetchData(this.state.formInput.userName)
    }   

    incrementPage(e) {
        this.setState(prevState => ({
            formInput: {...prevState.formInput, page: prevState.formInput.page + 1}
        }))
    }

    decrementPage(e) {
        this.setState(prevState => ({
            formInput: {
                ...prevState.formInput, page: prevState.formInput.page - 1
            }
        }), function() { /*console.log(this.state.formInput) */})
    }
    handleLeaderBoardChange(e) {
        const {name, value} = e.target;
        console.log(name + " " + value)
        this.setState(prevState => ({
            formInput: {...prevState.formInput, [name]: value}
        }), function() { this.fetchLeaderBoardData() })
    }
    fetchLeaderBoardData() {
        const {tier, division, page} = this.state.formInput
        axios.get(`/leaderboards/${tier}/${division}/${page}`).then(response => {
            this.setState({
                leaderBoardData: response.data
            }, function() { /*console.log("HIT HERE", this.state.leaderBoardData) */ })
        })
    }
    componentDidMount() {
        this.fetchLeaderBoardData()
    }


    render() {
        if((this.state.leaderBoardData !== null && this.state.leaderBoardData !== undefined && this.state.leaderBoardData.name !== "Error")) this.state.leaderBoardData.sort((a,b) => {return b.leaguePoints - a.leaguePoints })
        return (
            <div>
                <div id="title">Contraband.gg</div>
                <UserNameForm value={this.state.formInput.userName} handleChange = {(e) => this.handleChange(e)} handleSubmit = {(e) => this.handleSubmit(e)}/>
                <div id="userData">
                    <UserProfile key={uuidv4()} userName={this.state.userData.userName} summonerID={this.state.userData.summonerId} summonerLevel={this.state.userData.summonerLevel} profileIconID={this.state.userData.profileIconId}/> 
                    <UserRankedSolo key={uuidv4()} rankedSolo={this.state.userRankedData.rankedSoloData} searched={this.state.searching}/>
                    <UserRankedFlex key={uuidv4()} rankedFlex={this.state.userRankedData.rankedFlexData} />
                    <ChampionMasteries champData={this.state.championMasteriesData}/>
                </div>
                <MatchList matchList={this.state.matchListData} summonerName={this.state.userData.userName}/>
                {(this.state.leaderBoardData !== null && this.state.leaderBoardData !== undefined && this.state.leaderBoardData.name !== "Error") ? 
                <LeaderBoard key={uuidv4()} handleChange={(e) => this.handleLeaderBoardChange(e)} leaderBoardData={this.state.leaderBoardData.slice(13 * (this.state.formInput.page - 1), 13 * (this.state.formInput.page))} handleButtonUp = {(e) => this.decrementPage(e)} handleButtonDown = {(e) => this.incrementPage(e)} tier={this.state.formInput.tier} division={this.state.formInput.division} page={this.state.formInput.page} /> : 
                <LeaderBoard key={this.state.formInput.tier + this.state.formInput.division} handleChange={(e) => this.handleLeaderBoardChange(e)} leaderBoardData={[]} handleButtonUp = {(e) => this.decrementPage(e)} handleButtonDown = {(e) => this.incrementPage(e)} tier={this.state.formInput.tier} division={this.state.formInput.division} page={this.state.formInput.page} /> }
            </div>
        )
    }
}

export default FetchUser;
