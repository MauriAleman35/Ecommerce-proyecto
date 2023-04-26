//variables 
const listaCursos=document.querySelector('#lista-cursos');
const vaciarCarrito=document.querySelector('#vaciar-carrito');
const carrito=document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
let articulosCarrito=[];
cargarEvenListener();
function cargarEvenListener(){ //main
    //funcion para agregar el carrito 
    listaCursos.addEventListener('click',agregarcurso);

    carrito.addEventListener('click',eliminarCurso);

    vaciarCarrito.addEventListener('click',()=>{
        articulosCarrito=[];
        mostrarhtml();
    });


    
   
}
//funciones 
function agregarcurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const datoscurso=e.target.parentElement.parentElement;
        leerdatosCurso(datoscurso);
    }
    

    
}
 //leer los datos 
 function leerdatosCurso(curso){
        const infocurso={
            imagen:curso.querySelector('img').src,
            titulo:curso.querySelector('h4').textContent,
            precio:curso.querySelector('.precio span').textContent,
            cantidad:1,
            id:curso.querySelector('a').getAttribute('data-id')

            
        }

        //revisa si existe un elemento del carrito 
        const existe=articulosCarrito.some(curso => curso.id===infocurso.id);
        if(existe){
            const cursos= articulosCarrito.map(curso=>{
                if(curso.id===infocurso.id){
                    curso.cantidad++;
                    return curso;
                }else{
                    return curso;
                }
            })
            articulosCarrito=[...cursos];
        }else{
            articulosCarrito=[...articulosCarrito,infocurso];
        }
        
        mostrarhtml();
 }
//muestra el carrito de compras
function mostrarhtml(){
    limpiarHTML();
    
    articulosCarrito.forEach(curso=>{
        const row =document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}    
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
            </td>
        
        `;
        contenedorCarrito.appendChild(row);

    })
    
}

//limpiar html
function limpiarHTML(){
   //forma lenta 
    // contenedorCarrito.innerHTML="";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
//funcion de eliminar curso 

function eliminarCurso(e){
 
    if(e.target.classList.contains('borrar-curso')){
        const idcurso= e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(curso => curso.id !== idcurso);
        mostrarhtml();
    }
    
}
 
