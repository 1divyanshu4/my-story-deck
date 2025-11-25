"use client";

import React from 'react';
import { usePortfolioStore } from '@/lib/store/usePortfolioStore';
import { Mail, Linkedin, Github, Twitter, Key } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Contact: React.FC = () => {
    const { data, updateContact } = usePortfolioStore();
    const contact = {
        email: data?.contact?.email ?? '',
        linkedin: data?.contact?.linkedin ?? '',
        github: data?.contact?.github ?? '',
        twitter: data?.contact?.twitter ?? '',
        web3formsKey: data?.contact?.web3formsKey ?? ''
    };

    const handleChange = (field: keyof typeof contact, value: string) => {
        updateContact({ [field]: value });
    };

    return (
        <ScrollArea className="form-wrapper">
            <div className="form-content">
                <div className="form-header">
                    <div className="form-title">Contact Information</div>
                    <div className="form-description">
                        Add your contact details and social media links. Configure Web3Forms for contact form submissions.
                    </div>
                </div>

                {/* Contact Details */}
                <div className="form-section">
                    <h3 className="form-section-title">Contact Details</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-email" className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                Email Address
                            </Label>
                            <Input
                                id="contact-email"
                                type="email"
                                value={contact.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="form-section">
                    <h3 className="form-section-title">Social Media</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-linkedin" className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-muted-foreground" />
                                LinkedIn Profile
                            </Label>
                            <Input
                                id="contact-linkedin"
                                value={contact.linkedin}
                                onChange={(e) => handleChange('linkedin', e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-github" className="flex items-center gap-2">
                                <Github className="w-4 h-4 text-muted-foreground" />
                                GitHub Profile
                            </Label>
                            <Input
                                id="contact-github"
                                value={contact.github}
                                onChange={(e) => handleChange('github', e.target.value)}
                                placeholder="https://github.com/username"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-twitter" className="flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-muted-foreground" />
                                Twitter/X Profile
                            </Label>
                            <Input
                                id="contact-twitter"
                                value={contact.twitter}
                                onChange={(e) => handleChange('twitter', e.target.value)}
                                placeholder="https://twitter.com/username"
                            />
                        </div>
                    </div>
                </div>

                {/* Web3Forms Configuration */}
                <div className="form-section">
                    <h3 className="form-section-title">Contact Form Configuration</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-web3forms" className="flex items-center gap-2">
                                <Key className="w-4 h-4 text-muted-foreground" />
                                Web3Forms Public Key
                            </Label>
                            <Input
                                id="contact-web3forms"
                                value={contact.web3formsKey}
                                onChange={(e) => handleChange('web3formsKey', e.target.value)}
                                placeholder="Enter your Web3Forms access key"
                            />
                            <p className="text-xs text-muted-foreground">
                                Get your free access key from{' '}
                                <a 
                                    href="https://web3forms.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    web3forms.com
                                </a>
                                {' '}to enable contact form submissions on your portfolio.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preview Card */}
                <div className="form-section">
                    <h3 className="form-section-title">Preview</h3>
                    <div className="bg-muted/50 rounded-lg p-6 border">
                        <div className="space-y-3">
                            {contact.email && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                                        {contact.email}
                                    </a>
                                </div>
                            )}
                            {contact.linkedin && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                        {contact.linkedin}
                                    </a>
                                </div>
                            )}
                            {contact.github && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Github className="w-4 h-4 text-muted-foreground" />
                                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                        {contact.github}
                                    </a>
                                </div>
                            )}
                            {contact.twitter && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Twitter className="w-4 h-4 text-muted-foreground" />
                                    <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                        {contact.twitter}
                                    </a>
                                </div>
                            )}
                            {!contact.email && !contact.linkedin && !contact.github && !contact.twitter && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Add your contact information to see the preview
                                </p>
                            )}
                        </div>
                        
                        {contact.web3formsKey && (
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex items-center gap-2 text-xs text-green-600">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    Contact form enabled
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default Contact;
