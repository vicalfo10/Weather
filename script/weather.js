'use strict'

try {
    const container = document.getElementById('container')
    const search = document.getElementById('search')
    const id_country = document.getElementById('id_country')
    const key = '9b20bcd80b5071f21cfdd55e4a824b72'
    const lang = 'es'
    const picture_api = 'http://openweathermap.org/img/wn/' //https://openweathermap.org/img/wn/02n.png
    const extension = '.png'
    var url_api = `https://api.openweathermap.org/data/2.5/weather?lang=${lang}&appid=${key}`

    search.addEventListener('click', function(){

        container.innerHTML = ''

        let temp_k = 0
        let temp_c = 0
        let temp_f = 0

        url_api += "&id=" + id_country.value

        weather()
        .then(data => data.json())
        .then(data => {
            if(data.cod >= 200 && data.cod < 300){

                temp_k = Math.round(data.main.temp)
                temp_c = Math.round(data.main.temp - 273.15)
                temp_f = Math.round(((data.main.temp - 273.15) * 9/5) + 32)

                container.innerHTML = `<div class="row justify-content-md-center">
                                            <div class="col-md-auto title_name">
                                                ${data.name}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="img/pressure.png" class="img-fluid pressure_img" alt="">
                                                ${data.main.pressure}
                                                <br>
                                                <br>
                                                <img src="img/humidity.png" class="img-fluid humidity_img" alt="">
                                                ${data.main.humidity}
                                                <br>
                                                <br>
                                                <img src="img/speed.png" class="img-fluid speed_img" alt="">
                                                ${data.wind.speed} / ${data.wind.deg} °
                                            </div>
                                            <div class="col-md-6">
                                            <img src="${picture_api + data.weather[0].icon + extension}" class="img-fluid icon_img" alt="">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 col-lg-4">
                                                ${temp_k} 
                                                <img src="img/temp_k.png" class="img-fluid temp_img" alt="">
                                            </div>
                                            <div class="col-4 col-lg-4">
                                                ${temp_c}
                                                <img src="img/temp_c.png" class="img-fluid temp_img" alt="">
                                            </div>
                                            <div class="col-4 col-lg-4">
                                                ${temp_f}
                                                <img src="img/temp_F.png" class="img-fluid temp_img" alt="">
                                            </div>
                                        </div>`

                //console.log(temp_k + " - " + temp_c + " - " + temp_f)
            }else{
                swal({
                    title: "Warning",
                    text: "Problem: " + data.cod + " - " + data.message,
                    icon: "warning"
                })
            }
            
        }).catch(function(error){
            swal({
                title: "Sorry",
                text: "Problem: " + error,
                icon: "error"
            })
        })

    })

    async function weather(){
        return await fetch(url_api)
    }

} catch (error) {
    swal({
        title: "Sorry",
        text: "Try error: " + error,
        icon: "error"
    })
}
