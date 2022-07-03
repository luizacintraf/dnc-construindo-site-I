import changeMode from './darkMode.js'
window.addEventListener("load",()=>{

    document.getElementById("darkModeBtn").addEventListener("click",()=>{
        changeMode()
    });


    document.getElementById("login").addEventListener("click",()=>{
        var email = document.getElementById("email").value
        var senha = document.getElementById("senha").value


        fetch("http://localhost:3000/login",
        {
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify({
                email:email,
                senha:senha
            })

        }
        ).then((response)=>{
            if(response.status == 400){
                response.text().then((response)=>{
                    alert(response)
                })
            }else{
                response.json().then((response)=>{
                    if(document.getElementById("reminder").checked){
                        localStorage.setItem("user", JSON.stringify(response))
                    }else{
                        sessionStorage.setItem("user",JSON.stringify(response))
                    }

                    location.href="/home.html"


                })
            }
        })

    })

})