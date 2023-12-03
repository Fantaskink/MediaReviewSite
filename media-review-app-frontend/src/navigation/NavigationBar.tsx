import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Media Review App</Navbar.Brand>  
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/library">Library</Nav.Link>
          <Nav.Link href="/sign-in">Sign In</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar