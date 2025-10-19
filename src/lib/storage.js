// User storage functions
export function getUsers() {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("crm_users")
  return users ? JSON.parse(users) : []
}

export function saveUsers(users) {
  if (typeof window === "undefined") return
  localStorage.setItem("crm_users", JSON.stringify(users))
}

export function registerUser(email, name, password) {
  const users = getUsers()
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    password,
    role: null,
    orgId: null,
    setupCompleted: false,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function loginUser(email, password) {
  const users = getUsers()
  return users.find((u) => u.email === email && u.password === password) || null
}

export function updateUser(userId, updates) {
  const users = getUsers()
  const updatedUsers = users.map((u) => (u.id === userId ? { ...u, ...updates } : u))
  saveUsers(updatedUsers)
  return updatedUsers.find((u) => u.id === userId)
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("crm_current_user")
  return user ? JSON.parse(user) : null
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("crm_current_user", JSON.stringify(user))
  } else {
    localStorage.removeItem("crm_current_user")
  }
}

// Organization storage functions
export function getOrganizations() {
  if (typeof window === "undefined") return []
  const orgs = localStorage.getItem("crm_organizations")
  return orgs ? JSON.parse(orgs) : []
}

export function saveOrganizations(orgs) {
  if (typeof window === "undefined") return
  localStorage.setItem("crm_organizations", JSON.stringify(orgs))
}

export function createOrganization(orgData) {
  const orgs = getOrganizations()
  const newOrg = {
    id: Date.now().toString(),
    ...orgData,
    managers: [],
    createdAt: new Date().toISOString(),
  }
  orgs.push(newOrg)
  saveOrganizations(orgs)
  return newOrg
}

export function getOrganizationByAdmin(adminId) {
  const orgs = getOrganizations()
  return orgs.find((org) => org.adminId === adminId) || null
}

export function getManagersByOrganization(orgId) {
  const orgs = getOrganizations()
  const org = orgs.find((o) => o.id === orgId)
  if (!org || !org.managers) return []
  const users = getUsers()
  return users.filter((u) => org.managers.includes(u.id))
}

export function addManagerToOrganization(orgId, managerId) {
  const orgs = getOrganizations()
  const updatedOrgs = orgs.map((org) =>
    org.id === orgId ? { ...org, managers: [...(org.managers || []), managerId] } : org,
  )
  saveOrganizations(updatedOrgs)
}

// Leads storage functions
export function getLeads() {
  if (typeof window === "undefined") return []
  const leads = localStorage.getItem("crm_leads")
  return leads ? JSON.parse(leads) : []
}

export function saveLeads(leads) {
  if (typeof window === "undefined") return
  localStorage.setItem("crm_leads", JSON.stringify(leads))
}

export function addLead(lead) {
  const leads = getLeads()
  const newLead = {
    ...lead,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  leads.push(newLead)
  saveLeads(leads)
  return newLead
}

export function updateLead(id, updates) {
  const leads = getLeads()
  const updatedLeads = leads.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
  saveLeads(updatedLeads)
}

export function deleteLead(id) {
  const leads = getLeads()
  const filteredLeads = leads.filter((lead) => lead.id !== id)
  saveLeads(filteredLeads)
}

// Contacts storage functions
export function getContacts() {
  if (typeof window === "undefined") return []
  const contacts = localStorage.getItem("crm_contacts")
  return contacts ? JSON.parse(contacts) : []
}

export function saveContacts(contacts) {
  if (typeof window === "undefined") return
  localStorage.setItem("crm_contacts", JSON.stringify(contacts))
}

export function addContact(contact) {
  const contacts = getContacts()
  const newContact = {
    ...contact,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  contacts.push(newContact)
  saveContacts(contacts)
  return newContact
}

export function updateContact(id, updates) {
  const contacts = getContacts()
  const updatedContacts = contacts.map((contact) => (contact.id === id ? { ...contact, ...updates } : contact))
  saveContacts(updatedContacts)
}

export function deleteContact(id) {
  const contacts = getContacts()
  const filteredContacts = contacts.filter((contact) => contact.id !== id)
  saveContacts(filteredContacts)
}

// Communication logs storage functions
export function getCommunicationLogs() {
  if (typeof window === "undefined") return []
  const logs = localStorage.getItem("crm_logs")
  return logs ? JSON.parse(logs) : []
}

export function saveCommunicationLogs(logs) {
  if (typeof window === "undefined") return
  localStorage.setItem("crm_logs", JSON.stringify(logs))
}

export function addCommunicationLog(log) {
  const logs = getCommunicationLogs()
  const newLog = {
    ...log,
    id: Date.now().toString(),
  }
  logs.push(newLog)
  saveCommunicationLogs(logs)
  return newLog
}

// Tasks storage functions
export function getTasks() {
  if (typeof window === "undefined") return []
  const tasks = localStorage.getItem("crm_tasks")
  return tasks ? JSON.parse(tasks) : []
}

export function saveTasks(tasks) {
  if (typeof window === "undefined") return
  localStorage.setItem("crm_tasks", JSON.stringify(tasks))
}

export function addTask(task) {
  const tasks = getTasks()
  const newTask = {
    ...task,
    id: Date.now().toString(),
  }
  tasks.push(newTask)
  saveTasks(tasks)
  return newTask
}

export function updateTask(id, updates) {
  const tasks = getTasks()
  const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
  saveTasks(updatedTasks)
}

export function deleteTask(id) {
  const tasks = getTasks()
  const filteredTasks = tasks.filter((task) => task.id !== id)
  saveTasks(filteredTasks)
}
