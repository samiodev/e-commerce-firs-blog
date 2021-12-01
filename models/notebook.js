const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Notebook {
  constructor(title, price, img, descr) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.descr = descr;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      descr: this.descr,
      id: this.id,
    };
  }

  static async update(notebook) {
    const notebooks = await Notebook.getAll();

    const idx = notebooks.findIndex((c) => c.id === notebook.id);
    notebooks[idx] = notebook;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async save() {
    const notebooks = await Notebook.getAll();
    notebooks.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const notebooks = await Notebook.getAll();
    return notebooks.find((c) => c.id === id);
  }
}

module.exports = Notebook;
