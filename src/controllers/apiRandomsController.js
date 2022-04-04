import RandomsService from "../services/randomsService.js";
import { logger } from "../logger/index.js";

const ACTIVE_RANDOMS_CHILD_PROCESS = true;

class ApiRandomsController {
  constructor() {
    this.randomsService = new RandomsService();
  }
  getRandoms = async (req, res) => {
    if (ACTIVE_RANDOMS_CHILD_PROCESS) {
      const { cant = 1e8 } = req.query;
      try {
        const result = await this.randomsService.getRandoms(cant);
        res.json(result);
      } catch (error) {
        res.status(error.status).json({ error: error.message });
      }
    } else {
      logger.warn(`API randoms no activa!`);
      res.json({ message: "API randoms no activa" });
    }
  };
}

export default ApiRandomsController;
