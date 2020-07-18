import React from 'react'

class ScoreLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            summonerName: null,
            kills: null,
            deaths: null,
            assists: null,
            topKill: null,
            topKillNumber: null,
        }
        this.getScoreLine = this.getScoreLine.bind(this)
        this.getTopKill = this.getTopKill.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if(state.data !== props.data && props.data != null) {
            return {
                data: props.data,
                summonerName: props.summonerName
            }
        }
        return null
    }
    componentDidMount() {
        if(this.state.summonerName !== null) this.getScoreLine()
    }
    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.state.data) {
            return
        }
    }

    getScoreLine() {
        const index = (this.state.data.participantIdentities.find(participant => participant.player.summonerName === this.state.summonerName).participantId) - 1
        const {kills, deaths, assists} = this.state.data.participants[index].stats
        this.setState({
            kills: kills, deaths: deaths, assists: assists
        })
        this.getTopKill(this.state.data.participants[index].stats)
    }

    getTopKill(data) {
        let killArray = [undefined, undefined, "Double Kill", "Triple Kill", "Quadra Kill", "Pentakill"]
        let topKill = killArray[data.largestMultiKill]
        this.setState({
            topKill: topKill,
            topKillNumber: data.largestMultiKill
        })
    }

    

    render() {
        //console.log(this.state.data)
        if(this.state.data != null) {
            return (
                <div className = "scoreLine">
                    <div id="kills-deaths">{this.state.kills} / <strong>{this.state.deaths}</strong> / {this.state.assists}</div>
                    <div id="KDA"><strong>{(this.state.deaths !== 0) ? (((this.state.kills + this.state.assists) / this.state.deaths).toFixed(2)) : "Perfect"} KDA</strong></div>
                    {(this.state.topKillNumber >= 2 && this.state.topKill !== undefined) ? <div id="top-kill"><span><strong>{this.state.topKill}</strong></span></div> : null}
                </div>
            )
        }
        return (
            <div className = "scoreLine">
                    Loading...
            </div>
        )
    }

}

export default ScoreLine;