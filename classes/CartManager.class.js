import fs from 'fs'
import { v4 as uuidV4 } from 'uuid';

export default class CartManager {
    constructor(path){
    this.path = path;
}

    async #loadCartsFromPath() {
    let carts = []

    if (fs.existsSync(this.path)) {

        let data = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(data)
    }

    return carts
    }
}