import { useState, useEffect } from 'react'
import personService from './services/personService'
import ShowContacts from './components/ShowContacts'
import AddPeople from './components/AddPeople'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [showAll, setShowAll] = useState(true)
  const [searchVal, setSearchVal] = useState('')
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const contactsToShow = showAll ? persons : persons.filter(person => person.name.indexOf(searchVal) >= 0)


  useEffect(() => {personService.getAll().then(response => 
    {
      console.log('promise fufilled')
      setPersons(response.data)
    })
  } , [])

  return (
    <div>
      <Notification message = {message} />
      <h2>Phonebook</h2>
      <Filter setShowAll = {setShowAll} setSearchVal = {setSearchVal} searchVal = {searchVal}/>
      <AddPeople persons = {persons} setPersons = {setPersons} newName = {newName} setNewName = {setNewName} newNumber = {newNumber} setNewNumber = {setNewNumber} setMessage = {setMessage}/>
      <ShowContacts contactsToShow = {contactsToShow} setPersons = {setPersons} persons = {persons} setMessage = {setMessage}/>
    </div>
  )
}

export default App