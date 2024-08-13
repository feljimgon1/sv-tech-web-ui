import React, { useState } from 'react'
import './profile.scss'
import { Button, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { name, surname, username, email, rol, active, companies } = user;

  const [activeSection, setActiveSection] = useState('companies-section');

  const renderCompanies = () => {
    if (companies.length !== 0) {
      return (
        <>
          <div className="add-company-button">
            <Button
              style={{ margin: '1em' }}
              color="primary"
              aria-label="Add a new company"
              title='Add a new company'>
              <AddBoxIcon fontSize='large' /> Add a new company
            </Button>
          </div>
          <div className='companies-list'>
            {companies.map((company, index) => {
              if (company.name === 'PlayaCanela Hotel') {
                return (<Card key={index} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={company.name}
                    height="140"
                    image={`https://corporate.senatorhr.com/wp-content/uploads/2018/04/Logo_Senator-Hotels-Resorts_Color-300x211.png`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Editar</Button>
                    <Button size="small" variant='contained'>Tablas</Button>
                  </CardActions>
                </Card>)
              }
              else {
                return <Card key={index} sx={{ maxWidth: 345 }}>
                  {company.logo ?
                    <CardMedia
                      component="img"
                      alt={company.name}
                      height="140"
                      image={`${company.logo}`}
                    /> :
                    <div style={{
                      height: '100px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <ImageNotSupportedIcon sx={{ fontSize: '3em' }} />
                    </div>}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Editar</Button>
                    <Button size="small" variant='contained'>Tablas</Button>
                  </CardActions>
                </Card>
              }
            })}
          </div>
        </>
      )
    } else {
      return (
        <div className='no-companies'>
          <div className="add-company-button">
            <IconButton
              color="primary"
              aria-label="Add a new company"
              title='Add a new company'>
              <AddBoxIcon fontSize='large' />
            </IconButton>
          </div>
          <div className="centered-text">
            <p>Oops, ¡cuanto vacío! ¡No tienes ninguna empresa!</p>
          </div>
        </div>
      )
    }
  }

  const handleChangeTarget = (section) => {
    setActiveSection(section);
  }

  return (
    <div className='profile-container'>
      <div className="sidebar">
        <div
          className={`sidebar-item ${activeSection === 'companies-section' ? 'active' : ''}`}
          onClick={() => handleChangeTarget('companies-section')}
        >
          Mis empresas
        </div>
        <div
          className={`sidebar-item ${activeSection === 'user-data-section' ? 'active' : ''}`}
          onClick={() => handleChangeTarget('user-data-section')}
        >
          Datos del usuario
        </div>
        {/* Add more sections here in the future */}
      </div>
      <div className="content">
        {activeSection === 'companies-section' && (
          <>
            {renderCompanies()}
          </>
        )}
        {activeSection === 'user-data-section' && (
          <div className="user-data" id='user-data-section'>
            <ul>
              <li>Nombre: {name}</li>
              <li>Apellidos: {surname}</li>
              <li>Nombre de usuario (por defecto, es la primera parte de su correo electrónico): {username}</li>
              <li>Email: {email}</li>
              <li>Rol: {rol}</li>
              <li>Active: {active ? 'Cuenta activa' : 'Cuenta inactiva'}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile;
