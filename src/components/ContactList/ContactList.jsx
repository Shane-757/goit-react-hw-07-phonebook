import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, updateContact } from "Redux/Actions/phonebookActions";
import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const filter = useSelector((state) => state.phonebook.filter);
  const sort = useSelector((state) => state.phonebook.sort);
  const [updateContactId, setUpdateContactId] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [updateNumber, setUpdateNumber] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  let filteredContacts = contacts.filter((contact) =>
  (contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())) ||
  (contact.number && contact.number.includes(filter))
);

   if (sort === 'asc') {
    filteredContacts = filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'desc') {
    filteredContacts = filteredContacts.sort((a, b) => b.name.localeCompare(a.name));
  }

   const handleUpdateSubmit = (event) => {
    event.preventDefault();
    dispatch(updateContact({ id: updateContactId, name: updateName, number: updateNumber }));
    setUpdateContactId(null);
    setIsUpdating(false);
  };


  
  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'updateName') {
      setUpdateName(value);
    } else if (name === 'updateNumber') {
      setUpdateNumber(value);
    }
  };

   return (
    <div>
      {filteredContacts.length > 0 && (
        <h2 className={styles.contactTitle}>Contacts</h2>
      )}
      <ul>
        {filteredContacts.map((contact) => (
          <li className={styles.contactInfo} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteContact(contact.id))}
              disabled={isUpdating}  
            >
              Delete
            </button>
            <button
              className={styles.updateButton}
              onClick={() => {
                setUpdateContactId(contact.id);
                setUpdateName(contact.name);
                setUpdateNumber(contact.number);
                setIsUpdating(true);
              }}
              disabled={isUpdating}  
            >
              Update
            </button>
            {updateContactId === contact.id && (
              <form onSubmit={handleUpdateSubmit}>
                <input
                    type="text"
                    name="updateName"
                    value={updateName}
                    onChange={handleUpdateInputChange}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    name="updateNumber"
                    value={updateNumber}
                    onChange={handleUpdateInputChange}
                    className={styles.inputField}
                />
                <button type="submit" className={styles.submitUpdateButton}>Submit Update</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;