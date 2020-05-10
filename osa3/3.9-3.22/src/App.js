import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './styles/App.css';

const App = () => {
  const [ persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleFilterChange = e => setFilter(e.target.value);

  useEffect(() => {
    personService.getAll()
                  .then(people => {
                    setPersons(people)
                  })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    const personObj = { name: newName, number: newNumber};
    const foundPerson = persons.find(p => p.name === newName);
    if(foundPerson === undefined){
      personService.create(personObj)
                    .then(returnedPerson => {
                      setPersons(persons.concat(returnedPerson));
                      setMessage(`${newName} added to the phonebook!`);
                      setNewName('');
                      setNewNumber('');

                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)

                    })
                    .catch(error => {
                      // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
                      console.log(error.response.data)
                      setErrorMessage(`${error.response.data.error}`);
                      setTimeout(() => {
                        setErrorMessage(null)
                      }, 5000)
                    })
    }
    else{
      if(window.confirm(`${newName} already exists. Do you want to update his/her information?`)){
        personService.update(foundPerson.id, personObj)
                      .then(returnedPerson => {
                        console.log(returnedPerson);
                        setPersons(persons.map(p => {
                          return (p.name === newName ? personObj : p)
                        }));
                        setMessage(`${newName} info was updated!`);
                        setNewName('');
                        setNewNumber('');

                        setTimeout(() => {
                          setMessage(null)
                        }, 5000)

                      })
                      .catch(err => {
                        setErrorMessage(`This person was already removed from the server...`)
                        
                        setTimeout(() => {
                          setErrorMessage(null)
                        }, 5000)
  
                        setPersons(persons.filter(p => p.id !== foundPerson.id))
                      });
      }
    }
  }

  const handleDelete = id => {
    if(window.confirm("Do you really want to delete?")){
      personService.remove(id)
                    .then(returnedPeople => {
                      console.log(returnedPeople);
                      setPersons(returnedPeople);
                      setMessage(`Person deleted!`);

                      setTimeout(() => {
                        setMessage(null)
                      }, 5000)

                    })
                    .catch(err => {
                      setErrorMessage(`This person was already removed from the server...`)
                      
                      setTimeout(() => {
                        setErrorMessage(null)
                      }, 5000)

                      setPersons(persons.filter(p => p.id !== id))
                    });
    }
  }

  let phonebookFiltered = persons.filter(p => p.name.indexOf(filter) > -1);
  let phonebook = phonebookFiltered.map(p => <li key={p.name}>{p.name} {p.number}<button onClick={() => handleDelete(p.id)}>delete</button></li>);

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} handleFilterChange={handleFilterChange}/>

        {message === null ? <div></div> : <div className="success">{message}</div>}
        {errorMessage === null ? <div></div> : <div className="error">{errorMessage}</div>}

      <h2>Add a new</h2>
        <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
        <Persons phonebook={phonebook}/>
    </div>
  )

}

export default App
