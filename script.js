let tamanoActualA = null;
let tamanoActualB = null;
const createMatricesButton = document.getElementById('CMA');
const createMatrizBButton = document.getElementById('CMB')
const ejemploButton = document.getElementById('Ejemplo');
const OperandoSuma = document.getElementById('Suma');
const OperandoResta = document.getElementById('Resta');
const OperandoMult = document.getElementById('Mult');
const OperandoMultEsc = document.getElementById('MultEsc');
const OperandoTransp = document.getElementById('Transp');
const OperandoDet = document.getElementById('Det');
const OperandoInversa = document.getElementById('Inv');
const OperandoIdentidad = document.getElementById('Ide');

createMatricesButton.addEventListener('click', () => {
  const tamano = parseInt(document.getElementById('tmatrizAR').value);
  const contenedorA = document.getElementById('contenedorMatrizA');
  const contenedorR = document.getElementById('contenedorMatrizR');

  tamanoActualA=tamano;

  if (tamano < 2 || tamano > 10) {
    alert("La matriz no puede ser menor a 2 ni mayor a 9");
    return;
  }

  contenedorA.innerHTML = '';
  contenedorR.innerHTML = '';
  contenedorA.style.gridTemplateColumns = `repeat(${tamano}, auto)`;
  contenedorR.style.gridTemplateColumns = `repeat(${tamano}, auto)`;

  for (let i = 0; i < tamano; i++) {
    for (let j = 0; j < tamano; j++) {
      const input1 = document.createElement('input');
      const input2 = document.createElement('input');
      input1.type = 'number';
      input2.type = 'number';
      input1.name = `Acelda_${i}_${j}`;
      input2.name = `Rcelda_${i}_${j}`;
      input2.disabled = true;
      contenedorA.appendChild(input1);
      contenedorR.appendChild(input2);
    }
  }
});

function verificarInversa(A, Ainv) {
  const n = A.length;
  const producto = multiplicarMatrices(A, Ainv);
  const identidad = matrizIdentidad(n);

  let esCorrecta = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const diferencia = Math.abs(producto[i][j] - identidad[i][j]);
      if (diferencia > 0.01) { 
        esCorrecta = false;
        break;
      }
    }
    if (!esCorrecta) break;
  }
  return esCorrecta;
}

createMatrizBButton.addEventListener('click', () => {
  const tamano = parseInt(document.getElementById('tmatrizB').value);
  const contenedorB = document.getElementById('contenedorMatrizB');

  tamanoActualB=tamano;

  if (tamano < 2 || tamano > 10) {
    alert("La matriz no puede ser menor a 2 ni mayor a 9");
    return;
  }

  contenedorB.innerHTML = '';
  contenedorB.style.gridTemplateColumns = `repeat(${tamano}, auto)`;

  for (let i = 0; i < tamano; i++) {
    for (let j = 0; j < tamano; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.name = `Bcelda_${i}_${j}`;
      contenedorB.appendChild(input);
    }
  }
});

ejemploButton.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatrizAR').value);
  if (isNaN(n) || n < 2 || n > 10) {
    alert("Primero selecciona un tamaño válido entre 2 y 10");
    return;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const valorA = Math.floor(Math.random() * 19) - 9;
      const valorB = Math.floor(Math.random() * 19) - 9;
      const inputA = document.getElementsByName(`Acelda_${i}_${j}`)[0];
      const inputB = document.getElementsByName(`Bcelda_${i}_${j}`)[0];
      if (inputA) inputA.value = valorA;
      if (inputB) inputB.value = valorB;
    }
  }
});

function leerMatriz(nombre, n) {
  const matriz = [];
  for (let i = 0; i < n; i++) {
    const fila = [];
    for (let j = 0; j < n; j++) {
      const input = document.getElementsByName(`${nombre}celda_${i}_${j}`)[0];
      const valor = parseFloat(input.value);
      fila.push(isNaN(valor) ? 0 : valor);
    }
    matriz.push(fila);
  }
  return matriz;
}

function mostrarResultado(matriz) {
  const contenedor = document.getElementById('contenedorMatrizR');
  contenedor.innerHTML = '';
  const n = matriz.length;
  contenedor.style.gridTemplateColumns = `repeat(${n}, auto)`;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.value = matriz[i][j].toFixed(2);
      input.disabled = true;
      contenedor.appendChild(input);
    }
  }
}

function sumarMatrices(A, B) {
  return A.map((fila, i) => fila.map((val, j) => val + B[i][j]));
}

function restarMatrices(A, B) {
  return A.map((fila, i) => fila.map((val, j) => val - B[i][j]));
}

function multiplicarMatrices(A, B) {
  const n = A.length;
  let resultado = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        resultado[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return resultado;
}

function multiplicarPorEscalar(k, A) {
  return A.map(fila => fila.map(val => k * val));
}

function transponerMatriz(A) {
  return A[0].map((_, j) => A.map(fila => fila[j]));
}

function determinante(A) {
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0]*A[1][1] - A[0][1]*A[1][0];
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatriz = A.slice(1).map(fila => fila.filter((_, j) => j !== i));
    det += ((i % 2 === 0 ? 1 : -1) * A[0][i] * determinante(subMatriz));
  }
  return det;
}

