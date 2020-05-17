const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const fileFilter = (req, file, cb) => {};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 1 * 1000 * 1000,
    },
}).any();


module.exports = (req, res) => {
    console.log('][][][][][][');
    
    upload(req, res, err => {
        console.log(err);
        
        if (err) {
            res.send(err);
        } else {
            res.status(200).send({ success: true });
        }
    });
};
