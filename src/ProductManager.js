import fs from "fs";
import { get } from "http";
import { pid } from "process";

class  ProductManager  {
    constructor() {
        this.path = './src/product.json'
    }
};
  
    getProducts = async( ) =>{
       try {
        const productsJson = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsJson);
        return products;
       } catch (error) {
        await fs.promises.writeFile(this.path, '[]');
        return [];
       };

    };

    generateNewId = (products) =>{
        if (products.length > 0) {
            return products[products.length  - 1 ].id + 1;
        } else {
            return 1;
        }
    
    };
    

    addProduct = async ({ title, description, price, code, stock }) => {
       
   
        const products = await this.getProducts();
    
       
        const exists = products.find(product => product.code === code);
        if (exists) {
            console.log("codigo repetido ");
            
        }
    
        
        const newId = this.generateNewId(products);
    
        
        const newProduct = {
          id: newId,
          title,
          description,
          price,
          code,
          stock,
          category,
        };
    
        products.push(newProduct);
    
        
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    
        return newProduct; 
      };

      getProductById = async(id) => {
        const productsJson = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsJson);

        const product = products.find((productData)=>productData.id === id);
        
        if (!product) {
            return null;
        };
        return product


      }
    

    

 






export default ProductManager;