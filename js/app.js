// variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito =[]

cargarEvenListeners();
function cargarEvenListeners(){
    //cuando agrego un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina los cursos del carrito
    carrito.addEventListener('click', eliminarCurso)    

    //Vaaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el array
        limparHTML(); //Eliminamos todo el html
    }

    )
}


//  Funciones
function agregarCurso(e){
    e.preventDefault()
    if(
       e.target.classList.contains('agregar-carrito') ) {
       const cursoSeleccionado = e.target.parentElement.parentElement;    
       
    leerDatosCurso(cursoSeleccionado)
    }
}
//Elimina curso del carrito
function eliminarCurso(e) {
    //console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del array articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

       carritoHtml()// volvemos a iterar el html del carrito

    }
    
}



//Lee el contenido del html que le dimos click
function leerDatosCurso(curso) {
    

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revis si un elemento ya esta enm el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)


    if(existe){//actualizamso la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso //retorna objeto actualizado
            }else{
                return curso // retorna objeto que no estan duplicados
            }
        });

        articulosCarrito = [...cursos]
    }else{//agregamos curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

//agregar elementos al array de articulosCarrito
//articulosCarrito = [...articulosCarrito, infoCurso];

console.log(articulosCarrito)
carritoHtml();
}

//muestra el carrito de compras en el html

function carritoHtml() {

//limpiar html
limparHTML();
// recorre el carrito y genera html
    articulosCarrito.forEach(curso => {
        let {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100"></img>
        </td>

        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso"data-id="${id}">X</a></td>
        
        `
        //agreaga el html del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
    
}
//elimina los cursos del tbody
function limparHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

