"use client";

import React, { useEffect, useState } from "react";
import { PublicPortfolioPanel } from "@/components/panels/PublicPortfolioPanel";
import { useParams } from "next/navigation";
import { getPublicPortfolioByUserSlug } from "@/lib/actions/portfolio.actions";

const PublicPortfolioClient = () => {
  const { userslug } = useParams();
  console.log(userslug);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userslug) return;

    getPublicPortfolioByUserSlug(userslug as string)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [userslug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Portfolio not found.</p>
      </div>
    );
  }

  return <PublicPortfolioPanel data={data} />;
};

export default PublicPortfolioClient;
