import { createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// Fetch contacts from API
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch('https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts');
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch contacts');
  }
});

// Add a new contact
export const addContact = createAsyncThunk('contacts/addContact', async ({ name, number }) => {
  const newContact = { id: nanoid(), name, number };
  const response = await fetch('https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContact),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to add contact');
  }
});

// Delete a contact
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  const response = await fetch(`https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return id;
  } else {
    throw new Error('Failed to delete contact');
  }
});

// Update a contact
export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, name, number }) => {
  const updatedContact = { name, number };
  const response = await fetch(`https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContact),
  });
  if (response.ok) {
    return { id, ...await response.json() };
  } else {
    throw new Error('Failed to update contact');
  }
});

export const AddContact = createAsyncThunk('contacts/AddContact', async (user) => {
  const response = await fetch('https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to add contact');
  }
});

export const UpdateContact = createAsyncThunk('contacts/UpdateContact', async (user) => {
  const response = await fetch(`https://646796f0e99f0ba0a812b3b3.mockapi.io/contacts/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    return { id: user.id, ...await response.json() };
  } else {
    throw new Error('Failed to update contact');
  }
});