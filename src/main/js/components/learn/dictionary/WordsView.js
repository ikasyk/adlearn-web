import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import { AuthorizationV1, TextToSpeechV1 } from 'watson-developer-cloud';
import WatsonSpeech from "watson-speech/text-to-speech/synthesize";

class WordsView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

        const authorization = new AuthorizationV1({
            username: '955c43e1-ac0f-4cca-be4a-d8f3ac26ff31',
            password: 'RL6a0BdFqyzf',
            url: TextToSpeechV1.URL,
            // Access-Control-Allow-Origin
        });

        axios({
            method: 'get',
            url: 'https://stream.watsonplatform.net/authorization/api/v1/token',
            params: {
                url: authorization.url
            },
            headers: {
                'Authorization': 'Basic OTU1YzQzZTEtYWMwZi00Y2NhLWJlNGEtZDhmM2FjMjZmZjMxOlJMNmEwQmRGcXl6Zg==',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(r => {
            console.log(r);
        })

        /*authorization.getToken(function (err, token) {
            if (!token) {
                console.log('error:', err);
            } else {
                console.log(token);
            }
        });*/
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">Repeat the words below.</div>
                </div>
                <table className="learn-view-table">
                    {this.props.data.data.dictionary.entries.map((entry, i) =>
                        !this.props.learntId.has(entry.id.toString()) && <tr key={i}>
                            {entry.units.map((unit, j) => <td key={j}>{unit.content}</td>)}
                        </tr>
                    )}
                </table>
                <div className="learn-continue-wrap text-right">
                    <RaisedButton primary={true} label={'Continue ' + String.fromCharCode(187)} onClick={this.props.onContinue}/>
                </div>
            </div>
        )
    }
}

export {WordsView};