import LayoutSwitcher from "@/components/layout/ResizableLayout";
import { getPortfolio } from "@/lib/actions/portfolio.actions";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

const Editor = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const portfolio = await getPortfolio(user.id);
  console.log("Editor Page - Fetched Portfolio:", portfolio);

  return (
    <div className="h-screen">
      <LayoutSwitcher
        portfolioId={portfolio?._id?.toString()}
        selectedTemplate={portfolio?.selectedTemplate}
        portfolioData={portfolio}
      />
    </div>
  );
};

export default Editor;
