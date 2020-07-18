import React from 'react'
import Match from './Match'
import {v4 as uuidv4} from 'uuid'

class MatchList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            matchList: null,
            summonerName: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(state.matchList !== props.matchList && props.matchList != null) {
            return {
                matchList: props.matchList,
                summonerName: props.summonerName
            }
        }
        return null
    }

    

    render() {
        if(this.state.matchList !== null && this.state.matchList !== undefined) {
            return (
                <div className="matchList">
                    {this.state.matchList.map(match => {
                        return <Match key={uuidv4()} matchData={match} summonerName={this.state.summonerName}/>
                    })}
                </div>
            )
        }
        return null;
    }
}

export default MatchList;