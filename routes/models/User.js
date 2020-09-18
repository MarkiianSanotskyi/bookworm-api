import mongoose from 'mongoose';

// TODO: add uniqueness and email validations to email field
const schema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: true},
    passwordHash: { type: String, required: true}
},
 { timestamps: true}
);

export default mongoose.model('User', schema);