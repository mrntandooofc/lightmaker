const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: './uploads/' });

app.use(express.static(__dirname));

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (file) {
        res.json({ message: 'File uploaded successfully' });
    } else {
        res.status(400).json({ message: 'No file selected' });
    }
});

app.get('/get-files', (req, res) => {
    fs.readdir('./uploads/', (err, files) => {
        if (err) {
            res.status(500).json({ message: 'Error reading files' });
        } else {
            res.json(files);
        }
    });
});

app.delete('/delete-all-files', (req, res) => {
    fs.readdir('./uploads/', (err, files) => {
        if (err) {
            res.status(500).json({ message: 'Error reading files' });
        } else {
            files.forEach(file => {
                fs.unlink(path.join('./uploads/', file), err => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
            res.json({ message: 'All files deleted' });
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
