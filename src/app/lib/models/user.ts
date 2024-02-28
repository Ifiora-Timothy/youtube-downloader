import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import validator from "validator";

export interface Users extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  credentials: boolean;
  access_token: string;
  expires_at: number;
  userId: any;
}
interface loginUser extends mongoose.Document {
  email: string;
  password: string;
}
interface userModel extends Model<Users> {
  createUser(data: Users): Users;
}
interface loginModel extends Model<loginUser> {
  validateLogin(data: loginUser): { name: string; email: string; id: string };
}

const validateEmailandPassword = async (
  email: string,
  password: string,
  type?: string
) => {
  if (!email || !password) {
    return new Error("Please provide all the required fields");
  }
  if (!validator.isEmail(email)) {
    if (type === "login") return new Error("invalid Credentials");
    return new Error("Please provide a valid email");
  }
  if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
    if (type === "login") return new Error("invalid Credentials");
    return new Error("Please provide a strong password");
  }
};
/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users, userModel>(
  {
    username: {
      /* The name of this pet */
      unique: true,
      type: String,
      required: [true, "Please provide a username."],
      maxlength: [20, "Name cannot be more than 20 characters"],
    },
    email: {
      /* The owner of this pet */
      unique: true,
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
      default: false,
      type: Boolean,
    },
    access_token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const LoginSchema = new mongoose.Schema<loginUser, loginModel>(
  {
    email: {
      /* The owner of this pet */
      type: String,
      required: [true, "Please provide the pet owner's name"],
      maxlength: [60, "email cannot be more than 60 characters"],
    },
    password: {
      /* The species of your pet */
      type: String,
      required: [true, "Please specify the species of your pet."],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.statics.createUser = async function (data: Users) {
  const { username, email, password, credentials } = data;
  //if it does not exist thrug a trpc error
  if (!username || !email || !password || !credentials) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please provide all the required fields",
    });
  }
  await validateEmailandPassword(email, password);

  //check if the email or username already exists
  const emailExist = await this.findOne({ email });
  if (emailExist) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Email already exists",
    });
  }
  const usernameExist = await this.findOne({ username });
  if (usernameExist) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Username already exists",
    });
  }
  //TODO: SET UP JWT TOKEN

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    password: hashedPassword,
    credentials: true,
    refreshToken: ["n refresh tken yet"],
  });

  return user;
};

UserSchema.statics.validateLogin = async function (data: loginUser) {
  const { email, password } = data;
  //if it does not exist thrug a trpc error
  const validate = await validateEmailandPassword(email, password, "login");
  if (validate instanceof Error) {
    return new Error(validate.message);
  }
  //check if the email or username already exists

  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    return new Error("Email does not exist");
  }

  const passwordMatch = await bcrypt.compare(password, emailExist.password);
  if (!passwordMatch) {
    return new Error("Password does not match");
  }

  const user = {
    name: emailExist.username,
    email: emailExist.email,
    id: emailExist._id,
  };
  return user;
};

UserSchema.statics.findByEmailAndUsername = async function ({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    return new Error("Email does not exist");
  }

  //check if username match
  if (!(username === emailExist.username)) {
    throw new Error("Password does not match");
  }

  return { success: true };
};

export const user =
  mongoose.models.User<userModel> ||
  mongoose.model<Users, userModel>("User", UserSchema);
