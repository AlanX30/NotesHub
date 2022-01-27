import React from 'react'
import MenuDown  from '../components/MenuDown'
import NotesList from '../components/NotesList' 
import Layout  from '../components/Layout'

const Home = () => {

    return (
        <Layout>
            <NotesList />
            <MenuDown />
        </Layout>
    )
}

export default Home
