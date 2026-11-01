import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler, errorFactory, sendSuccess } from "../errors/index.js";

export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });
  
  sendSuccess(res, { id: newUser._id, email: newUser.email }, "Utilisateur créé avec succès", 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    throw errorFactory.unauthorized("Identifiants invalides");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw errorFactory.unauthorized("Identifiants invalides");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  sendSuccess(res, { token }, "Connexion réussie");
});