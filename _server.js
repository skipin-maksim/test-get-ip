const express = require("express");
const { Router } = require("express");
const router = Router();
const cors = require("cors");
const requestIp = require("request-ip");

const PORT = process.env.PORT || 2000;

module.exports = class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleweres();
    this.initRoutes();
    this.initErrorHendler();
    this.startListering();
  }
  initServer() {
    this.server = express();
  }

  initMiddleweres() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(requestIp.mw());
  }

  initRoutes() {
    this.server.use("/", router.get("/", this.test));
  }

  async test(req, res, next) {
    try {
      const clientIp = requestIp.getClientIp(req);
      res.status(200).send({
        status: 200,
        clientIp,
      });

      console.log({
        status: 200,
        clientIp,
      });

      next();
    } catch (error) {
      next(error);
    }
  }

  initErrorHendler() {}
  startListering() {
    this.server.listen(PORT, () =>
      console.log("Server was started on port ->", PORT)
    );
  }
};
