import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name length must be minimum 3 characters'],
    maxlength: [50, 'Name length must be maximum 50 characters'],
    match: [/^[a-zA-Z\s]*$/, 'Name must contain only letters'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username length must be minimum 3 characters'],
    maxlength: [50, 'Username length must be maximum 50 characters'],
    match: [/^[a-zA-Z0-9]*$/, 'Username must contain only letters and numbers'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: [5, 'Email length must be minimum 5 characters'],
    maxlength: [50, 'Email length must be maximum 50 characters'],
    match: [/\S+@\S+\.\S+/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters long'],
    maxlength: [100, 'Password must be at most 100 characters long'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null,
  },
  lastOtpSent: {
    type: Date,
    default: null,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  resendOtpCount: {
    type: Number,
    default: 0,
  },
  lastResendOtp: {
    type: Date,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
