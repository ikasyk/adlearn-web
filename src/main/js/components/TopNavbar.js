import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {connect} from "react-redux";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

const MENU_CHOICE = {
    LOGOUT: "LOGOUT"
}

class TopNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleItemSelect(event, child) {
        switch (child.props.value) {
            case MENU_CHOICE.LOGOUT:
                localStorage.removeItem('auth_token');
                location.href = '/';
                break;
        }
    }

    render() {
        const handleItemSelect = this.handleItemSelect.bind(this);

        const navLinks = !this.props.auth.isLoggedIn ? (
            <Nav pullRight>
                <NavItem eventKey={1} href="/sign-up">Sign Up</NavItem>
                <NavItem eventKey={2} href="/">Sign In</NavItem>
            </Nav>
        ) : (
            <Nav pullRight>
                <NavItem eventKey={1}>
                    <IconMenu iconButtonElement={<span>{this.props.auth.data.username}</span>}
                              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                              targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                              onItemClick={handleItemSelect}>
                        <MenuItem value={MENU_CHOICE.LOGOUT} primaryText="Sign Out"/>
                    </IconMenu>
                </NavItem>
            </Nav>);

        return (
            <Navbar className={this.props.transparent ? "navbar-transparent" : ""}>
                <Navbar.Header>
                    <Navbar.Brand>AdLearn</Navbar.Brand>
                </Navbar.Header>
                {navLinks}
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    const {authentication} = state;
    return {
        auth: authentication
    }
}

const mappedTopNavbar = connect(mapStateToProps)(TopNavbar);

export {mappedTopNavbar as TopNavbar};