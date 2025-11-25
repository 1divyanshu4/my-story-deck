"use server";

import { connectToDB } from "../mongoose";
import Portfolio from "../models/portfolio.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { PortfolioData } from "@/types";

export async function getPortfolio(clerkId: string) {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId }).populate("portfolio");

        if (!user) {
            return null;
        }

        return JSON.parse(JSON.stringify(user.portfolio));
    } catch (error: any) {
        console.error("Failed to fetch portfolio:", error);
        throw new Error(`Failed to fetch portfolio: ${error.message}`);
    }
}

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



export async function updateProfile(portfolioId: string, profileData: any) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { profile: profileData },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update profile:", error);
        throw new Error(`Failed to update profile: ${error.message}`);
    }
}

export async function updateStats(portfolioId: string, stats: any[]) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { stats: stats },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update stats:", error);
        throw new Error(`Failed to update stats: ${error.message}`);
    }
}

export async function updateSkills(portfolioId: string, skills: any[]) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { skills: skills },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update skills:", error);
        throw new Error(`Failed to update skills: ${error.message}`);
    }
}

export async function updateJourney(portfolioId: string, journey: any[]) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { journey: journey },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update journey:", error);
        throw new Error(`Failed to update journey: ${error.message}`);
    }
}

export async function updateProjects(portfolioId: string, projects: any[]) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { projects: projects },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update projects:", error);
        throw new Error(`Failed to update projects: ${error.message}`);
    }
}

export async function updateContact(portfolioId: string, contact: any) {
    try {
        if (!portfolioId) {
            throw new Error("Portfolio ID is required");
        }

        await connectToDB();

        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { contact: contact },
            { new: true }
        );

        revalidatePath("/editor");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update contact:", error);
        throw new Error(`Failed to update contact: ${error.message}`);
    }
}

export async function getPublicPortfolioByUserSlug(slug: string) {
    try {
        await connectToDB();
        const user = await User.findOne({ userslug: slug }).populate("portfolio");
        console.log(user);

        if (!user || !user.portfolio) {
            return null;
        }

        const portfolio = JSON.parse(JSON.stringify(user.portfolio)) as PortfolioData;
        console.log(portfolio);
        return portfolio;
    } catch (error: any) {
        console.error("Failed to fetch public portfolio:", error);
        throw new Error(`Failed to fetch public portfolio: ${error.message}`);
    }
}
