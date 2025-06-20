import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'

const AdminDashboard = () => {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ title: '', description: '', image: null })
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const baseURL = import.meta.env.VITE_API_BASE_URL
  const token = localStorage.getItem('token')

  const fetchCourses = () => {
    axios
      .get(`${baseURL}/api/courses`)
      .then(res => setCourses(res.data))
      .catch(() => toast.error('Failed to fetch courses'))
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append('title', form.title)
    data.append('description', form.description)
    data.append('image', form.image)

    axios
      .post(`${baseURL}/api/courses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        toast.success('Course added successfully')
        setForm({ title: '', description: '', image: null })
        setPreview(null)
        fetchCourses()
      })
      .catch(() => toast.error('Something went wrong while adding the course'))
      .finally(() => setLoading(false))
  }

  const deleteCourse = id => {
    axios
      .delete(`${baseURL}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        toast('Item deleted successfully', {
          duration: 3000,
          style: {
            backgroundColor: '#f87171', // Tailwind red-400 for example
            color: '#fff'
          }
        })
        fetchCourses()
      })
      .catch(() => toast.error('Failed to delete course'))
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      <div className='w-full max-w-md shadow-xl rounded-2xl flex flex-col gap-5 p-5 bg-gray-50'>
        <div className="flex justify-between">
        <h2 className='text-2xl font-semibold pb-2 text-center'>
          Add New Item
        </h2>
        <Button onClick={()=>{
          localStorage.removeItem("token")
          window.location.href="/admin";
        }} className="cursor-pointer" > Logout </Button>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='w-full'>
            <Label htmlFor='title' className='text-base'>
              Title<span className='text-red-500'>*</span>
            </Label>
            <Input
              type='text'
              id='title'
              placeholder='Enter title'
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className='w-full'>
            <Label htmlFor='desc' className='text-base'>
              Enter description<span className='text-red-500'>*</span>
            </Label>
            <Textarea
              id='desc'
              placeholder='Enter description'
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className='w-full'>
            <Label htmlFor='picture' className='text-base'>
              Upload Image<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='picture'
              type='file'
              accept='image/*'
              onChange={e => {
                const file = e.target.files[0]
                if (file) {
                  setForm({ ...form, image: file })
                  setPreview(URL.createObjectURL(file))
                }
              }}
              required
            />
            {preview && (
              <img
                src={preview}
                alt='Preview'
                className='w-full mt-2 max-h-48 object-cover rounded-lg'
              />
            )}
          </div>

          <div className='w-full flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Adding...' : 'Add Item'}
            </Button>
          </div>
        </form>

        {courses.length > 0 && (
          <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-2'>Current Courses:</h3>
            <ul className='space-y-2'>
              {courses.map(course => (
                <li
                  key={course._id}
                  className='flex justify-between items-center bg-white p-2 rounded shadow-sm'
                >
                  <div>
                    <p className='font-medium'>{course.title}</p>
                    <p className='text-sm text-gray-500'>
                      {course.description}
                    </p>
                  </div>
                  <Button
                    variant='destructive'
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
