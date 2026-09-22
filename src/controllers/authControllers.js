import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";


export const registerUser = async (req, res) => {
 const {email, password, userName} = req.body;
 
 const existingUser = await User.findOne({ email});

 if(existingUser){
    throw createHttpError(400, "User already exist");
 }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    email,
    password: passwordHash,
  });

  res.status(201).json(newUser);
}

export const loginUser = async (req, res) => {
  const {email, password} = req.body;

    const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, "User with this email dosen`t exist");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword){
    throw createHttpError(401, "Invalid password");
  }
  res.status(200).json(user);
}