document.addEventListener('DOMContentLoaded', () => {
  fetch('/registros')
    .then(res => res.json())
    .then(datos => {
      const tabla = document.getElementById('tabla-datos');
      datos.forEach(dato => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${dato.id}</td>
          <td>${dato.nombre}</td>
          <td>${dato.documento}</td>
          <td>${dato.correo}</td>
          <td>${dato.telefono}</td>
          <td>${dato.direccion}</td>
          <td>${dato.valor}</td>
          <td>${dato.concepto}</td>
        `;
        tabla.appendChild(fila);
      });
    })
    .catch(err => console.error('Error al obtener datos', err));
});