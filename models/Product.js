import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema(
    {
        title:{ type: String, require: true, unique: true, },
        desc:{ type: String, require: true },
        img:{type: String, require: true },
        categories:{ type: Array},
        size:{ type: String},
        color:{ type: String},
        price:{ type: Number},

    },
    {timestamps: true}
)

export default mongoose.model("Product",ProductSchema)