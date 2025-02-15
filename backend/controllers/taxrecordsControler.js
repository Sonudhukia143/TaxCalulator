import { TaxRecord } from '../models/TaxRecord.js';

export default async function loginUser(req, res) {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User Not Found" });

    try {
        const records = await TaxRecord.find({ user }).sort({ timestamp: -1 });
        if(!records) return res.status(404).json({message:"No records found",records})

        return res.status(200).json({message:"Succesfully fetched records",records});
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
