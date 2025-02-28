const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/submit", upload.single("file"), (req, res) => {
    const text = req.body.text || "";
    const filePath = req.file ? `uploads/${req.file.filename}` : null;

    const postData = { text, filePath };

    fs.readFile("discovery.json", (err, data) => {
        const posts = err ? [] : JSON.parse(data);
        posts.push(postData);
        fs.writeFile("discovery.json", JSON.stringify(posts, null, 2), () => {
            res.json({ message: "Post submitted!" });
        });
    });
});

app.get("/posts", (req, res) => {
    fs.readFile("discovery.json", (err, data) => {
        res.json(err ? [] : JSON.parse(data));
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));