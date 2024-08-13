import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MuiFileInput } from 'mui-file-input'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { MuiChipsInput } from 'mui-chips-input';
import { LoadingButton } from '@mui/lab';

const AddCompanyModal = ({ open, onClose }) => {
  const [value, setValue] = React.useState(null)

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const [chips, setChips] = React.useState([])

  const handleChangeChips = (newChips) => {
    setChips(newChips)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson);
          onClose();
        },
      }}
    >
      <DialogTitle>Nueva empresa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Añada la información correspondiente a la nueva empresa.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Nombre de la empresa"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Añada una descripción de la actividad de la empresa"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="cnae"
          name="cnae"
          label="Código CNAE"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="numEmployees"
          name="numEmployees"
          label="Número de empleados"
          type="number"
          fullWidth
          variant="standard"
        />
        <MuiChipsInput
          value={chips}
          margin="dense"
          onChange={handleChangeChips}
          fullWidth
          label={`Palabras clave`}
          variant="standard"
        />
        <input type='file' />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Cancel</Button>
        <Button variant='contained' type="submit">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCompanyModal;
