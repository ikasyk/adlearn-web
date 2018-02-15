import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import { FullPages } from './learn';

class LearnPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {found: false, learnData: {}};
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/data/' + this.props.match.params.id,
            headers: {'Authorization': 'Bearer ' + this.props.auth.accessToken}
        }).then(response => {
            const data = response.data;
            if (data) {
                this.setState({found: true, learnData: data});
            } else {
                this.setState({found: false, learnData: {}})
            }
        });
    }

    render() {
        if (this.state.found) {
            const TagName = FullPages[this.state.learnData.data.type.packageName];
            return (
                <TagName data={this.state.learnData} />
            )

        } else {
            return (
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">Learn data not found</h3>
                    </div>
                    <div className="panel-body">Learning data with id <b>{this.props.match.params.id}</b> is not found.</div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const {authentication} = state;
    return {
        auth: authentication
    };
}

const mappedLearnPage = connect(mapStateToProps)(LearnPage);

export {mappedLearnPage as LearnPage};