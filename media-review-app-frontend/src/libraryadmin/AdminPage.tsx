import { Nav } from 'react-bootstrap'

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <button>
        <Nav.Link href="/admin/addbookpage">Add Book</Nav.Link>
      </button>
      <button>
        <Nav.Link href="/admin/addfilmpage">Add Film</Nav.Link>
      </button>
      
    </div>
  )  
}

export default AdminPage