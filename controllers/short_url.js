const db = require("../models");
const ramdomString = require("../helpers/ramdomString");
const fs = require("fs");

const controller = {
  index(req, res) {
    return db.ShortUrl.findAll()
      .then((urls) => {
        res.send(urls);
      })
      .catch((err) => {
        console.log("There was an error querying urls", JSON.stringify(err));
        return res.send(err);
      });
  },

  create(req, res) {
    const { original } = req.body;
    console.log(original);

    if (original === undefined || original === null || original === "") {
      return res.status(400).send({
        error: "The record could not be saved",
      });
    }

    return db.ShortUrl.create({ original, short: ramdomString(6) })
      .then((url) => res.status(201).send(url))
      .catch((err) => {
        console.log(
          "There was an error creating the short link",
          JSON.stringify(err)
        );
        return res.status(400).send(err);
      });
  },

  masiveCreate(req, res) {
    const newData = req.body.map((e) => {
      return {
        original: e.original,
        short: ramdomString(6),
      };
    });

    return db.ShortUrl.bulkCreate(newData)
      .then((url) => res.status(201).send(url))
      .catch((err) => {
        console.log(
          "***There was an error creating the short link",
          JSON.stringify(contact)
        );
        return res.status(400).send(err);
      });
  },

  getOrginalURL(req, res) {
    const short = req.params.short;
    return db.ShortUrl.findOne({ where: { short } })
      .then((urls) => {
        res.redirect(urls.original);
      })
      .catch((err) => {
        console.log("There was an error querying urls", JSON.stringify(err));
        return res.status(400).send({
          message: "There was an error querying urls",
        });
      });
  },

  saveByFile(req, res) {
    console.log(req.file)
    fs.createReadStream("./public/" + req.file.filename).pipe(
      fs.createWriteStream("./public/" + req.file.originalname, (error) =>
        console.log(error)
      )
    );
    fs.unlink("./public/" + req.file.filename, (error) => console.log(error));

    const name = req.file.originalname

    fs.readFile("./public/" + name, "utf-8", (err, data) => {
      if (err) throw err;
      const array = data.toString().split("\n");
      for (i in array) {
        if(array[i] !== null) {
            const shortUrl = db.ShortUrl.build({original: array[i].split('\r')[0], short: ramdomString(6)})
            shortUrl.save()
        }
      }
    });

    return res.status(201).send({
        success: 'Records created successfully'
    })
  },
};

module.exports = controller;
