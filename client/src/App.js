import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fromByteArray } from 'base64-js';

function App() {

  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    adjunto: null
  });

  const handleOnChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('apellido', datos.apellido);
    formData.append('adjunto', datos.adjunto);

    axios.post('http://localhost:8000/api/personas/', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/personas/')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const mostrarImagen = (adjunto) => {
    const base64String = fromByteArray(new Uint8Array(adjunto.data));
    return `data:image/png;base64,${base64String}`;
  }


  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datos.nombre} onChange={handleOnChange} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" name="apellido" value={datos.apellido} onChange={handleOnChange} />
        </div>
        <div>
          <label>Adjunto:</label>
          <input type="file" name="adjunto" onChange={handleOnChange} />
        </div>
        <button type="submit">Guardar</button>
      </form>

      <div>
        <h2>Lista de Personas</h2>
        <ul>
          {personas.map((persona) => (
            <li key={persona.id}>
              <p>Nombre: {persona.nombre}</p>
              <p>Apellido: {persona.apellido}</p>
              <img style={{width:"150px"}} src={mostrarImagen(persona.adjunto)} alt="Imagen adjunta" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
