import { FormData } from "@/app/(auth)/signup/page";
import mongoose, { Model } from "mongoose";

export interface Users extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  formdata:boolean
}
interface userModel extends Model<Users>{
  createUser(data:FormData):FormData
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users,userModel>({
  username: {
    /* The name of this pet */
    unique:true,
    type: String,
    required: [true, "Please provide a username."],
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  email: {
    /* The owner of this pet */
    unique:true,
    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "email cannot be more than 60 characters"],
  },
  password: {
    /* The species of your pet */
    type: String,
    required: [true, "Please specify the species of your pet."],
    maxlength: [40, "password specified cannot be more than 40 characters"],
  },
  formdata: {
    /* The species of your pet */
    default:false,
    type: Boolean,
  }
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt:"updated_at"
  }
});


UserSchema.statics.createUser = async function (data:Users) {

  console.log(data)

  return data
}

export const user = mongoose.models.User||mongoose.model<Users,userModel>("User", UserSchema)

