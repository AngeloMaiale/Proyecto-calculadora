function crearMatriz() {
      const filas = parseInt(document.getElementById('filas').value);
      const columnas = parseInt(document.getElementById('columnas').value);
      const contenedor = document.getElementById('contenedorMatriz');

      if(filas<2||filas>9||columnas<2||columnas>9){
        alert("La matriz no puede ser menor a 2 ni mayor a 9")
        return
      }
      contenedor.innerHTML = '';
      contenedor.style.gridTemplateColumns = `repeat(${columnas}, auto)`;
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
          const input = document.createElement('input');
          input.type = 'number';
          input.name = `celda_${i}_${j}`;
          contenedor.appendChild(input);
        }
      }
    }