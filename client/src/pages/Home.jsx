import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [courses, setCourses] = useState([])

  const baseURL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    axios
      .get(`${baseURL}/api/courses`)
      .then(res => {
        setCourses(res.data)
      })
      .catch(err => {
        console.error('Failed to fetch courses: ', err)
      })
  }, [])

  return (
    <>
      <div className='grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {courses.map(course => (
          <Card
            key={course._id}
            className='hover:shadow-lg transition-shadow rounded-md'
          >
            <CardHeader className='p-0'>
              <img
                src={`${baseURL}/uploads/${course.image}`}
                alt={course.title}
                className='w-full h-48 object-cover rounded-t-md'
              />
            </CardHeader>
            <CardTitle className='text-lg font-semibold px-4 pt-4'>
              {course.title}
            </CardTitle>
            <CardContent className='text-sm text-muted-foreground px-4 pb-4'>
              {course.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Home
