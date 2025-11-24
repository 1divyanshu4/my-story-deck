"use client";

import { CTAButton } from "@/types";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";


export const ProfileForm: React.FC = () => {
  const { data, updateProfile, updateCtaButton } = usePortfolioStore();

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateProfile({ [name]: value });
  };

  const handleCtaChange = (
    index: number,
    field: keyof Omit<CTAButton, "id" | "type">,
    value: string
  ) => {
    updateCtaButton(index, { [field]: value });
  };

  // Helper function for SelectInput change handler
  const handleCtaSelectChange =
    (index: number, field: keyof Omit<CTAButton, "id" | "type">) =>
    (value: string) => {
      handleCtaChange(index, field, value);
    };

  const sectionOptions = [
    { value: "projects", label: "Projects" },
    { value: "contact", label: "Contact" },
    { value: "journey", label: "Journey" },
    { value: "skills", label: "Skills" },
  ];

  return (
    <ScrollArea className="w-full h-136  rounded-xl border bg-background">
      <div className="w-full h-full p-6">
        <div className="flex flex-col mb-6">
          <div className="font-bold">Profile Section</div>
          <div>Your personal and professional introduction.</div>
        </div>
        <div className="space-y-8">
          {/* 1. Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={data?.profile.name || ""}
                onChange={handleProfileChange}
                placeholder="e.g., Alex Doe"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                name="role"
                value={data?.profile.role || ""}
                onChange={handleProfileChange}
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={data?.profile.imageUrl || ""}
                onChange={handleProfileChange}
                placeholder="https://..."
              />
            </div>

            {/* Bio */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={data?.profile.bio || ""}
                onChange={handleProfileChange}
                placeholder="Tell us about yourself..."
                rows={5}
              />
            </div>
          </div>

          {/* 2. Call to Action Buttons */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Button (Index 0) */}
              <Card className="shadow-none gap-0">
                <CardHeader className="pb-2 px-4">
                  <CardTitle className="text-base font-semibold">
                    Primary Button
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 ">
                  {/* Label Input */}
                  <div className="space-y-2">
                    <Label htmlFor="cta-primary-label">Label</Label>
                    <Input
                      id="cta-primary-label"
                      name="label"
                      value={data?.profile.ctaButtons[0]?.label || ""}
                      onChange={(e) => handleCtaChange(0, "label", e.target.value)}
                    />
                  </div>

                  {/* Scroll To Select */}
                  <div className="space-y-2">
                    <Label htmlFor="cta-primary-scrollTo">
                      Scroll To Section
                    </Label>
                    <Select
                      value={data?.profile.ctaButtons[0]?.scrollTo || "projects"}
                      onValueChange={handleCtaSelectChange(0, "scrollTo")}
                    >
                      <SelectTrigger
                        id="cta-primary-scrollTo"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Button (Index 1) */}
              <Card className="shadow-none gap-0">
                <CardHeader className="pb-2 px-4">
                  <CardTitle className="text-base font-semibold">
                    Secondary Button
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4">
                  {/* Label Input */}
                  <div className="space-y-2">
                    <Label htmlFor="cta-secondary-label">Label</Label>
                    <Input
                      id="cta-secondary-label"
                      name="label"
                      value={data?.profile.ctaButtons[1]?.label || ""}
                      onChange={(e) => handleCtaChange(1, "label", e.target.value)}
                    />
                  </div>

                  {/* Scroll To Select */}
                  <div className="space-y-2">
                    <Label htmlFor="cta-secondary-scrollTo">
                      Scroll To Section
                    </Label>
                    <Select
                      value={data?.profile.ctaButtons[1]?.scrollTo || "contact"}
                      onValueChange={handleCtaSelectChange(1, "scrollTo")}
                    >
                      <SelectTrigger
                        id="cta-secondary-scrollTo"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { value: "contact", label: "Contact" },
                          { value: "projects", label: "Projects" },
                          { value: "journey", label: "Journey" },
                          { value: "skills", label: "Skills" },
                        ].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
