import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);
  const handleFilterChange = e => setFilter(e.target.value);

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data);
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    if(persons.find(p => p.name === newName) === undefined){
      const personObj = { name: newName, number: newNumber};
      setPersons(persons.concat(personObj));
      setNewName('');
      setNewNumber('');
    }
    else{
      alert(`${newName} is in the phonebook already!`);
    }
  }

  let phonebookFiltered = persons.filter(p => p.name.indexOf(filter) > -1);
  let phonebook = phonebookFiltered.map(p => <li key={p.name}>{p.name} {p.number}</li>);

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
        <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
        <Persons phonebook={phonebook}/>
    </div>
  )

}

export default App
