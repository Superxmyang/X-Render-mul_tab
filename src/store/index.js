import FormStore from "./FormStore";
class Stores {
  constructor() {
      this.FormStore =FormStore;  //每次创建的状态在这里注入
  }
}

export default new Stores();