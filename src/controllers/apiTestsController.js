import TestsService from "../services/testsService.js";

class ApiTestsController {
  constructor() {
    this.testsService = new TestsService();
  }

  getProductosTest = () => {
    try {
      return this.testsService.generateNMockProduct(5);
    } catch (error) {
      throw new Error(`Error al obtener productos mock: ${error}`);
    }
  };
}

export default ApiTestsController;
