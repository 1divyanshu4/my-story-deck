import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";

import { currentUser } from "@clerk/nextjs/server";
import Onboard from "@/components/forms/Onboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/dashboard");

  const userData = {
    clerkId: user.id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    image: userInfo ? userInfo?.image : user.imageUrl ?? "",
  };

  return (
    <main className="mx-auto min-h-screen flex max-w-3xl items-center justify-center px-10 py-20">
      <Card className="w-full max-w-sm py-12">
        <CardHeader>
          <CardTitle>Enter your Username</CardTitle>
          <CardDescription>
            Your Portfolio will be published under your username
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Onboard user={userData} btnTitle="Login" />
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;
