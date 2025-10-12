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

router.post("/addgame", upload.single("Gimage"), (req, res) => {
  const { Gname, Gprice, sold, category, detail } = req.body;
  const Gimage = req.file ? req.file.filename : null; // ถ้ามีรูป

  if (!Gname || !Gprice || !category || !detail) {
    return res.status(400).json({
      success: false,
      message: "กรอกข้อมูลไม่ครบ",
    });
  }

  const sql =
    "INSERT INTO games (Gname, Gimage, Gprice, sold, category, detail) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [Gname, Gimage, Gprice, sold, category, detail],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "เพิ่มเกมไม่สำเร็จ",
          error: err,
        });
      }

      return res.json({
        success: true,
        message: "เพิ่มเกมสำเร็จ ✅",
        Gimage: Gimage,
      });
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM games ORDER BY id DESC";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "ไม่สามารถดึงข้อมูลเกมได้",
        error: err,
      });
    }
    res.json(result);
  });
});
