import React, { Component } from 'react';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import User from './User';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        signout {
            message
        }
    }
`;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {

    }

    _handleKeyDown = (event) => {
        const key = event.keyCode;

        switch (key) {
            case 84:
                let tag1 = document.getElementById('thinking');
                tag1.className = "hover";
                this._timeout('/thinking');
                return;
        }
    }

    _toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div>
                {!currentUser ? (
                    <Navbar color="light" light expand="sm">
                        <NavbarBrand onKeyDown={this._handleKeyDown} href="/">
                            FocusLoop
                        </NavbarBrand>
                        <NavbarToggler className="custom-toggler" onClick={this._toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <div className="d-flex align-items-center fullscreen__dropdown" >
                                        <DropdownToggle nav caret>
                                            Login
                                    </DropdownToggle>
                                    </div>
                                    <DropdownMenu className={`${this.state.isOpen ? 'show' : ''}`} right>
                                        <Link href="/login">
                                            <DropdownItem>
                                                <a>Login</a>
                                            </DropdownItem>
                                        </Link>
                                        <Link href="/signup">
                                            <DropdownItem>
                                                <a>Register</a>
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                ) : (
                        <Navbar color="light" light expand="sm">
                            <NavbarBrand
                                href="/"
                                onKeyDown={this._handleKeyDown}
                            >
                                FocusLoop
                            </NavbarBrand>
                            <NavbarToggler className="custom-toggler" onClick={this._toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <div className="d-flex align-items-center fullscreen__dropdown" >
                                            <a style={{ fontSize: 15, cursor: 'default', color: '#243E5A' }}>Hello {currentUser.firstName}</a>
                                            <DropdownToggle nav>
                                                <FontAwesomeIcon size="lg" icon="user-circle"></FontAwesomeIcon>
                                            </DropdownToggle>
                                        </div>
                                        <DropdownMenu className={`animate slideIn ${this.state.isOpen ? 'show' : ''}`} right>
                                            <Link href="/post">
                                                <DropdownItem>
                                                    <a>Articles</a>
                                                </DropdownItem>
                                            </Link>
                                            <Link href="/profile">
                                                <DropdownItem>
                                                    <a>Profile</a>
                                                </DropdownItem>
                                            </Link>
                                            {currentUser.permissions[0] === 'ADMIN' && (
                                                <Link href="/users">
                                                    <DropdownItem>
                                                        <a>Users</a>
                                                    </DropdownItem>
                                                </Link>
                                            )}
                                            <DropdownItem divider />
                                            <Mutation
                                                mutation={SIGN_OUT_MUTATION}
                                                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                                            >
                                                {signout => {
                                                    return (
                                                        <DropdownItem onClick={async e => {
                                                            await signout();
                                                            Router.push('/');
                                                        }}>
                                                            <a>Logout</a>
                                                        </DropdownItem>
                                                    )
                                                }}
                                            </Mutation>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    )}
            </div>
        );
    }
}

export default Header;