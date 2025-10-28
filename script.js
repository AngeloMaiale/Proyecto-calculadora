const createMatricesButton = document.getElementById('CM');
const OperandoSuma = document.getElementById('Suma');
const OperandoResta = document.getElementById('Resta');
const OperandoMult = document.getElementById('Mult');
const OperandoMultEsc = document.getElementById('MultEsc');
const OperandoTransp = document.getElementById('Transp');
const OperandoDet = document.getElementById('Det');
const OperandoInversa = document.getElementById('Inv');
const OperandoIdentidad = document.getElementById('Ide');

createMatricesButton.addEventListener('click', () => {
  const tamano = parseInt(document.getElementById('tmatriz').value);
  const contenedorA = document.getElementById('contenedorMatrizA');
  const contenedorB = document.getElementById('contenedorMatrizB');
  const contenedorR = document.getElementById('contenedorMatrizR');

  if (tamano < 2 || tamano > 9) {
    alert("La matriz no puede ser menor a 2 ni mayor a 9");
    return;
  }

  contenedorA.innerHTML = '';
  contenedorB.innerHTML = '';
  contenedorR.innerHTML = '';
  contenedorA.style.gridTemplateColumns = `repeat(${tamano}, auto)`;
  contenedorB.style.gridTemplateColumns = `repeat(${tamano}, auto)`;
  contenedorR.style.gridTemplateColumns = `repeat(${tamano}, auto)`;

  for (let i = 0; i < tamano; i++) {
    for (let j = 0; j < tamano; j++) {
      const input1 = document.createElement('input');
      const input2 = document.createElement('input');
      const input3 = document.createElement('input');
      input1.type = 'number';
      input2.type = 'number';
      input3.type = 'number';
      input1.name = `Acelda_${i}_${j}`;
      input2.name = `Bcelda_${i}_${j}`;
      input3.name = `Rcelda_${i}_${j}`;
      input3.disabled = true;
      contenedorA.appendChild(input1);
      contenedorB.appendChild(input2);
      contenedorR.appendChild(input3);
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
  const det = determinante(A);
  if (det === 0) throw new Error("La matriz no tiene inversa");
  const adjunta = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const subMatriz = A
        .filter((_, r) => r !== i)
        .map(fila => fila.filter((_, c) => c !== j));
      const signo = ((i + j) % 2 === 0 ? 1 : -1);
      return signo * determinante(subMatriz);
    })
  );
  const transpuestaAdjunta = transponerMatriz(adjunta);
  return multiplicarPorEscalar(1 / det, transpuestaAdjunta);
}

function matrizIdentidad(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

OperandoSuma.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  const B = leerMatriz('B', n);
  mostrarResultado(sumarMatrices(A, B));
});

OperandoResta.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  const B = leerMatriz('B', n);
  mostrarResultado(restarMatrices(A, B));
});

OperandoMult.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  const B = leerMatriz('B', n);
  mostrarResultado(multiplicarMatrices(A, B));
});

OperandoMultEsc.addEventListener('click', () => {
  const escalar = parseFloat(prompt("Ingrese el escalar:"));
  if (isNaN(escalar)) return alert("Escalar inválido");
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  mostrarResultado(multiplicarPorEscalar(escalar, A));
});

OperandoTransp.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  mostrarResultado(transponerMatriz(A));
});

OperandoDet.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  const det = determinante(A);
  const contenedor = document.getElementById('contenedorMatrizR');
  contenedor.innerHTML = `<h3>Determinante: ${det.toFixed(4)}</h3>`;
});

OperandoInversa.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const A = leerMatriz('A', n);
  try {
    const inversa = matrizInversa(A);
    mostrarResultado(inversa);
  } catch (e) {
    alert(e.message);
  }
});

OperandoIdentidad.addEventListener('click', () => {
  const n = parseInt(document.getElementById('tmatriz').value);
  const identidad = matrizIdentidad(n);
  mostrarResultado(identidad);
});
