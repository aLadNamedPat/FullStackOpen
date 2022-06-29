import personService from '../services/personService'

const ShowContacts = (props) => {
    const handleSubmit = (event) =>
    {
      event.preventDefault()
      console.log('submitted')
      const val = window.confirm(`Delete ${event.target.name}?`)
      if (val){
        props.setPersons(props.persons.filter(person => person.name !== event.target.name))
        console.log(props.persons)
        personService.remove(event.target.id)
        props.setMessage(`${event.target.name} was deleted`)
        setTimeout(
          () => {props.setMessage(null)}, 5000
        )
      }
      console.log(event.target.id)
    }

  return(
    <>
      <h2>Numbers</h2>
      {props.contactsToShow.map(person => 
                                        <form key = {person.name} onSubmit = {handleSubmit} id = {person.id} name = {person.name}>
                                            <p> {person.name} {person.number} <button type="submit">delete</button></p>
                                        </form>)}
    </>
  )
}

export default ShowContacts