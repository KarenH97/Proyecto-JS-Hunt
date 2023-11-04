 let buscador = document.getElementById("buscador")
 let coincidenciasDiv = document.getElementById("coincidenciasDiv")
 let selectOrden = document.getElementById("selectOrden")
 let containerProductos = document.getElementById("productos") 
 let formCargarLibro = document.getElementById("formCargarLibro")
 let guardarProductoBtn = document.getElementById("guardarProductoBtn")
 let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
 let botonCarrito = document.getElementById("botonCarrito")
 let precioTotal = document.getElementById("precioTotal")
 let botonFinalizarCompra = document.getElementById(`botonFinalizarCompra`)




 
            //    FUNCIONES

function mostrarCatalogoDOM(array){
    containerProductos.innerHTML = ""
    for(let producto of array){
        let producNuevoDiv= document.createElement("div")
        producNuevoDiv.className = "col-12 col-md-6 col-lg-4 my-4"
        producNuevoDiv.innerHTML = `
            <div id="${producto.id}" class="card" style="width: 20rem;">
                    <img class="card-img-top img-fluid" style="height: 250px;"src="../assets/${producto.imagen}" alt="${producto.categ} ">
                    <div class="card-body">
                        <h4 class="card-title"></h4>
                        <p>${producto.carac}</p>
                        <p>${producto.categ}</p>
                        <p class="">Precio: ${producto.precio}</p>
                    <button id="comprar${producto.id}" class="btn btn-dark btn-outline-ligth">Agregar al carrito</button>
                    </div>
           </div>`
        containerProductos.append(producNuevoDiv)
        
        let comprarBtn = document.getElementById(`comprar${producto.id}`)

        comprarBtn.addEventListener("click", () => {
            agregarAlCarrito(producto)
        })
       
    }
    
}


function agregarAlCarrito(elemento){
  
    let productoAgregado = productosCarrito.find((producto) => producto.id == elemento.id)
    productoAgregado == undefined ?  
            (productosCarrito.push(elemento),
            
            localStorage.setItem("carrito", JSON.stringify(productosCarrito)),
            Toastify({
                text: `El producto ${elemento.carac} ha sido sumado al carrito`,
                duration: 3000,
                gravity: "top", 
                position: "right", 
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast()
              ) :
              Toastify({
                text: `El producto ${elemento.carac} ya existe en el carrito`,
                duration: 2500,
                gravity: "top", 
                position: "center", 
                style: {
                  background: "linear-gradient(to right, red, orange)",
                  color: "black",
                  fontWeight: "bold"
                },
             }).showToast()
            
}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach(
        (productoCarrito) => {
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="../assets/${productoCarrito.imagen}" alt="imagen">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.carac}</h4>
                        <p class="card-text">${productoCarrito.categ}</p>
                         <p class="card-text">$${productoCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
            `}
    )
    array.forEach(
        (productoCarrito) => {
           
            document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () =>{
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                let posicion = array.indexOf(productoCarrito)
                array.splice(posicion, 1)
                localStorage.setItem("carrito", JSON.stringify(array))
                calcularTotal(array) 
            })
        }
    )
    calcularTotal(array)    
}
function calcularTotal(array){
    
    const totalReduce = array.reduce(
        (acumulador, producto)=>
        {return acumulador + producto.precio},
        0
    )
    totalReduce > 0 ? precioTotal.innerHTML = `<strong> El total de su compra es: ${totalReduce}</strong>` : precioTotal.innerHTML = ` * No hay productos en el carrito` 
    return totalReduce
}

function agregarProducto(array){
    let categ = document.getElementById("categInput")
    let carac = document.getElementById("caracInput")
    let precio = document.getElementById("precioInput")

    const nuevoProducto = new Tienda(array.length+1,categ.value, carac.value, parseInt(precio.value), "IMG_20230807_133558.jpg")
    array.push(nuevoProducto)  
    categ.value =""
    carac.value =""
    precio.value =""    

    Swal.fire({
        title: `Has agregado un producto a la tienda`,
        text: `El producto ${nuevoProducto.carac} de ${nuevoProducto.categ} se ha sumado.`,
        imageUrl: `../assets/${nuevoProducto.imagen}`,
        imageHeight: 350,
        imageAlt: `${nuevoProducto.carac} de ${nuevoProducto.categ}`,
        showConfirmButton: false,
        timer: 2500
    })
     
    localStorage.setItem("stock", JSON.stringify(stock))
}

function finalizarCompra(array){

    let total = calcularTotal(array)
    Swal.fire({
        text: `Gracias por comprar en nuestra tienda, el valor total de su compra es $${total}`
    })
    
    productosCarrito = []
    localStorage.removeItem("carrito")
}


function ordenarMayorMenor(array){
    let arrayMayorMenor = array.concat()
     arrayMayorMenor.sort(
        (produc1,produc2) => produc2.precio - produc1.precio
    )
    mostrarCatalogoDOM(arrayMayorMenor)
}
function ordenarMenorMayor(array){
    let arrMenor = array.concat()
    arrMenor.sort(
        (p1, p2) => p1.precio - p2.precio
    )
    mostrarCatalogoDOM(arrMenor)
}


function buscarInfo(buscado,array){
    let coincidencias = array.filter(
        (producto) => {
           return producto.categ.toLowerCase().includes(buscado.toLowerCase()) || producto.carac.toLowerCase().includes(buscado.toLowerCase())
        }
    )
    coincidencias.length > 0 ? (
    mostrarCatalogoDOM(coincidencias), coincidenciasDiv.innerHTML ="") : (mostrarCatalogoDOM(array), coincidenciasDiv.innerHTML = `<h3>No hay coincidencias con su búsqueda, este es nuestro catálogo completo</h3>`)
}




                //    EVENTOS
              

selectOrden.addEventListener("change", () => {
    
    switch(selectOrden.value){
        case "1":
            console.log("hola")
            ordenarMayorMenor(stock)

        break
        case "2":
            console.log(selectOrden.value)
            ordenarMenorMayor(stock)
        break
        default:
            mostrarCatalogoDOM(stock)
        break

    }
})



buscador.addEventListener("input", () => {
    console.log(buscador.value)
    buscarInfo(buscador.value,stock)
})

guardarProductoBtn.addEventListener("click", () =>{
    
    agregarProducto(stock)
    mostrarCatalogoDOM(stock)
} )

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosCarrito)
})
botonFinalizarCompra.addEventListener("click", () =>{
    finalizarCompra(productosCarrito)
})

mostrarCatalogoDOM(stock)