function matrizInversa(A) {
  const n = A.length;
  const I = matrizIdentidad(n);
  const M = A.map((fila, i) => fila.concat(I[i]));
  for (let i = 0; i < n; i++) {
    let pivote = M[i][i];
    if (pivote === 0) {
      let encontrado = false;
      for (let k = i + 1; k < n; k++) {
        if (M[k][i] !== 0) {
          [M[i], M[k]] = [M[k], M[i]];
          pivote = M[i][i];
          encontrado = true;
          break;
        }
      }
      if (!encontrado) throw new Error("La matriz no tiene inversa");
    }
    for (let j = 0; j < 2 * n; j++) {
      M[i][j] /= pivote;
    }
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = M[k][i];
        for (let j = 0; j < 2 * n; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }
  }
  const inversa = M.map(fila => fila.slice(n));
  return inversa;
}


function matrizIdentidad(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

OperandoSuma.addEventListener('click', () => {
  if (!tamanoActualA) {
    alert("Debe crear la matriz A primero");
    return;
  }
    if (!tamanoActualB) {
    alert("Debe crear la matriz B primero");
    return;
  }
  const n1 = tamanoActualA
  const n2 = tamanoActualB
  if (n1 != n2) {
    alert("La matrices deben ser del mismo tamaño");
    return;
  }
  const A = leerMatriz('A', n1);
  const B = leerMatriz('B', n1);
  mostrarResultado(sumarMatrices(A, B));
});

OperandoResta.addEventListener('click', () => {
    if (!tamanoActualA) {
    alert("Debe crear la matriz A primero");
    return;
  }
    if (!tamanoActualB) {
    alert("Debe crear la matriz B primero");
    return;
  }
  const n1 = tamanoActualA
  const n2 = tamanoActualB
  if (n1 != n2) {
    alert("La matrices deben ser del mismo tamaño");
    return;
  }
  const A = leerMatriz('A', n1);
  const B = leerMatriz('B', n1);
  const orden = document.getElementById('OrdenResta').value;
  if (orden == "AmenosB"){
  mostrarResultado(restarMatrices(A, B));}
  else{
    mostrarResultado(restarMatrices(B, A))
  }
});

OperandoMult.addEventListener('click', () => {
    if (!tamanoActualA) {
    alert("Debe crear la matriz A primero");
    return;
  }
    if (!tamanoActualB) {
    alert("Debe crear la matriz B primero");
    return;
  }
  const n1 = tamanoActualA
  const n2 = tamanoActualB
  if (n1 != n2) {
    alert("La matrices deben ser del mismo tamaño");
    return;
  }
  const A = leerMatriz('A', n1);
  const B = leerMatriz('B', n1);
  mostrarResultado(multiplicarMatrices(A, B));
});

OperandoMultEsc.addEventListener('click', () => {
  if (!tamanoActualA) {
    alert("Debe crear la matriz A primero");
    return;
  }
  const escalar = parseFloat(prompt("Ingrese el escalar:"));
  if (isNaN(escalar)) return alert("Escalar inválido");
  const n = parseInt(document.getElementById('tmatrizAR').value);
  const A = leerMatriz('A', n);
  mostrarResultado(multiplicarPorEscalar(escalar, A));
});

OperandoTransp.addEventListener('click', () => {
  if (!tamanoActualA) {
  alert("Debe crear la matriz A primero");
  return;
  }
  const n = tamanoActualA;
  const A = leerMatriz('A', n);
  mostrarResultado(transponerMatriz(A));
});

OperandoDet.addEventListener('click', () => {
  if (!tamanoActualA) {
  alert("Debe crear la matriz A primero");
  return;
  }
  const n = tamanoActualA;
  const A = leerMatriz('A', n);
  const det = determinante(A);
  const contenedor = document.getElementById('contenedorMatrizR');
  contenedor.innerHTML = `<h3>Determinante: ${det.toFixed(4)}</h3>`;
});

OperandoInversa.addEventListener('click', () => {
  if (!tamanoActualA) return alert("Debe crear la matriz A primero");
  const A = leerMatriz('A', tamanoActualA);
  try {
    const Ainv = matrizInversa(A);
    mostrarResultado(Ainv);

    const esValida = verificarInversa(A, Ainv);
    const mensaje = esValida
      ? "✅ Verificación: A × A⁻¹ ≈ I"
      : "⚠️ Verificación fallida: A × A⁻¹ ≠ I";

  const mensajeContenedor = document.getElementById('verificacionMensaje');
  mensajeContenedor.innerHTML = ''; 
  mensajeContenedor.textContent = mensaje;
  mensajeContenedor.style.marginTop = "10px";
  mensajeContenedor.style.fontWeight = "bold";
  mensajeContenedor.style.textAlign = "center";

  } catch (e) {
    alert(e.message);
  }
});
OperandoIdentidad.addEventListener('click', () => {
  if (!tamanoActualA) {
  alert("Debe crear la matriz A primero");
  return;
  }
  const n = tamanoActualA;
  const identidad = matrizIdentidad(n);
  mostrarResultado(identidad);
});
