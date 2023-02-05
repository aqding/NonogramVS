import { Schema, model, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<User>("user", UserSchema);

export default UserModel;
