import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_e1qgfs2";
const PUBLIC_KEY = "sGUfsaP3NQO-SZ3X4";
const TEMPLATE_ID = "template_umplymj";

export async function sendEmail(templateParams) {
  console.log(templateParams.content);
  return emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      { message: templateParams.content },
      PUBLIC_KEY
    )
    .catch((err) => {
      console.error("Can't send email!");
      console.error(err);
    });
}
