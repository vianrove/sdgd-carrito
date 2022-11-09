const mongoose = require('mongoose');
const {update, correctiondb}  = require('./config.js');

const modelCart = mongoose.model('shoppingCart', mongoose.Schema({
    UserID: {type:String, require: true},
    bag: {type:Array, default: [Object]}

}))

const getList = (req, res)=>{
   modelCart.find({},'UserID bag').then(
    doc =>{
        res.json({message:'success',doc:doc})
    }
).catch(err=>{    
    console.log(err.message)
    res.json({message:'failed'})
})  
}

const CreateList =(req, res)=>{
    const order = modelCart(req.body);
    order.save().then(
        (doc)=>{
            console.log(`Nueva orden con id: ${order.id} creado`,doc);
            res.status(200).json({response:'success'})  
            if(req.body.bag.length>1){
                for(let data in req.body.bag){
                    update(req.body.bag[data],(result)=>console.log(result))
                }
            }else{
                update(req.body.bag[0],(result)=>console.log(result))
            }
        }
    ).catch(
        (err)=>{
            console.log(err)
            res.status(500).json({message:'error interno'})
        }
    )
    
}

const UpdateList =(req, res)=>{
    const { id } = req.params;
    modelCart.find({_id:id},'UserID bag').then(
        doc =>{
            correctiondb(doc[0]["bag"])
        }
    ).catch(err=>{    
        console.log(err.message)
       
    })
    modelCart.findByIdAndUpdate({_id:id},{$set:{
        UserID: req.body.UserID,
        bag:req.body.bag
    }}).then(
        doc => {
            console.log(`se actualizo la orden ${id}`)
            res.status(200).json({message:'success',doc:doc})
            if(req.body.bag.length>1){
                for(let data in req.body.bag){                    
                    update(req.body.bag[data],(result)=>console.log(result))
                }
            }else{
                update(req.body.bag[0],(result)=>console.log(result))
            }
            
        }
    ).catch(
        (err)=>{
            console.log(err)
            res.status(500).json({message:'error'})
        }
    )
}
const DeleteFromList =(req, res)=>{
    const { id } = req.params;
    modelCart.findByIdAndDelete({_id:id}).then(
        doc => {
            console.log('eliminado correctamente',doc);
            correctiondb(doc.bag)
            res.status(200).json({message:'success'})
        }
    ).catch(
        (err)=>{
            console.log(err);
            res.status(500).json({message:'error'})
        }
    )

}

module.exports = { getList, CreateList, UpdateList, DeleteFromList }