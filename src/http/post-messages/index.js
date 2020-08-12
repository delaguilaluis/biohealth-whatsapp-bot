const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
const arc = require("@architect/functions");

exports.handler = async function handler(request) {
  const body = arc.http.helpers.bodyParser(request);
  console.log(body);

  const message = await client.messages.create({
    from: "whatsapp:+14155238886",
    to: "whatsapp:+50255382629",
    body: "Hey, I just met you, and this is crazy...",
  });

  console.log(message.sid);

  return { statusCode: 200 };
};
