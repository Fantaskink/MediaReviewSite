import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useContext } from 'react'
import { AuthContext } from '../authcontext/AuthContext'

function NavigationBar() {
  const { isLoggedIn, userName } = useContext(AuthContext)

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Media Review App</Navbar.Brand>  
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/library">Library</Nav.Link>
          {!isLoggedIn && <Nav.Link href="/sign-in">Sign In</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/sign-up">Sign Up</Nav.Link>}
          {isLoggedIn && <Nav.Link href={`/member/${userName}`}>{userName}</Nav.Link>}
          <Nav.Link href='/members'>Members</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar