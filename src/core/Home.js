import React from 'react'
import Copyright from './Copyright'
import Form from './Form'
import Layout from './Layout'

export default function Home() {
  return (
    <>
        <Layout>
            <div className="home">
                  <h1>Welcome to Dakato {localStorage.getItem("name")}</h1>
              </div>
        </Layout>
        <Copyright />
    </>
  )
}
