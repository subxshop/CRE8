const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

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
    console.log("Incoming POST request to /submit");
    console.log("Received Text:", req.body.text);
    console.log("Received File:", req.file ? req.file.filename : "No file uploaded");

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }

    const filePath = `http://localhost:3000/uploads/${req.file.filename}`;
    console.log("Final Image Path:", filePath);

    const postData = { text: req.body.text, filePath };

    fs.readFile("discovery.json", (err, data) => {
        let posts = [];
        if (!err) {
            try {
                posts = JSON.parse(data);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
            }
        }

        posts.push(postData);
        fs.writeFile("discovery.json", JSON.stringify(posts, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing JSON:", writeErr);
                return res.status(500).json({ message: "Failed to save post" });
            }
            res.json({ message: "Post submitted!" });
        });
    });
});


app.get("/posts", (req, res) => {
    const discoveryFilePath = "discovery.json";

    if (!fs.existsSync(discoveryFilePath)) {
        return res.json([]);
    }

    fs.readFile(discoveryFilePath, (err, data) => {
        if (err) {
            console.error("Error reading discovery.json:", err);
            return res.status(500).json({ message: "Failed to load posts" });
        }
        res.json(JSON.parse(data));
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));