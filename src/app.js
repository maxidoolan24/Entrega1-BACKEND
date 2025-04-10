import express from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js'

const app = express();
app.use(express.json());

const productManager = new ProductManager();
const cartManager = new CartManager();


// parte producto 
 

app.get('/api/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
  
      res.status(200).json({
        message: "Lista de productos",
        products: products,
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  });

  app.get('/api/products/:pid', async (req, res) => {
    try {
      const pid = parseInt(req.params.pid); 
  
      const product = await productManager.getProductById(pid);
  
      if (!product) {
        return res.status(404).json({ message: `Producto con ID ${pid} no encontrado` });
      }
  
      res.status(200).json({ product }); 
  
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar el producto",
        error: error.message,
      });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
    
      const { title, description, price, code, stock, category, thumbnails, status = true } = req.body;
  
      const newProduct = await productManager.addProduct({
        title,
        description,
        price,
        code,
        stock,
        category,
        
      });
  
      res.status(201).json({
        message: "Producto creado exitosamente",
        product: newProduct,
      });
  
    } catch (error) {
      res.status(400).json({
        message: "Error al crear el producto",
        error: error.message,
      });
    }
  });

  app.put('/api/products/:pid', async (req, res) => {
    try {
      const pid = parseInt(req.params.pid); 
      const { title, description, price, code, stock, category, thumbnails, status } = req.body;
  
     
      const updatedProduct = await productManager.updateProduct(pid, {
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnails,
        status,
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: `Producto con ID ${pid} no encontrado` });
      }
  
      res.status(200).json({
        message: "Producto actualizado",
        product: updatedProduct,
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el producto",
        error: error.message,
      });
    }
  });

  app.delete('/api/products/:pid', async (req, res) => {
    try {
      const pid = parseInt(req.params.pid); 
  
      
      const result = await productManager.deleteProduct(pid);
  
      if (!result) {
        return res.status(404).json({ message: `Producto con ID ${pid} no encontrado` });
      }
  
      res.status(200).json({ message: "Producto eliminado" });
  
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el producto",
        error: error.message,
      });
    }
  });
  

  // la parte de cart 





app.post('/api/carts', async(req,res)=>{

    const carts = await cartManager.addCart();
    res.status(201).json({carts, message: "nuevo carrito creado "})

});


app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid, 10);

        const products = await cartManager.getProductsInCartById(cid);

        // Si no se encuentra el carrito
        if (products === null) {
            return res.status(404).json({ message: `Carrito con ID ${cid} no encontrado` });
        }

        res.status(200).json({ products, message: "Lista de productos" });

    } catch (error) {
        console.error("Error en la ruta /api/carts/:cid:", error);
        res.status(500).json({ message: "Hubo un error al obtener los productos", error: error.message });
    }
});



app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    try {
        const carts = await cartManager.addProductInCart(cid, pid, quantity);
       
        res.status(200).json({carts, message: "nuevo producto añadido"});
    } catch (error) {
        res.status(500).json({message: "Hubo un error al añadir el producto", error: error.message});
    }
});

app.listen(8080, () =>{
    console.log("servidor iniciado en puerto 8080 ");
    
});