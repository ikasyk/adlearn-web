import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {List, ListItem} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

import ActionViewColumn from "material-ui/svg-icons/action/view-column";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import {LearnDataManageDialog} from "./";
import {Link} from "react-router-dom";


class LearnDataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {learnData: [], editDialogOpen: false, editDataId: 0};
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/data',
            headers: {'Authorization': 'Bearer ' + this.props.auth.accessToken}
        }).then(response => {
            const {data} = response;

            this.setState({learnData: data});
        });
    }

    handleOpen(dataId) {
        this.setState({editDialogOpen: true, editDataId: dataId});
    }

    handleClose() {
        this.setState({editDialogOpen: false});
    }

    render() {
        const handleClose = this.handleClose.bind(this);

        const manageButton = (
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        );

        const items = this.state.learnData.map((ld, i) => {
            const manageMenu = (
                <IconMenu iconButtonElement={manageButton}>
                    <MenuItem onClick={() => this.handleOpen(ld.data.id)}>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </IconMenu>
            );

            return (
                    <ListItem key={i}
                              primaryText={ld.name}
                              secondaryText={ld.data.dictionary.entries.length + " words"}
                              leftIcon={<ActionViewColumn/>}
                              rightIconButton={manageMenu}
                              onClick={() => {location.href = '/learn/' + ld.data.id;}}/>);
        });

        return (<List>
                {items}
                <LearnDataManageDialog open={this.state.editDialogOpen} id={this.state.editDataId}
                                       onClose={handleClose}/>
            </List>
        );
    }
}

function mapStateToProps(state) {
    const {authentication} = state;
    return {
        auth: authentication
    };
}

const mappedDataList = connect(mapStateToProps)(LearnDataList);

export {mappedDataList as LearnDataList};