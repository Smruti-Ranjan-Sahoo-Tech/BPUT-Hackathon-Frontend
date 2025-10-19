import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Leads from '../pages/Leads'
import Contacts from '../pages/Contacts'
import Communication from '../pages/Communication'
import Tasks from '../pages/Tasks'
import Analytics from '../pages/Analytics'
import Settings from '../pages/Settings'
import Demo from '../pages/demo'

const RouterHandler = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  )
}

export default RouterHandler