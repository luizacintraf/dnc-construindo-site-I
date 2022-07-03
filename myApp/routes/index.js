var express = require('express');
var router = express.Router();

var fs = require('fs');

var bcrypt = require("bcrypt")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/registros', function(req,res){
  var file = fs.readFileSync('database/register.json')

  var object = JSON.parse(file)

  res.send(object)


});



router.post('/salvarRegistros', (req, res)=>{

  const dados = req.body

  const email = dados.email
  const tel = dados.tel

  var file = fs.readFileSync('database/register.json')

  var object = JSON.parse(file)

  object.push({
    email:email,
    tel: tel
  })


  var string = JSON.stringify(object)

  fs.writeFileSync('database/register.json',string)

  res.send("Deu tudo certo!")



});

router.post('/salvarCadastro',(req,res)=>{

  const {nome, sobrenome, telefone, endereco, cep, senha, email } = req.body;

  const file = fs.readFileSync('database/cadastro.json')

  var object =JSON.parse(file);


  var emailExists = object.find(element =>  element.email == email)

  if(emailExists){

    return res.status(400).send("Email já existe!!!")

  }

  var senhaCrypto = bcrypt.hashSync(senha,8)

  object.push({

    nome: nome,
    sobrenome: sobrenome,
    telefone:telefone,
    endereco: endereco,
    cep:cep,
    senha:senhaCrypto,
    email:email

  })

  var string = JSON.stringify(object)

  fs.writeFileSync('database/cadastro.json',string)

  return res.send("Deu tudo certo!!")

  

});


router.post('/login',(req,res)=>{

  const {email, senha} = req.body


  const file = fs.readFileSync("database/cadastro.json");

  var object =JSON.parse(file);

  var user = object.find(element => element.email == email)

  console.log(user)

  if(!user){

    return res.status(400).send("Usuário não existe")

  }else if(!bcrypt.compareSync(senha,user.senha)){

    return res.status(400).send("Senha incorreta!")

  }else{

    return res.status(200).send(user)
  }


});

router.get('/eventos',(req,res)=>{


  var file = fs.readFileSync("database/events.json")

  var object = JSON.parse(file)

  return res.status(200).send(object)

})


module.exports = router;
