import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/contentlist.css'

export default function ContentList() {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    fetchContents()
  }, [filter])

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      let url = 'http://localhost:5000/api/content?limit=100'

      if (filter === 'published') {
        url += '&isPublished=true'
      } else if (filter === 'draft') {
        url += '&isPublished=false'
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setContents(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch contents:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setContents(contents.filter((item) => item._id !== id))
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const handlePublish = async (id, isPublished) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(
        `http://localhost:5000/api/content/${id}/publish`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        fetchContents()
      }
    } catch (err) {
      console.error('Failed to update:', err)
    }
  }

  return (
    <div className="content-list-container">
      <div className="list-header">
        <h2>Content Management</h2>
        <button
          onClick={() => navigate('/admin/create')}
          className="btn-primary"
        >
          + Create New
        </button>
      </div>

      <div className="filter-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({contents.length})
        </button>
        <button
          className={`tab ${filter === 'published' ? 'active' : ''}`}
          onClick={() => setFilter('published')}
        >
          Published ({contents.filter((c) => c.isPublished).length})
        </button>
        <button
          className={`tab ${filter === 'draft' ? 'active' : ''}`}
          onClick={() => setFilter('draft')}
        >
          Drafts ({contents.filter((c) => !c.isPublished).length})
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : contents.length === 0 ? (
        <p className="no-content">No content found</p>
      ) : (
        <div className="table-wrapper">
          <table className="content-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item) => (
                <tr key={item._id}>
                  <td className="title">{item.title}</td>
                  <td>
                    <span className={`category-badge ${item.category}`}>
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.isPublished ? 'published' : 'draft'
                      }`}
                    >
                      {item.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{item.views}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button
                      onClick={() => navigate(`/admin/edit/${item._id}`)}
                      className="btn-sm btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublish(item._id, item.isPublished)}
                      className={`btn-sm ${
                        item.isPublished ? 'btn-unpublish' : 'btn-publish'
                      }`}
                    >
                      {item.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn-sm btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
