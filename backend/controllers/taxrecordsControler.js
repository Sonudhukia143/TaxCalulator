import { TaxRecord } from '../models/TaxRecord.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function loginUser(req, res) {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User Not Found" });

    try {
        const records = await TaxRecord.find({ user }).sort({ timestamp: -1 });
        if (!records) return res.status(404).json({ message: "No records found", records });

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

        const generateGeminiRecommendations = async (records) => {
            const prompt = `Suggest 3 tax-saving strategies in India for a user with a record of this tax calculations in previous times ${records}.`;
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });

                const result = await model.generateContent(prompt);

                return result.response.text().split("\n");
            } catch (error) {
                console.error("Google Gemini API error:", error);
                return "AI recommendation service is unavailable.";
            }
        };

        const response = await generateGeminiRecommendations(records);

        return res.status(200).json({ message: "Succesfully fetched records", records , response});
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};