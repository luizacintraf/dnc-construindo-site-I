import changeMode from "./darkMode.js"

if(localStorage.getItem('user') || sessionStorage.getItem('user')){
    var user =  localStorage.getItem('user') ?  localStorage.getItem('user') : sessionStorage.getItem('user')
    user = JSON.parse(user)

    document.getElementById("nomePessoa").innerHTML = user.nome

}else{
    location.href = "/login.html" 
}

var events

fetch('https://empresabatatinha.herokuapp.com/eventos',{
    method:"GET",
    headers:{"Content-Type": "Application/json"}
}).then(response => {
    response.json().then(json => {
        events = json

        var sortedData = events.sort(function(a,b){
           return new Date(b.data) - new Date(a.data) 
        });


        document.getElementById("cidade").innerHTML = sortedData[0].cidade
        document.getElementById("data").innerHTML = sortedData[0].data
    

        filterParams()
        
    })
})


window.addEventListener("load",()=>{

    document.getElementById("darkModeBtn").addEventListener("click",()=>{
        changeMode()
    });

    document.getElementById("user").addEventListener("click",()=>{

        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        location.href="/login.html"
    })

})

const filterParams = () => {

    const search = location.search;

    const query = new URLSearchParams(search)

    const filter = query.get("search")

    const eventFilter = events.filter(element => element.cidade.toLowerCase().indexOf(filter.toLowerCase()) > -1 || element.data.toLowerCase().indexOf(filter.toLowerCase()) > -1)


    const eventMap = eventFilter.map(element=> element.cidade + " - " +element.data);

    const joinEvent = eventMap.join("\n")
    
    alert(joinEvent)

}

