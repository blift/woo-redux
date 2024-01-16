"use client"

import { useState, useEffect } from "react"

export default function ContactPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  
  return (
    <div className="container mx-auto pt-24">
      {users.map(user => (
        <div key={user.id} className="bg-gray-100 rounded-lg p-4 my-4">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
    </div>
  )
}