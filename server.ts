import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Create transporter for Nodemailer
// Defaults to Gmail if using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g. "your_email@gmail.com"
    pass: process.env.EMAIL_PASS, // e.g. "abcd efgh ijkl mnop" (App Password)
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    const { name, email, phone, interests } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: "Vui lòng nhập tên và email hoặc số điện thoại." });
    }

    try {
      // 1. Send Email Notification
      if (email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: `"Chinh Phục Tiếng Anh" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Đăng ký thành công - Chào mừng bạn!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Chào ${name},</h2>
              <p>Cảm ơn bạn đã đăng ký tham gia hoặc nhận tin tức từ <strong>Chinh Phục Tiếng Anh</strong>.</p>
              <p>Chúng tôi sẽ gửi thêm các cập nhật, thông báo và tin tức mới nhất về các bài học, khoá học và giáo án cho bạn.</p>
              <br/>
              <p>Trân trọng,</p>
              <p><strong>Đội ngũ Chinh Phục Tiếng Anh</strong></p>
            </div>
          `,
        };
        await transporter.sendMail(mailOptions);
      }

      // 2. Send Zalo ZNS / Message
      // Note: This requires a Zalo Official Account (ZOA) Access Token and setup.
      if (phone && process.env.ZALO_ACCESS_TOKEN) {
        // Mock Zalo API Request. You have to adapt this to Zalo specs (ZNS or OA message)
        const zaloApiUrl = "https://openapi.zalo.me/v2.0/oa/message";
        const zaloToken = process.env.ZALO_ACCESS_TOKEN;
        
        await axios.post(
          zaloApiUrl,
          {
            recipient: { user_id: phone }, // Usually requires phone mapped to unverified user or user_id
            message: {
              text: `Chào ${name}, bạn đã đăng ký thành công trên Chinh Phục Tiếng Anh!`
            }
          },
          {
            headers: {
              "access_token": zaloToken,
              "Content-Type": "application/json"
            }
          }
        ).catch(err => {
          console.error("Lỗi gửi tin nhắn Zalo:", err.response?.data || err.message);
        });
      }

      res.status(200).json({ success: true, message: "Đăng ký và gửi thông báo thành công." });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: "Có lỗi xảy ra khi xử lý gửi thông báo." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
