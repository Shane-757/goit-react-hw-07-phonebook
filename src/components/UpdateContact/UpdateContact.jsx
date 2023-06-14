import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { UpdateContact } from '../redux/actions/Actions'

const UpdateContactPage = () => {
  const { id } = useParams()
  const contacts = useSelector(state => state.userReducer.contacts)
  const contactToUpdate = contacts.find((contact) => contact.id === id)

  const [contact, setContact] = useState(contactToUpdate)

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch();

  const updateContactForm = (e) => {
    e.preventDefault()
    dispatch(UpdateContact(contact))
  }

  return (
    <>
      <form onSubmit={updateContactForm}>
            <input 
                type="text"
                name='name'
                value={contact.name}
                onChange={handleChange}
            />
            <button type="submit">Update</button>
        </form>
    </>
  )
}

export default UpdateContactPage