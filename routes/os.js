const express = require("express");
const router = express.Router();
const os = require("os");

router.get("/", (req, res, next) => {
  try {
    let osInformations = {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
    };
    if (!osInformations) {
      throw new Error("os informations not found!");
    }
    res.status(200).json(osInformations);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/cpus", (req, res, next) => {
  try {
    let cpus = os.cpus();
    if (!cpus || cpus.length === 0) {
      throw new Error("cpus not found!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/cpus/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const cpus = os.cpus();
    if (!cpus || cpus.length === 0) {
      throw new Error("cpus not found!");
    }
    if (id < 0 || id > cpus.length - 1) {
      throw new Error("id must be valid!");
    }
    res.json(cpus[id]);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
