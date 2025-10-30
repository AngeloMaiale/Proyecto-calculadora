Este proyecto consistió en el desarrollo de una aplicación web, la cual emula una calculadora de matrices cuadradas, de un rango de tamaño entre 2x2 y 10x10. 
Esta fue diseñada con el objetivo de crear una aplicación simple, interactiva pero sobre todo con varias funciones, como:

1. Suma de matrices (A + B)

2. Resta de matrices (A - B) y con posibilidad de (B - A)

3. Multiplicación de matrices (A × B)

4. Multiplicación por escalar (k × A)

5. Transposición de matriz (Aᵗ)

6. Determinante de matriz (det A) mediante Laplace

7. Inversa de matriz (A⁻¹) mediante Gauss-Jordan

8. Matriz identidad (Iₙ)

A su vez, posee la generacion de hasta tres matrices, A, B y R (esta ultima siempre es del tamaño de A). Tambien posee ciertos procesos de validación como que ambas 
matrices sean del mismo tamaño para suma, resta y multiplicación, que se hayan creado las matrices necesarias antes de realizar una operación, que la matriz como tal 
tenga una inversa, y hasta un proceso de comprobación de la transpuesta mediante AxA/-1=I.

El proceso es muy simple, la página te da la dice que indiques el tamaño de las matrices que vaya a utilizar, y al darle al boton de crear matrices, creara ya sea A y R o B,
luego se pueden hacer dos cosas, rellenar un mismo la matriz o matrices para realizar las operaciones deseadas, o autocompletar con el boton de generar ejemplo, que rellenará 
las casillas con numeros entre el -10 y el 10. Luego de eso solo queda darle a los botones que te indican la operación que se va a realizar con dichas matrices, y el resultado
aparecerá inmediatamente en la parte derecha de la página. Solo en el caso de la multiplicación mediante escalar va a aparecer un mensaje para indicar el escalar de la multiplicación
en si.

La estructura de este proyecto consiste en un archivo html llamado calculadora, un archivo css llamado style y archivo js llamado script.
