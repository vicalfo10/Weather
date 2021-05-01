'use strict'

try {
    const container = document.getElementById('container')
    const search = document.getElementById('search')
    const id_country = document.getElementById('id_country')
    const key = '9b20bcd80b5071f21cfdd55e4a824b72'
    const lang = 'en'
    const picture_api = 'http://openweathermap.org/img/wn/' //https://openweathermap.org/img/wn/02n.png
    const extension = '.png'
    var url_api = `https://api.openweathermap.org/data/2.5/weather?lang=${lang}&appid=${key}`

    search.addEventListener('click', function(){

        container.innerHTML = ''

        let temp_c = 0
        let temp_f = 0
        let temp_c_min = 0
        let temp_f_min = 0
        let temp_c_max = 0
        let temp_f_max = 0

        url_api += "&id=" + id_country.value

        weather()
        .then(data => data.json())
        .then(data => {
            if(data.cod >= 200 && data.cod < 300){

                temp_c = cal_temp(data.main.temp, "C")
                temp_c_min = cal_temp(data.main.temp_min, "C")
                temp_c_max = cal_temp(data.main.temp_max, "C")

                temp_f = cal_temp(data.main.temp, "F")
                temp_f_min = cal_temp(data.main.temp_min, "F")
                temp_f_max = cal_temp(data.main.temp_max, "F")

                container.innerHTML = `<div class="row">
                                            <div class="col-md-4 title_name">
                                                Weather for ${data.name} , ${data.sys.country}
                                            </div>
                                            <div class="col-md-4 title_name">
                                                ${data.weather[0].main} ${data.weather[0].description}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
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
                                            <div class="col-md-4">
                                                <img src="${picture_api + data.weather[0].icon + extension}" class="img-fluid icon_img" alt="">
                                                <br>
                                                Min: ${temp_c_min}°C / ${temp_f_min}°F
                                                <br>
                                                Max: ${temp_c_max}°C / ${temp_f_max}°F
                                            </div>
                                        </div>
                                        <div class="row">
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

function cal_temp(value_temp, string){
    
    let result = 0

    if(string == "F"){
        result = Math.round(((value_temp - 273.15) * 9/5) + 32)
    }else{
        result = Math.round(value_temp - 273.15)
    }

    return result
}

} catch (error) {
    swal({
        title: "Sorry",
        text: "Try error: " + error,
        icon: "error"
    })
}
