import React from 'react'

class GameType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            WL: null,
            gameDuration: null,
            gameCreation: null,
            queueId: null
        }
        this.getTimePlayed = this.getTimePlayed.bind(this)
        this.getTimeDuration = this.getTimeDuration.bind(this)
        this.getTypeOfGame = this.getTypeOfGame.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if(state.WL !== props.WL && props.WL != null) {
            return {
                WL: props.WL,
                gameDuration: props.gameDuration,
                gameCreation: props.gameCreation,
                queueId: props.queueId
            }
        }
        return null
    }
    
    getTimeDuration() {
        let minutes = Math.floor(this.state.gameDuration / 60)
        let seconds = this.state.gameDuration - (minutes * 60)
        return `${minutes}m ${seconds}s`
    }

    getTimePlayed() {
        let date = new Date();
        let gameTime = new Date(this.state.gameCreation)
        let secondDifference = Math.round((date.getTime() - gameTime.getTime()) / 1000)
        let minuteDifference = Math.round(secondDifference / 60)
        let hourDifference = Math.round(minuteDifference / 60)
        let dayDifference = Math.floor(hourDifference / 24)
        //console.log(dayDifference + " " + hourDifference + " " + minuteDifference + " " + secondDifference)
        if(dayDifference >= 2) return `${dayDifference} days ago`
        else if(dayDifference === 1) return  `${dayDifference} day ago`
        else if(hourDifference > 1) return `${hourDifference} hours ago`
        else if(hourDifference === 1) return `${hourDifference} hour ago`
        else if(minuteDifference > 1) return `${minuteDifference} minutes ago`
        else if(minuteDifference === 1) return `${minuteDifference} minute ago`
        else {
            return `${secondDifference} seconds ago`
        }
        
    }

    getTypeOfGame() {
        switch(this.state.queueId) {
            case 0:
                return "Custom Game"
            case 430:
                return "Normal"
            case 420:
                return "Ranked Solo"
            case 440:
                return "Ranked Flex"
            case 450:
                return "ARAM"
            case 830:
            case 840:
            case 850:
                return "Co-op vs AI"
            case 460:
                return "TT Normal"
            case 470:
                return "TT Ranked Flex"
            case 800:
            case 810:
            case 820:
                return "TT vs Bots"
            case 900:
                return "URF"
            case 1020:
                return "One for All"
            case 1090:
                return "TFT Normal"
            case 1100:
                return "TFT Ranked"
            case 1110:
                return "TFT Tutorial"
            default:
                return "Not found"
        }
    }

    render() {
        if(this.state.gameDuration !== null && this.state.gameDuration !== undefined) {
            return (
                <div id="game-type-container">
                    <span>{this.getTypeOfGame()}</span>
                    <span>{this.getTimePlayed()}</span>
                    <div id="line-container"><hr></hr></div>
                    <span>{(this.state.WL === "win") ? "Win" : "Loss"}</span>
                    <span>{this.getTimeDuration()}</span>
                </div>
            )
        }
        return null
    }

}

export default GameType;