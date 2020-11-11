const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

// Verify Token
const verifyToken = require("./../middlewares/auth");

// Model
const Image = require("../models/Image");

// Upload
const upload = require("./../db/storage");

// Initialize gridfs stream for reading files form database
const url = "mongodb://pibzdev_rezapb:reza1996@pibz.dev:27017/pibzdev_wall";
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

// Fetch all files
// router.get("/", async (req, res) => {
//   try {
//     gfs.find().toArray((err, files) => {
//       if (!files || files.length === 0) {
//         return res.status(200).json({ msg: "No Files Available" });
//       }
//       files.map((file) => {
//         if (
//           file.contentType === "image/jpeg" ||
//           file.contentType === "image/png" ||
//           file.contentType === "image/svg+xml"
//         ) {
//           gfs.openDownloadStream(file._id).pipe(res);
//         } else {
//           console.log("Error");
//         }
//       });

//       // res.status(200).json(files);
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error!");
//   }
// });

// Fetch single file by name
router.get("/:filename", async (req, res) => {
  try {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({ msg: "No Files Available" });
      }
      if (
        files[0].contentType === "image/jpeg" ||
        files[0].contentType === "image/png" ||
        files[0].contentType === "image/svg+xml"
      ) {
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      } else {
        res.status(404).json({ msg: "not an image" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Upload Image
router.post(
  "/upload",
  [verifyToken, upload.single("file")],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // const img = await Image.findOne({ imageName: req.body.imageName });
      // if (img) {
      //   return res.status(400).json({ msg: "!فایلی با این نام وجود دارد" });
      // }
      const newImage = new Image({
        image: req.file.filename,
        imageName: req.body.imageName,
        imageDescription: req.body.imageDescription,
      });

      const image = await newImage.save();
      res.json(image);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

// Delete single Image by image name
router.post("/delete/:imageName", verifyToken, async (req, res) => {
  try {
    const image = gfs
      .find({ filename: req.params.imageName })
      .toArray((err, files) => {
        if (!files[0] || files.length === 0) {
          return res.status(200).json({ msg: "No such file available" });
        }
        gfs.delete(new mongoose.Types.ObjectId(files[0]._id)),
          (err, data) => {
            if (err) {
              return res.status(404).json({ msg: err });
            }
          };
      });
    res
      .status(200)
      .json({ msg: "File Deleted Succesfully!", severity: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
