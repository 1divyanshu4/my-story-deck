"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";

export async function fetchUser(clerkId: string) {
    try {
        connectToDB();

        return await User.findOne({ clerkId });
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to fetch user`);
    }
}

interface Params {
    clerkId: string;
    userslug: string;
    name: string;
    image: string;

}

export async function updateUser({
    clerkId,
    name,
    userslug,
    image,
}: Params): Promise<void> {
    try {
        connectToDB();

        await User.findOneAndUpdate(
            { clerkId },
            {
                userslug: userslug.toLowerCase(),
                name,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

    } catch (error) {
        console.log(error);
        throw new Error(`Failed to create/update user`);
    }
}

