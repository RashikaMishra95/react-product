import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

 class Header extends React.Component {
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/"><p style={{color:'white'}}>React App</p></NavbarBrand>
                </Navbar>
            </div>
        );
    }
}
export default Header;