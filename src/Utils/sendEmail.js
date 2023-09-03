import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_85aw4fv";
const PUBLIC_KEY = "GzM_la0JmiYbRCXe_";
const TEMPLATE_ID = "template_mpzsrqb";

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
