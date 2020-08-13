const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
const arc = require("@architect/functions");

exports.handler = async function handler(request) {
  const body = arc.http.helpers.bodyParser(request);
  console.log(body);

  const input = body.Body.toUpperCase();

  let text;
  if (["HOLA", "AYUDA"].includes(input)) {
    text =
      "Gracias por comunicarte con BioHealth. Si deseas conocer nuestro catálogo de servicios y productos, puedes verlo en nuestro perfil ⬆️.\nSi deséas agendar una toma de muestra a domicilio, envía MUESTRA.\nSi deseas chatear con nosotros, envía CHAT.";
  } else if (input === "MUESTRA") {
    text =
      "Para agendar la toma de muestra necesitamos que llenes este formulario: https://www.biohealth.com.gt/formulario-muestra y nos lo envíes por acá o a nuestro correo info@biohealth.com.gt";
  } else if (input === "CHAT") {
    text =
      "Puedes iniciar tu conversación ahora y uno de nuestros agentes te contestará a la brevedad. Gracias por tu paciencia.";
  }

  if (text) {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: body.From,
      body: message,
    });

    console.log(message.sid);
  }

  return { statusCode: 200 };
};
