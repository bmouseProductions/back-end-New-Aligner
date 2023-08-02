const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

async function enviarEmailBackend(nome, email, telefone) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'mktnewaligner@gmail.com', // Use variável de ambiente para o usuário do e-mail
        pass: 'Contasmouse23@' // Use variável de ambiente para a senha do e-mail
      },
    });

    let info = await transporter.sendMail({
      from: 'mktnewaligner@gmail.co', // Use o mesmo usuário do e-mail como remetente
      to: "matheustxr.profissional@gmail.com",
      subject: "Quero ser um credenciado New Aligner",
      html: `<p>Nome: ${nome}</p>
               <p>Telefone: ${telefone}</p>
               <p>E-mail: ${email}</p>` 
    })
    console.log("E-mail enviado: %s", info.messageId);
  } catch(err) {
    console.error('Erro ao enviar o e-mail', err);
    throw err;
  }
}

app.post('/send', async (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    // Realizar a validação dos dados aqui, se necessário

    await enviarEmailBackend(nome, email, telefone);

    res.setHeader('Access-Control-Allow-Origin', 'https://new-aligner.netlify.app/'); // Defina o domínio do seu site aqui
    res.status(200).json({ msg: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail', error);
    res.setHeader('Access-Control-Allow-Origin', 'https://new-aligner.netlify.app/'); // Defina o domínio do seu site aqui
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
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