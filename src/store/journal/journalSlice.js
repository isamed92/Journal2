import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    MessageSave: '',
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
    },

    setNotes: (state, action) => {
      state.notes = action.payload
    },

    setSaving: (state) => {
      state.isSaving = true
      //todo mensaje de error
    },

    noteUpdated: (state, action) => { //payload = note
      state.isSaving = false
      state.notes = state.notes.map(note => {
        if(note.id === action.payload.id){
          return action.payload
        }

        return note
      })
      //todo mostrar mensaje de actualziacion
    },

    deleteNoteById: (state, action) => {},
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
  deleteNoteById,
} = journalSlice.actions;
