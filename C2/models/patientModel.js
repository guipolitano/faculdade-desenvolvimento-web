class Patient {
  constructor(name, address, illness, weight, height, cel) {
    this.name = name;
    this.address = address;
    this.illness = illness;
    this.weight = weight;
    this.height = height;
    this.cel = cel;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getAdress() {
    return this.adress;
  }
  setAdress(adress) {
    this.adress = adress;
  }

  getIllness() {
    return this.illness;
  }
  setIllness(illness) {
    this.illness = illness;
  }

  getWeight() {
    return this.weight;
  }
  setWeight(weight) {
    this.weight = weight;
  }

  getHeight() {
    return this.height;
  }

  setHeight(height) {
    this.height = height;
  }

  getCel() {
    return this.cel;
  }

  setCel(cel) {
    this.cel = cel;
  }

  createPatient(name, address, illness, weight, height, cel) {
    const patient = new Patient(name, address, illness, weight, height, cel);
    return patient;
  }
}
