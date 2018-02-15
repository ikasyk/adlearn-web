import React from "react";
import Dialog from "material-ui/Dialog";

import axios from "axios";
import {connect} from "react-redux";
import TextField from "material-ui/TextField";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FlatButton from 'material-ui/FlatButton';

const initialState = {requested: false, dataUpdated: [], dataInserted: [], size: 2, name: ""};

class LearnDataManageDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.id > 0) {
            this.setState({
                requested: true
            });
            axios({
                method: 'post',
                url: '/api/data/' + newProps.id,
                headers: {'Authorization': 'Bearer ' + this.props.auth.accessToken}
            }).then(response => {
                const resp = response.data;
                if (resp) {
                    this.setState({
                        requested: false,
                        dataUpdated: resp.data.dictionary.entries,
                        size: resp.data.dictionary.size,
                        name: resp.name
                    });
                }
            });
        } else {
            this.setState(initialState);
        }
    }

    handleCancel() {
        this.props.onClose();
    }

    handleSubmit() {
        console.log("ALL OK");
        this.props.onClose();
    }

    render() {
        const handleCancel = this.handleCancel.bind(this);
        const handleSubmit = this.handleSubmit.bind(this);

        const updatedRows = (
            <TableBody>
                {this.state.dataUpdated.map((entry, i) =>
                    <TableRow key={i}>
                        {entry.units.map((unit, j) =>
                            <TableRowColumn key={j}>{unit.content}</TableRowColumn>
                        )}
                    </TableRow>
                )}
            </TableBody>
        );

        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={handleCancel}/>,
            <FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={handleSubmit} />
        ];

        return (
            <Dialog open={!this.state.requested && this.props.open}
                    autoScrollBodyContent={true}
                    actions={actions}>
                <form onSubmit={this.handleSubmit}>
                    <TextField hintText="Package Name" name="name" defaultValue={this.state.name}/>

                    <Table multiSelectable={true}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn colSpan={this.state.size}>Updated Words</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableHeader>
                            <TableRow>
                                {[...Array(this.state.size).keys()].map(i =>
                                    <TableHeaderColumn>Column {i + 1}</TableHeaderColumn>)}
                            </TableRow>
                        </TableHeader>

                        {updatedRows}
                    </Table>
                </form>
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    const {authentication} = state;
    return {
        auth: authentication
    };
}

const mappedLearnDataManageDialog = connect(mapStateToProps)(LearnDataManageDialog);

export {mappedLearnDataManageDialog as LearnDataManageDialog};