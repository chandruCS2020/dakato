import React from 'react'
import Copyright from './Copyright'
import Form from './Form'
import Layout from './Layout'

export default function Home() {
  return (
    <>
        <Layout>
            <div className="home">
                  <h1>Welcome to <span className='dak'>Dakato    </span><span>{localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem("jwt")).username : "anonymous user"}</span></h1>
              </div>
        </Layout>
        <Copyright />
    </>
  )
}
