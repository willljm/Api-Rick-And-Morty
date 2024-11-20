

let peticion = fetch("https://rickandmortyapi.com/api/character");
peticion.then((resp)=> resp.json())
.then((data) => {
    let  {results} = data
    console.log (results)
    for (let index = 0; index < results.length; index++) {
        let personaje = results [index]
        let titulo = document.createElement("h1")
        let card = document.createElement("div")
        let imagen = document.createElement("img")
        let estatus = document.createElement("p")
        let especie = document.createElement("p")
        let genero = document.createElement("p")
        let ubicacion = document.createElement("p")
        let origen = document.createElement("p")
        let ultima = document.createElement("p")
        let ultimaview = document.createElement("p")
        let ultimaview2 = document.createElement("p")
        let ultimaview3 = document.createElement("p")

        card.appendChild(estatus)
        card.appendChild(titulo)
        card.appendChild(imagen)
        card.appendChild(especie)
        card.appendChild(genero)
        card.appendChild(ubicacion)
        card.appendChild(origen)
        card.appendChild(ultima)
        card.appendChild(ultimaview)
        card.appendChild(ultimaview2)
        card.appendChild(ultimaview3)


        card.classList = "carta"
        titulo.classList = "titulo-nombre"
        estatus.classList = "estatus"

        especie.classList = "especie"
        genero.classList = "genero"
        ubicacion.classList = "ubicacion"
        origen.classList = "origen"
        ultima.classList = "ultima"


        imagen.src = personaje.image
        titulo.textContent = personaje.name
        estatus.textContent = personaje.status
        especie.textContent = personaje.species
        genero.textContent = personaje.gender
        ubicacion.textContent = personaje.location.name
        origen.textContent = personaje.origin.name


        document.body.appendChild(card)
        document.body.appendChild(titulo)        
        document.body.appendChild(especie)      
        document.body.appendChild(genero)      
        document.body.appendChild(ubicacion)      
        document.body.appendChild(origen) 
        document.body.appendChild(estatus) 

    }
})






   
