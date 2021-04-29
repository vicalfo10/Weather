'use strict'

try {
    const search = document.getElementById('search')
    const id_country = document.getElementById('id_country')
    const key = '9b20bcd80b5071f21cfdd55e4a824b72'
    const lang = 'es'
    const picture_api = 'http://openweathermap.org/img/wn/' //https://openweathermap.org/img/wn/02n.png
    const extension = 'png'
    var url_api = `https://api.openweathermap.org/data/2.5/weather?lang=${lang}&appid=${key}`

    search.addEventListener('click', function(){

        url_api += "&id=" + id_country.value

        weather()
        .then(data => data.json())
        .then(data => {
            if(data.cod >= 200 && data.cod < 300){
                console.log(url_api)
                console.log(data)
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
