const fs = require("fs");

class UsersManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (e) {
      return e;
    }
  }

  async createUser(obj) {
    try {
      const usuariosPrev = await this.getUsers();
      let id;
      if (!usuariosPrev.length) {
        id = 1;
      } else {
        id = usuariosPrev[usuariosPrev.length - 1].id + 1;
      }
      usuariosPrev.push({ ...obj, id });
      await fs.promises.writeFile(this.path, JSON.stringify(usuariosPrev));
    } catch (e) {
      return e;
    }
  }
  async deleteUser(id) {
    try {
    } catch (e) {
      return e;
    }
  }
  async updateUser(id, obj) {
    try {
    } catch (e) {
      return e;
    }
  }
  async getUserById(id) {
    try {
    } catch (e) {
      return e;
    }
  }
}

const usuario1 = {
  nombre: "nombre",
  apellido: "apellido",
  edad: "edad",
  curso: "curso",
};

async function prueba() {
  const manager = new UsersManager("Usuarios.json");
  //   console.log(manager);

  //   console.log(usuarios);
  await manager.createUser(usuario1);
  const usuarios = await manager.getUsers();
  console.log(usuarios);
}

prueba();
