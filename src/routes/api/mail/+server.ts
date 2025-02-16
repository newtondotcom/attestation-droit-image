import nodemailer from "nodemailer";
import { MAIL_HOST, MAIL_PORT, MAIL_SSL, MAIL_USER, MAIL_PWD,DISCORD_WEBHOOK } from '$env/static/private';

const url = "https://autorisation.droninside.fr/pdf?file=";

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: parseInt(MAIL_PORT),
  secure: (MAIL_SSL=="true") ? true : false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PWD,
  },
  tls: {
      rejectUnauthorized: false
  }
});

export async function POST({ request }: { request: Request }) {
  const body = await request.json();
  let user: attestation = body;
  try {
    await sendEmail(user);
    await sendWebhook(user);
    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500
    });
  }
}

async function sendEmail(user: attestation) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Signature électronique de l'attestation</title>
    </head>
    <body>
      <p>Bonjour ${user.nom},</p>
      <p>Merci d'avoir pris le temps de remplir le formulaire pour l'attestation. 📝 Merci de cliquer sur le lien suivant pour la signer électroniquement et tout sera bon ! 🖋️</p>
      <p><a href="${url}${user.file_name}">Signer l'attestation</a></p>
      <p>Des bisous,</p>
      <p>Robin de droninside.fr 🚁</p>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `"droninside.fr 📸" <${MAIL_USER}>`,
    to: user.email,
    subject: "Signature électronique de l'attestation",
    html: htmlContent,
  });

  console.log("Message sent: %s", info.messageId);
}

async function sendWebhook(user: attestation) {
  const data = {
    "content": `Nouvelle attestation ${user.nom}`,
    "username": "Autorisation `droninside.fr`"
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(`Webhook sent for ${user.nom}`);
  } catch (error) {
    console.error("Failed to send webhook:", error);
  }
}
