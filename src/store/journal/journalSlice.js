import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSave: '',
    notes: [],
    active: null,
    //    active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 12345,
    //     imageURLs: [], //     https://foto1.jpj ....
    //    }
  },
  reducers: {
    //todo lo que va los reducers deben ser sincronos, los reducers son funciones puras!!!
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSave = ''
    },

    setNotes: (state, action) => {
      state.notes = action.payload
    },

    setSaving: (state) => {
      state.isSaving = true
      state.messageSave = ''

      //todo mensaje de error
    },

    noteUpdated: (state, action) => { //? aqui el payload es una note
      state.isSaving = false
      state.notes = state.notes.map(note => {
        if(note.id === action.payload.id){
          return action.payload
        }
        state.messageSave = `${action.payload.title} actualizada correctamente`
        return note
      })
      //todo mostrar mensaje de actualizacion
    },

    setPhotosToActiveNote: (state, action) => { 
      state.active.imageURLs = [...state.active.imageURLs || [], ...action.payload]
      state.isSaving = false
    },
    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSave = '',
      state.notes = [],
      state.active = null
    },

    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions;
