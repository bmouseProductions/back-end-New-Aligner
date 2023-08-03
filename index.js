const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

async function enviarEmailBackend(
  nome,
  email,
  telefone,
) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mktnewaligner@gmail.com',
        pass: 'dioiotyhzvsoufpe',
      },
    });

    let info = await transporter.sendMail({
      from: 'mktnewaligner@gmail.com',
      to: ["nathalia.capela@newaligner.com.br", "mktnewaligner@gmail.com"], 
      subject: 'Gostaria de saber mais informações sobre ser um credenciado New Aligner',
      html: `<p>Nome: ${nome}</p>
             <p>E-mail: ${email}</p>
             <p>Telefone: ${telefone}</p>`,
    });
    console.log('email send: %s', info.messageId);
  } catch (err) {
    console.error(err);
  }
}

app.post('/send', async (req, res) => {
  const { 
    nome, 
    email, 
    telefone,
  } = req.body; // Receba todos os campos do corpo da requisição

  try {
    await enviarEmailBackend(
      nome,
      email,
      telefone,
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ msg: 'Email send success' });
  } catch (error) {
    console.error('Error sending the email', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Error sending the email' });
  }
});

app.listen(3001, function() {
  console.log('Servidor rodando na porta 3001');
});



/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

async function enviarEmailBackend(
  nome,
  email,
  telefone,
) {
  try{
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mktnewaligner@gmail.com",
        pass: "Contasmouse23@"
      },
    });

    let info = await transporter.sendMail({
      from: "mktnewaligner@gmail.com",
      to: "matheustxr.profissional@gmail.com",
      subject: "Quero ser um credenciado New Aligner",
      html: `<p>Nome: ${nome}</p>
               <p>Telefone: ${telefone}</p>
               <p>E-mail: ${email}</p>` 
    })
    console.log("email send: %s", info.messageId)
  } catch(err) {
    console.error(err)
  }
}


app.post('/send', async (req, res) => {
  const { nome, email, telefone,  } = req.body;

  try {
    
    await enviarEmailBackend(
      nome,
      email,
      telefone,
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ msg: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar o email', error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Erro ao enviar o email' });
  }
});

app.listen(3001, function() {
  console.log('Servidor rodando na porta 3001');
}); */
