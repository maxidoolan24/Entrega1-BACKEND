import fs from "fs";

class CartManager {
    constructor(parameters) {
        this.path = './src/carts.json'
    }

    generateNewId = (carts) =>{
        if (carts.length > 0) {
            return carts[carts.length  - 1 ].id + 1;
        } else {
            return 1;
        }

    }

    addCart =async() => {
       const cartJson = await fs.promises.readFile(this.path, "utf-8");
       const carts = JSON.parse(cartJson);   
       const id = this.generateNewId(carts);
       carts.push({id,products: [] })

       await fs.promises.writeFile(this.path,JSON.stringify(carts, null, 2),'utf-8');
       return carts;

    }


    getProductsInCartById = async(cid) => {
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsJson);  
            const cart = carts.find((cartData) => cartData.id === cid);
    
        if (!cart) {
            return null; 
        }
    
        return cart.products || [];  
    }
    



    addProductInCart = async(cid, pid, quantity) =>{
        const cartJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartJson);  

        carts.forEach(cart => {
            if (cart.id == cid) {

                cart.products.push({id : pid, quantity })
            }
            
        });
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2), "utf-8")

        return carts;


    }

    



 }

 export default CartManager;
