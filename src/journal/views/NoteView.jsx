import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {
  
  const {active: note, messageSave, isSaving} = useSelector(state => state.journal)

  const fileInputRef = useRef()
  
  const {body, title,date, onInputChange, formState} = useForm(note)

  const dateString = useMemo(() => {
      const newDate = new Date(date)

      return newDate.toUTCString()
  }, [date])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if(messageSave.length > 0) {
      Swal.fire('Nota actualizada', messageSave, 'success')
    }

  }, [messageSave])
  
  const onSaveNote = () => {
    dispatch(startSavingNote())
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return 

    dispatch(startUploadingFiles(target.files))
    console.log('subiendo archivos');
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input type='file' ref={fileInputRef} multiple onChange={onFileInputChange} style={{display: 'none'}}/>
        <IconButton
            color='primary' 
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
            >
            <UploadOutlined />
        </IconButton>
        <Button color='primary' disabled={isSaving} sx={{ padding: 2 }} onClick={onSaveNote} >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que fue lo que sucedio hoy...'
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={onDelete} sx={{mt: 2}} color='error'>
          <DeleteOutline/>
        </Button>
      </Grid>

      {/* galeria de imagenes */}

      <ImageGallery 
        images={note.imageURLs}
        />
    </Grid>
  );
};
