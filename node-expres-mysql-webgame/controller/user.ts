import express from "express";
import multer from "multer";
import path from "path";
import { conn } from "../dbconnect";

export const router = express.Router();

// 🔹 ตั้งค่า multer สำหรับเก็บรูปในโฟลเดอร์ "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // เช่น: 16965232123.jpg
  },
});

// 🛡 กรองไฟล์เฉพาะ JPEG / PNG
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), (req, res) => {
  const { username, email, password } = req.body;
  const image = req.file ? req.file.filename : null; // ถ้ามีรูป

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "กรอกข้อมูลไม่ครบ",
    });
  }

  const sql =
    "INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)";
  conn.query(sql, [username, email, password, image], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "บันทึกข้อมูลไม่สำเร็จ",
        error: err,
      });
    }

    return res.json({
      success: true,
      message: "สมัครสมาชิกสำเร็จ ✅",
      image: image,
      // role: role,
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "กรอกข้อมูลไม่ครบ" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  conn.query(sql, [email, password], (err, results: any) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res
        .status(500)
        .json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
    }

    if (results.length > 0) {
      const user = results[0];
      return res.json({
        success: true,
        message: "เข้าสู่ระบบสำเร็จ",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res.json({
        success: false,
        message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      });
    }
  });
});

router.get("/profile/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT id, username, email, image, role FROM users WHERE id = ?";
  conn.query(sql, [id], (err, results: any) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res
        .status(500)
        .json({ success: false, message: "ดึงข้อมูลไม่สำเร็จ" });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "ไม่พบผู้ใช้" });
    }

    return res.json({ success: true, data: results[0] });
  });
});

router.put("/profile/:id", (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;

  if (!username || !email) {
    return res
      .status(400)
      .json({ success: false, message: "กรอกข้อมูลไม่ครบ" });
  }

  const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  conn.query(sql, [username, email, id], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res
        .status(500)
        .json({ success: false, message: "อัปเดตไม่สำเร็จ" });
    }
    return res.json({ success: true, message: "อัปเดตข้อมูลสำเร็จ ✅" });
  });
});
