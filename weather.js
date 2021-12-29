window.addEventListener("load", ()=>{
    let long  
    let latit

    const temperaturaValor = document.querySelector(".temperatura")
    const ubicacion = document.querySelector(".ubicacion")
    const viento = document.querySelector(".viento")
    const descripcion = document.querySelector(".descripcion")
    const icono = document.querySelector(".icono")
    const contenedorTemperatura = document.querySelector(".contenedor_temp")


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( dondeEstoy =>{
            long = dondeEstoy.coords.longitude
            latit = dondeEstoy.coords.latitude
            

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${long}&appid=7c0d5316284d733d484c19fb692dbee3`

            fetch(url)
            .then(respuesta => {
                return respuesta.json()})
            .then(dato => {
                console.log(dato)
                temperaturaValor.innerHTML = "temperature: " + Math.round(dato.main.temp - 273.15) + " ºC"
                temperaturaValor.classList.add("celcius")
                ubicacion.innerHTML = "City: "  + dato.name
                viento.innerHTML = "Wind speed: " + dato.wind.speed + " m/s"
                descripcion.innerHTML = dato.weather[0].description 
                switch(dato.weather[0].main){
                    case "Clouds":
                        contenedorTemperatura.classList.add("nublado")
                        break;
                    case "Thunderstorm":
                        contenedorTemperatura.classList.add("tormenta")
                        break;
                    case "Mist":
                        contenedorTemperatura.classList.add("rocio")
                        break;
                    case "Snow":
                        contenedorTemperatura.classList.add("nieve")
                        break;  
                    case "Rain":
                        contenedorTemperatura.classList.add("lluvia")
                        break;         
                    case "Drizzle":
                        contenedorTemperatura.classList.add("llovizna")
                        break;    
                    case "Mist":
                        contenedorTemperatura.classList.add("neblina")
                        break;   
                    case "Clear":
                        contenedorTemperatura.classList.add("despejado")
                        break; 
                    default:
                        contenedorTemperatura.classList.add("despejado")
                }
                temperaturaValor.addEventListener("click",(e)=>{
                    if(e.target.classList.contains("celcius")){
                        temperaturaValor.classList.remove("celcius")
                        temperaturaValor.classList.add("farenheit")
                        temperaturaValor.innerHTML = "temperature: " + Math.round( Math.round(dato.main.temp - 273.15) * 9/5 + 32) + " ºF"
                    }else{
                        temperaturaValor.classList.remove("farenheit")
                        temperaturaValor.classList.add("celcius")
                        temperaturaValor.innerHTML = "temperature: " + Math.round(dato.main.temp - 273.15) + " ºC"
                    }
                   
                })
            })
            .catch(error => console.log(error))
        })
    }
})