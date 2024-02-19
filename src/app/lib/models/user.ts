//ts-worksheet-with-variables

import { FormData } from "@/app/(auth)/signup/page";
import { TRPCError } from "@trpc/server";
import mongoose, { Model } from "mongoose";
import validator from "validator";
import  bcrypt from 'bcrypt'

export interface Users extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  credentials:boolean;
  refreshToken?:string[];
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
  },
  credentials: {
    /* The species of your pet */
    default:false,
    type: Boolean,
  },
  refreshToken: {
    type: [String],
    required: false,
  }
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt:"updated_at"
  }
});


UserSchema.statics.createUser = async function (data:Users) {

  const {username,email,password,credentials} = data
  //if it does not exist thrug a trpc error
  if(!username || !email || !password || !credentials){
    throw  new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please provide all the required fields",
    })
  }
  //validate the email using validator
  if (!validator.isEmail(email)) {
    throw  new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please provide a valid email",
    })
  }

  //validate the password using validator
  if (!validator.isStrongPassword(password, {minSymbols:0 })) {
    throw  new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please provide a strong password",
    })
  }

  //check if the email or username already exists
  const emailExist = await this.findOne({ email })
  if (emailExist) {
    throw  new TRPCError({
      code: "UNAUTHORIZED",
      message: "Email already exists",
    })
  }
  const usernameExist = await this.findOne({ username })
  if (usernameExist) {
    throw  new TRPCError({
      code: "UNAUTHORIZED",
      message: "Username already exists",
    })
  }
  //TODO: SET UP JWT TOKEN

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await this.create({username,email,password:hashedPassword,credentials:true,refreshToken:['n refresh tken yet']})


  return user
}

export const user = mongoose.models.User<userModel>||mongoose.model<Users,userModel>("User", UserSchema)

