import { Notify } from 'notiflix';
import { useEffect } from 'react';
import { useState } from 'react';
import { CreateContact } from './Forms/CreateContact';
import { Filter } from './Forms/Filter';
import { ContactList } from './List';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? initialContacts
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContactList = ({ name, number }) => {
    const isAlreadyExist = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (isAlreadyExist)
      return Notify.failure('Already exist in your phonebook!');

    const newContact = {
      id: name,
      name,
      number,
    };

    setContacts(prev => [newContact, ...prev]);
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const changeFilterValue = filter => {
    setFilter(filter);
  };

  const filterContacts = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const filteredContacts = filterContacts();
  return (
    <>
      <h1 className="mt-3 ms-3">Phonebook</h1>
      <CreateContact createContactList={createContactList} />

      <h2 className="ms-3">Contacts</h2>
      <Filter changeFilterValue={changeFilterValue} value={filter} />
      <ContactList
        contacts={contacts}
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      />
    </>
  );
};
