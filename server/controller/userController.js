import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import Transaction from "../model/transactionModel.js"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "All fields are required" });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Already account exists,Please Login",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .json({ success: true, token, user: { name: user.fullName } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({
          success: false,
          message: "user does not exist,Please Signup first",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ success: false, message: "Password is incorrect" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .status(201)
        .json({ success: true, token, user: { fullName: user.fullName } });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.fullName },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

    const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const user = await User.findById(userId);
    if (!user || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({success:false,message:'plan not found'});
    }

        date = Date.now();

        const transactionData = {
            userId,plan,amount,credits,date
        }

        const newTransaction = await Transaction.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options, (error,order) => {
            if(error){
                console.log(error);
                return res.json({ success:false,message:error});
            }

            res.json({success:true,order});
        })
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async(req,res) => {
  try {

    const {razorpay_order_id} = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === 'paid'){
      const transactionData = await Transaction.findById(orderInfo.receipt);
      if(transactionData.payment){
        return res.json({success:false,message:'Payment Failed'});
      }

      const user = await User.findById(transactionData.userId);

      const creditBalance = user.creditBalance + transactionData.credits;
      await User.findByIdAndUpdate(userData._id, {creditBalance});

      await Transaction.findByIdAndUpdate(transactionData._id, {payment:true});

      res.json({success:true,message:"Credits Added"});
    }else{
      res.json({success:false,message:"Payment Failed"});
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
  }
}
