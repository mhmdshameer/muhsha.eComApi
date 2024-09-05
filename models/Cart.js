import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId:{ type: String, require: true,  },
        products:[
            {
                productId:{type: String,},
                quantity:{ Number, default: 1,}
            }
        ]
        
    },
    {timestamps: true}
)

export default mongoose.model("Cart",CartSchema)