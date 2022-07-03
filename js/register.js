import changeMode from './darkMode.js'
window.addEventListener("load",()=>{

    document.getElementById("darkModeBtn").addEventListener("click",()=>{
        changeMode()
    })

    document.getElementById("submit").addEventListener("click",()=>{

        var nome = document.querySelector("input[name=nome]").value
        var sobrenome = document.querySelector("input[name=sobrenome]").value
        var email = document.querySelector("input[name=email]").value
        var senha = document.querySelector("input[name=senha]").value
        var confirmar_senha = document.querySelector("input[name=confirmar_senha]").value
        var endereco = document.querySelector("input[name=endereco]").value
        var cep = document.querySelector("input[name=cep]").value
        var tel =document.querySelector("input[name=tel]").value

        var lowerCase = /[a-b]/d
        var upperCase = /[A-B]/d
        var number = /[0-9]/d

        var validCep = new RegExp("([-]?[\s]?[0-9])")

        const regex= new RegExp("([(]?\d{2,3}[)]?)?([-]?[\s])?[0-9]")

        if(nome.length == 0){
            alert("O nome é obrigatório!!")
        }else if(sobrenome.length ==0 ){
            alert("O sobrenome é obrigatório!!")
        }else if(email.length == 0 || email.indexOf("@") == -1){
            alert("Email incorreto!")
        }else if(senha.length == 0 || !senha.match(lowerCase) || !senha.match(upperCase) || !senha.match(number)){
            alert("A senha está incorreta: ela deve ter letras maiusculas, minusculas e numeros!")
        }else if( senha != confirmar_senha){
            alert("As senhas tem que ser iguais!")
        }else if(endereco.length ==0){
            alert("O endereço é obrigatório!")
        }else if(cep.replace(/\D/g, "").length !=8 || !validCep.test(cep) || cep.replace(/[0-9]/g,"").replace("-","").length > 0){
            alert("O Cep deve ter 8 números!")
        }else if(!regex.test(tel) || (tel.replace(/\D/g,"").length != 11 && tel.replace(/\D/g,"").length != 12 || tel.replace(/[0-9]/g,"").replace("-","").replace(")","").replace("(","").length > 0) ){
            alert("O telefone está errado!")
        }else{
            
            fetch("https://empresabatatinha.herokuapp.com/salvarCadastro",{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body: JSON.stringify({
                    email: email,
                    nome: nome,
                    sobrenome: sobrenome,
                    telefone: tel,
                    endereco: endereco,
                    cep:cep,
                    senha: senha
                })
            }).then(()=>{
                alert("Deu tudo certo!!")
            }).catch(err=>alert(err))           
 

        }



    })

})