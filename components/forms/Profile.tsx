import { CTAButton, Profile } from "@/types";
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

// --- Interface and Component Definition ---

interface ProfileFormProps {
  data: Profile;
  onProfileChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCtaChange: (
    index: number,
    field: keyof Omit<CTAButton, "id" | "type">,
    value: string
  ) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  data,
  onProfileChange,
  onCtaChange,
}) => {
  // Helper function for SelectInput change handler
  const handleCtaSelectChange =
    (index: number, field: keyof Omit<CTAButton, "id" | "type">) =>
    (value: string) => {
      onCtaChange(index, field, value);
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
                value={data.name}
                onChange={onProfileChange}
                placeholder="e.g., Alex Doe"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                name="role"
                value={data.role}
                onChange={onProfileChange}
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={data.imageUrl}
                onChange={onProfileChange}
                placeholder="https://..."
              />
            </div>

            {/* Bio */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={data.bio}
                onChange={onProfileChange}
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
                      value={data.ctaButtons[0]?.label || ""}
                      onChange={(e) => onCtaChange(0, "label", e.target.value)}
                    />
                  </div>

                  {/* Scroll To Select */}
                  <div className="space-y-2">
                    <Label htmlFor="cta-primary-scrollTo">
                      Scroll To Section
                    </Label>
                    <Select
                      value={data.ctaButtons[0]?.scrollTo || "#projects"}
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
                      value={data.ctaButtons[1]?.label || ""}
                      onChange={(e) => onCtaChange(1, "label", e.target.value)}
                    />
                  </div>

                  {/* Scroll To Select */}
                  <div className="space-y-2">
                    <Label htmlFor="cta-secondary-scrollTo">
                      Scroll To Section
                    </Label>
                    <Select
                      value={data.ctaButtons[1]?.scrollTo || "#contact"}
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
