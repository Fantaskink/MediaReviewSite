import { useEffect, useState } from 'react'
import { getMembers, getMemberCount } from './MembersAPI'
import { Link } from 'react-router-dom'
import './MembersPage.css'

interface Member {
    id: number
    username: string
    profile_picture_url: string
}

function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [memberCount, setMemberCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMemberCount()
      .then(count => {
        setMemberCount(count)
      })
      .catch(error => {
        console.error('Error getting member count:', error)
      })

    getMembers(pageNumber)
      .then(data => {
        setMembers(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching members:', error)
      })
  }, [pageNumber])

  

  return (
    <div>
      <h1>Members</h1>
      <p>There are {memberCount} members.</p>
      <p>Page {pageNumber} of {Math.ceil(memberCount / 20)}</p>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            <Link to={`/member/${member.username}`}>
              <div>
                <img className='member-profile-picture' src={member.profile_picture_url} alt={member.username} />
              </div>
              <span>{member.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MembersPage