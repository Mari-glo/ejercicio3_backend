import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products=[]
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push (newProduct)
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8");
        return (JSON.parse(respuesta))
    }

    getProducts = async () =>{
        let reRespuesta = await this.readProducts()
        return console.log(reRespuesta) 

    }
    getProductsById = async (id) => {
        let idRespuesta = await this.readProducts(); 
        if(!idRespuesta.find((product) => product.id === id)) {
            console.log("NO SE ENCONTRÓ ESTE PRODUCTO");
        } else {
            console.log(idRespuesta.find((product)=>product.id===id));
        }

    };
    deleteProductsById = async (id)=>{
        let idRespuesta = await this.readProducts();
        let prodFilter = idRespuesta.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(prodFilter));
        console.log("PRODUCTO FUE ELIMINADO");

    };

    updateProducs = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let oldProducts = await this.readProducts();
        let modProducts = [{...producto, id}, ...oldProducts];
        await fs.writeFile (this.patch, JSON.stringify(modProducts));
    };
    
}

//const productos= new ProductManager

//productos.addProduct("producto prueba", "Este es un producto de prueba", 2000, "sin imagen","mari123", 25);
//productos.addProduct("producto prueba 2", "Este es un producto de prueba 2", 3000, "sin imagen","rafa123", 5);
//productos.addProduct("producto prueba 3", "Este es un producto de prueba 3", 5000, "sin imagen","mari321", 2);
//productos.addProduct("producto prueba4", "descripcion random4", 2000, "sin imagen","mari0011", 25);
//productos.addProduct("producto prueba5", "descripcion random5", 6000, "sin imagen","mari0022", 35);
//productos.addProduct("producto prueba6", "descripcion random6", 7000, "sin imagen","mari0033", 25);
//productos.addProduct("producto prueba7", "descripcion random7", 8000, "sin imagen","mari0044", 65);
//productos.addProduct("producto prueba8", "descripcion random8", 1000, "sin imagen","mari0055", 35);
//productos.addProduct("producto prueba9", "descripcion random9", 5000, "sin imagen","mari0066", 95);
//productos.addProduct("producto prueba10", "descripcion random10", 4000, "sin imagen","mari00772", 15);
//productos.addProduct("producto prueba11", "descripcion random11", 7000, "sin imagen","mari0088", 30);
//productos.addProduct("producto prueba12", "descripcion random12", 2000, "sin imagen","mari667", 90);
//productos.addProduct("producto prueba13", "descripcion random13", 1000, "sin imagen","mari4455", 12);
//productos.addProduct("producto prueba14", "descripcion random14", 8000, "sin imagen","mari9900", 60);


//productos.getProducts();

//productos.getProductsById(3);

//productos.deleteProductsById(2);

/*productos.updateProducs ({
    title: 'producto prueba 3',
    description: 'Este es un producto de prueba 3',
    price: 8000,
    img: 'sin imagen',
    code: 'mari321',
    stock: 2,
    id: 3
})*/
