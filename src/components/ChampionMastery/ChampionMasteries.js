import React from 'react'
import '../../assets/styles/ChampionMasteryData.css'
import ChampionMastery from './ChampionMastery'
import {v4 as uuidv4} from 'uuid'

class ChampionMasteries extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            championData: null,

        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.championData !== props.champData && props.champData != null) {
            return {
                championData: props.champData
            }
        }
        return null
    }

    render() {
        if(this.state.championData !== null && this.state.championData !== undefined) {
            //onsole.log(this.state.championData)
            return (
                <div className="userRanked cardStyling" id="champMasteries">
                    <div id="ranked-queue">Champion Masteries</div>
                    <div><i className="fa fa-trophy" id="trophyIcon"></i></div>
                    {this.state.championData.slice(0,3).map((champion, i)=> {
                        return <ChampionMastery key={uuidv4()} id={i} champData = {champion}/>
                    })}
                    <div className="rank-containers">
                        <div id="second-place">2</div>
                        <div id="first-place">1<i className="fa fa-star"></i></div>
                        <div id="third-place">3</div>
                    </div>
                </div>
            )
        }
        return null;
    }
}
export default ChampionMasteries;