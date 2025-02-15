import calculateTax from "../utils/calculatetax.js";
import { TaxRecord,validateTaxRecord } from "../models/TaxRecord.js";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export default async function calculateTaxControler(req, res) {
    const {error} = validateTaxRecord(req.body);
    if(error) return res.status(404).json({message:"Input fields cannot be empty"});

    const { income, investments, deductions, otherIncome } = req.body;

    const result = calculateTax(income, investments, deductions, otherIncome);

    const token = req.header("Authorization");
    if(token){
        const decoded = jwt.verify(token, process.env.JSON_WEB_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(user) {
            const record = new TaxRecord({
                income:income, 
                investments:investments, 
                deductions:deductions, 
                otherIncome:otherIncome,
                user:user._id,
                taxableIncome:result.taxableIncome,
                taxPayable:result.taxPayable
            });

            const savedRecord = await record.save();

            if(!savedRecord) return res.status(400).json({message:"Unable to save user"});
        }
    }

    return res.status(200).json(result);
};