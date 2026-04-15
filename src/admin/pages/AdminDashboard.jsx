import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import '../styles/dashboard.css'

export default function AdminDashboard({ children }) {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')

    if (!token || !userData) {
      navigate('/admin/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/content/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  return (
    <div className="admin-layout">
      <AdminNav user={user} />
      <div className="admin-main">
        <div className="admin-container">
          {!children && (
            <>
              <div className="dashboard-header">
                <h1>Welcome to CMS Admin</h1>
                <p>Manage your portfolio content here</p>
              </div>
              {stats && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Total Content</h3>
                    <p className="stat-number">{stats.totalContent}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Published</h3>
                    <p className="stat-number">{stats.publishedContent}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Drafts</h3>
                    <p className="stat-number">{stats.draftContent}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Views</h3>
                    <p className="stat-number">{stats.totalViews}</p>
                  </div>
                </div>
              )}
            </>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
