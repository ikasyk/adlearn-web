import React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {connect} from "react-redux";

class TopNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navLinks = !this.props.auth.isLoggedIn ? (
            <Nav pullRight>
                <NavItem eventKey={1} href="/catalog" style={{display:'none'}}>Catalog</NavItem>
                <NavItem eventKey={2} href="/about-service" style={{display:'none'}}>About Service</NavItem>
                <NavItem eventKey={3} href="/sign-up">Sign Up</NavItem>
                <NavItem eventKey={4} href="/">Sign In</NavItem>
            </Nav>
        ) : (
            <Nav pullRight>
                <NavItem eventKey={1} href="/">{this.props.auth.data.username}</NavItem>
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