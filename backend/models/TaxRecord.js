import mongoose from "mongoose";
import Joi from "joi";

const TaxSchema = new mongoose.Schema({
    income: Number,
    investments: Number,
    deductions: Number,
    otherIncome: Number,
    taxableIncome:Number,
    taxPayable:Number,
    user: { 
        type:mongoose.Schema.Types.ObjectId , 
        ref: "User"
    },
    timestamp: { type: Date, default: Date.now }
});

const TaxRecord = mongoose.model("TaxRecord", TaxSchema);

const validateTaxRecord = (TaxRecord) => {
    const schema = Joi.object({
        income: Joi.required(),
        investments: Joi.required(),
        deductions: Joi.required(),
        otherIncome: Joi.required(),
    });
    return schema.validate(TaxRecord);
};

export { TaxRecord, validateTaxRecord };