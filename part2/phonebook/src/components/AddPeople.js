import personService from '../services/personService'

const AddPeople = (props) => {
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    props.setNewName(event.target.value)
  }  
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    props.setNewNumber(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { 
                        name: props.newName,
                        number: props.newNumber
                      }
    let val = true
    for (const person of props.persons) {
      if (person.name === newPerson.name) {
        console.log(newPerson.name)
        if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`))
        {
            personService.update(person.id, {...person, number :newPerson.number})
            props.setPersons(props.persons.map(person => person.name !== newPerson.name ? person : {...person, number :newPerson.number}))
            props.setMessage(`${newPerson.name} was updated`)
            setTimeout(
              () => {props.setMessage(null)}, 5000
            )
        }

        val = false
      }
    }

    if (val){
      let newList = props.persons.concat(newPerson)
      props.setPersons(newList)
      personService.create(newPerson)
      console.log(newList)
      props.setMessage(`${newPerson.name} was added`)
      setTimeout(
        () => {props.setMessage(null)}, 5000
        )
      }
  }

  return (
      <form onSubmit = {handleSubmit}>
        <h2>add a new contact</h2>
        <div>
          name: <input onChange = {handlePersonChange} />
        </div>
        <div>
          number: <input onChange = {handleNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}

export default AddPeople