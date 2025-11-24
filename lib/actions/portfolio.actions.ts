"use server";

import { connectToDB } from "../mongoose";
import Portfolio from "../models/portfolio.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export async function updatePortfolioTemplate(
    portfolioId: string,
    template: string
) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { selectedTemplate: template },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update portfolio template:", error);
        throw new Error(`Failed to update portfolio template: ${error.message}`);
    }
}

export async function getPortfolio(clerkId: string) {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId }).populate("portfolio");

        if (!user) {
            return null;
        }

        if (!user.portfolio) {
            const newPortfolio = await Portfolio.create({
                selectedTemplate: "minimalist",
                profile: {
                    name: user.name,
                    imageUrl: user.image,
                },
            });

            user.portfolio = newPortfolio._id;
            await user.save();

            return JSON.parse(JSON.stringify(newPortfolio));
        }

        return JSON.parse(JSON.stringify(user.portfolio));
    } catch (error: any) {
        console.error("Failed to fetch portfolio:", error);
        throw new Error(`Failed to fetch portfolio: ${error.message}`);
    }
}
