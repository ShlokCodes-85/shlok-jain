import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/admin-nav.css'

export default function AdminNav({ user }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="admin-nav">
      <div className="nav-brand">
        <h2>CMS Admin</h2>
      </div>
      <ul className="nav-menu">
        <li>
          <button
            className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
            onClick={() => navigate('/admin/dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${isActive('/admin/content') ? 'active' : ''}`}
            onClick={() => navigate('/admin/content')}
          >
            Manage Content
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${isActive('/admin/create') ? 'active' : ''}`}
            onClick={() => navigate('/admin/create')}
          >
            Create Content
          </button>
        </li>
      </ul>
      <div className="nav-user">
        {user && (
          <>
            <span className="user-info">
              {user.username} <small>({user.role})</small>
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
