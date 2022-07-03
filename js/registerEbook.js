import darkMode from './darkMode.js'


window.addEventListener('load', () => {

    document.getElementById("darkModeBtn").addEventListener("click",()=>{

        darkMode()

    })

    document.getElementById("forms").addEventListener('submit', (e) => {

        e.preventDefault();

        const valEmail = document.querySelector("input[name=email]").value;
        const valTel = document.querySelector("input[name=tel]").value;

        const regex= new RegExp("([(]?\d{2,3}[)]?)?([-]?[\s])?[0-9]")


        if(valEmail.indexOf("@gmail.com") == -1 && valEmail.indexOf("@outlook.com") ==-1){

            alert("O email está incorreto!!")

        }else if(!regex.test(valTel) || (valTel.replace(/\D/g,"").length != 11 && valTel.replace(/\D/g,"").length != 12) ){

            alert("O telefone não está válido!!")
        
        }else{


       fetch('http://localhost:3000/salvarRegistros',
        {
            method:"POST",
            body:JSON.stringify(
                {
                    email: valEmail,
                    tel: valTel
                }),
            headers:{
                "Content-Type":"Application/json"
            }
        }
        ).then(()=>{
            location.href='/downloadEbook.html'
        })

    }

    })
})