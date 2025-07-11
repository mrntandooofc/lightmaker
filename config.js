const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: './uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
 console.log(req.file);
 res.send(`File uploaded: ${req.file.originalname}`);
});

app.listen(3000, () => {
 console.log('Server listening on port 3000');
});
