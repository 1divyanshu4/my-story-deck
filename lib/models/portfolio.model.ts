import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    selectedTemplate: {
        type: String,
        default: "minimalist",
    },
    profile: {
        name: String,
        role: String,
        imageUrl: String,
        bio: String,
        ctaButtons: [
            {
                id: String,
                type: { type: String, enum: ["primary", "secondary"] },
                label: String,
                scrollTo: String,
            },
        ],
    },
    stats: [
        {
            id: String,
            value: String,
            label: String,
        },
    ],
    journey: [
        {
            id: String,
            type: { type: String, enum: ["Education", "Experience", "Milestone"] },
            title: String,
            institution: String,
            year: String,
            description: String,
        },
    ],
    skills: [
        {
            id: String,
            name: String,
            logoUrl: String,
        },
    ],
    projects: [
        {
            id: String,
            title: String,
            description: String,
            imageUrl: String,
            tags: [String],
            liveUrl: String,
            liveAccess: { type: String, enum: ["public", "private"] },
            repoUrl: String,
            repoAccess: { type: String, enum: ["public", "private"] },
            companyName: String,
            companyUrl: String,
        },
    ],
    contact: {
        email: String,
        linkedin: String,
        github: String,
        twitter: String,
    },
});

const Portfolio =
    mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
