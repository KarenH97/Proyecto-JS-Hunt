class Tienda{
    constructor(id, categ, carac, precio, imagen){
       this.id = id,
       this.categ = categ,
       this.carac = carac,
       this.precio = precio,
       this.imagen = imagen
    }
   
 }
 
 const producto1 = new Tienda(1,"antiguedad", "Maquina de escribir", 15000, "maquina-escribir.jpg")

 const producto2 = new Tienda(2,"coleccionable", "Tren Antiguo", 6000,"tren.jpg")

 const producto3 = new Tienda(3,"joyas", "Prendedor de plata estilo colibrí", 20000,"joya1.jpg")

 const producto4 = new Tienda(4, "antiguedad", "Reloj de plata", 90000,"relojdeplata.jpg") 

 const producto5 = new Tienda(5, "coleccionable", "Modelora de cafe vintage", 8500,"moledordecafe.jpg") 

 const producto6 = new Tienda(6, "coleccionable", "Estatua bailarin de porcelana", 13000,"porcelana.jpg") 
//  Corregir ruta para que lea el json
// fetch("../js/class.json")
// .then((resp)=>resp.json())
// .then((dataProducto)=>{
//    console.log(dataProducto)
// })

let stock = []
    if(localStorage.getItem("stock")){

        for(let produc of JSON.parse(localStorage.getItem("stock"))){
              let producStorage = new Tienda (produc.id,produc.categ, produc.carac,produc.precio,produc.imagen)
           stock.push(producStorage)
         }

     }else{
     stock.push(producto1,producto2,producto3,producto4,producto5,producto6)
     localStorage.setItem("stock", JSON.stringify(stock))
  }

  let productosCarrito = JSON.parse(localStorage.getItem("carrito")) ?? []
  
