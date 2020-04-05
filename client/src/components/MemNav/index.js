import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import memlogo from './memlogo.png';
import style from './style.module.css';


const SideNav = (props) => {
    return (
        <div className={style.Container}>
            <Nav className={style.sidenav} vertical>
                <img className={style.logoimg}
                    width="200px"
                    src={memlogo}
                    alt="logo" />
                <NavItem>
                    <NavLink className={style.navlink} onClick={this.toggleProfileVisibility}>Profile</NavLink>
                    <hr></hr>
                </NavItem>
                <NavItem className={style.navitem}>
                    <NavLink onClick={this.toggleClassesVisibility}>Classes</NavLink>
                    <hr></hr>
                </NavItem>
                <NavItem className={style.navitem}>
                    <NavLink href="" onClick={this.logout}>Sign Out</NavLink>
                    <hr></hr>
                </NavItem>
            </Nav>
        </div>
    );
}

export default SideNav;