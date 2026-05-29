const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function sendToTelegram(data) {
  const text = `
Нова заявка з сайту Max Pro 🛠

Ім'я: ${data.name}
Email: ${data.email}
Телефон: ${data.phone}
Тип проєкту: ${data.projectType}
Опис: ${data.description}
`;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text,
    }),
  });
}

async function sendToGmail(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Нова заявка з сайту Max Pro",
    text: `
Нова заявка з сайту Max Pro

Ім'я: ${data.name}
Email: ${data.email}
Телефон: ${data.phone}
Тип проєкту: ${data.projectType}
Опис: ${data.description}
`,
  });
}

app.post("/api/renovation-request", async (req, res) => {
  try {
    const data = req.body;

    console.log("Дані з форми:", data);

    await sendToTelegram(data);
    await sendToGmail(data);

    res.status(200).json({
      success: true,
      message: "Дані отримано і відправлено",
    });
  } catch (error) {
    console.error("Помилка відправки:", error);

    res.status(500).json({
      success: false,
      message: "Помилка сервера",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});