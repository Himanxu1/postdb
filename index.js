const express = require('express')
const {PrismaClient} = require('prisma/prisma-client')
const app = express()

const prisma = new PrismaClient()

app.use(express.json())


const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("server is running")
})

//  get products
app.get('/products',async (req,res)=>{
    try{
        const products = await prisma.product.findMany({
            include:{
                category:true
            }
        })
        res.json(products)
    }catch(err){
        console.log(err)
    }
})

//  get product by id
app.get('/product/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const Singleproduct = await prisma.product.findUnique({
            where:{
                id: Number(id)
            },
            include:{
                category:true
            }
        })
        res.json(Singleproduct)
    }catch(err){
        console.log(err)
    }
})


//  to create a product
app.post('/product',async (req,res)=>{

    try{
        const newProduct = await prisma.product.create({data:req.body})
        res.send("succesfully created")
    }catch(err){
        console.log(err)
    }

})

//     to delete an product
app.delete('/product/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const deletedProduct = await prisma.product.delete({
            where:{
                id:Number(id)
            }
        })
        res.json(deletedProduct)

    }catch(err){
        console.log(err)
    }
   })
   
//    to update product 
app.patch('/product/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const newProduct = await prisma.product.update({
            where:{
                id: Number(id)
            },
            data:req.body,
            include:{
                category:true
            }
        })
        res.send(newProduct)
    }catch(err){
        console.log(err)
    }
})