"use client";

import { useRef } from "react";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { PortfolioData } from "@/types";

interface StoreInitializerProps {
  data: PortfolioData;
}

export default function StoreInitializer({ data }: StoreInitializerProps) {
  const initialized = useRef(false);
  if (!initialized.current) {
    usePortfolioStore.setState({ data });
    initialized.current = true;
  }
  return null;
}
