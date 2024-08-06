import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormQz from './components/form'
import Table from './components/table'

function App() {

  return (
    <div className='bg-red-50'>
      <FormQz/>
      <Table/>
    </div>
  )
}

export default App
