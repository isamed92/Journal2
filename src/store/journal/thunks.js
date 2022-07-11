import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload } from '../../helpers/fileUpload'
import { loadNotes } from '../../helpers/loadNotes'
import { addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from './journalSlice'

export const startNewNote = () => {
    return async (dispatch, getState)  => {

        dispatch(savingNewNote())

        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        if( !uid ) throw new Error('El Id del usuario no existe')


        const notes = await loadNotes(uid)


        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())
        const { uid } = getState().auth

        const {active: note} = getState().journal

        const noteToFirestore = {...note}

        delete noteToFirestore.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

        await setDoc(docRef, noteToFirestore, {merge: true})


        dispatch(noteUpdated(note))


    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch, getState) => {
        dispatch(setSaving())

        // await fileUpload(files[0])

        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosURLs = await Promise.all(fileUploadPromises)

        dispatch(setPhotosToActiveNote(photosURLs))

    }

}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth
        const {active: note } = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

        await deleteDoc(docRef)

        dispatch(deleteNoteById(note.id))

    }
}