import React, { useContext } from 'react'
import "../componets/Home.css"
import { Link } from 'react-router-dom'
import notecontext from '../context/notes/noteContext'
export default function Home() {
          const context = useContext(notecontext);
          const{isLogin} = context;
  return (
          <div className="container mt-4 mb-3">
          <header>
            <h1>Capture Your Ideas, Anytime, Anywhere</h1>
            <p>Your personal digital notebook, where productivity meets creativity. Jot down your thoughts, plan your projects, and stay organized effortlessly.</p>
          </header>
          
          <main>
            <h2>Be Creative, Stay Focused</h2>
            <p>Start capturing your best ideas today and never lose track of what's important. Whether it's your next big project or a simple to-do list, we're here to help you stay on top of it all.</p>
            <Link to={isLogin===true?"/mynotes":"/login"} className="get-started-btn">Get Started Now</Link>
          </main>
        </div>
  )
}
