import React from 'react'
import axios from 'axios'


class ChampionMastery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            champMasteryData: null,
            i: null,
            champPlayed: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.champMasteryData !== props.champData && props.champData != null) {
            return {
                champMasteryData: props.champData,
                i: props.id
            }
        }
        return null
    }

    getChampName = (champId) => {
        axios.get(`/champName/${champId}`).then(response => {
            this.setState({
                champPlayed: response.data.name
            })
        })
    }

    componentDidMount() {
        this.getChampName(this.state.champMasteryData.championId)
    }

    render() {
        return (
            <div className="champMastery" id={`champ-mastery${this.state.i}`}>
                <div className="champName">{this.state.champPlayed}</div>
                <img className="champImg" src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${this.state.champMasteryData.championId}.png`} alt=" "></img>
                <img className="champMasteryImg" src={`https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_${this.state.champMasteryData.championLevel}.png`} alt="https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_default.png"></img>
                <div className="mastery-points"><strong>{`${(this.state.champMasteryData.championPoints/1000).toFixed(0)}k`}</strong></div>
            </div>
        )
    }
}

export default ChampionMastery