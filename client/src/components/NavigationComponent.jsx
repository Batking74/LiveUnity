import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

export const NavigationComponent = () => {
    const test = () => {
        console.log('complete!');
    }
    return (
        <nav>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/LiveVisitors">Real Time Chat App</NavbarBrand>
                <NavbarToggler onClick={test} />
                <Collapse isOpen={true} navbar>
                    <Nav className="m-lg-auto">
                        <NavItem>
                            <NavLink href="/RoomChat">Room Chat</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/LiveVisitors">Live Visitors</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/PublicChat">Public Chat</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </nav>
    );
}