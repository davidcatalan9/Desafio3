import fs from "fs/promises";

export class ProductosManager {
    constructor(ruta) {
        this.ruta = ruta;
    }
    async getAll(query = {}) {
        const json = await fs.readFile(this.ruta, "utf-8");
        const data = JSON.parse(json);
        //Desestructurar = Destructuring assignment
        const { brand, limit } = query;
        if (brand) {
            const brandExistente = data.some((l) => l.brand === brand);
            if (!brandExistente) {
                throw new Error(`No tenemos ese género`);
            }
            return data.filter((l) => l.brand === brand);
        }

        if (limit) {
            if (isNaN(limit)) {
                throw new Error(`El Limite es invalido !!!`);
            }

            return data.slice(0, limit);
        }
        return data;
    }

    async getById(id) {
        const json = await fs.readFile(this.ruta, "utf-8");
        const relojes = JSON.parse(json);
        const libbuscados = relojes.find((l) => l.id === id);
        if (!libbuscados) throw new Error(`Libro con id no encontrado ${id}`);
        return libbuscados;
    }
}
