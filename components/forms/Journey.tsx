"use client";

import React, { useState } from 'react';
import { JourneyItem } from '@/types';
import { usePortfolioStore } from '@/lib/store/usePortfolioStore';
import { Trash2, Plus, Briefcase, GraduationCap, Star } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_STATE: Omit<JourneyItem, 'id'> = { 
    type: 'Experience', 
    title: '', 
    institution: '', 
    year: '', 
    description: '' 
};

// Helper function to get journey item styling
const getJourneyItemStyle = (type: JourneyItem['type']) => {
    switch (type) {
        case 'Experience': 
            return { 
                icon: Briefcase, 
                borderColor: 'border-l-blue-500', 
                iconColor: 'text-blue-500',
                bgColor: 'bg-blue-50'
            };
        case 'Education': 
            return { 
                icon: GraduationCap, 
                borderColor: 'border-l-purple-500', 
                iconColor: 'text-purple-500',
                bgColor: 'bg-purple-50'
            };
        case 'Milestone': 
            return { 
                icon: Star, 
                borderColor: 'border-l-green-500', 
                iconColor: 'text-green-500',
                bgColor: 'bg-green-50'
            };
        default: 
            return { 
                icon: Briefcase, 
                borderColor: 'border-l-gray-300', 
                iconColor: 'text-gray-400',
                bgColor: 'bg-gray-50'
            };
    }
};

const Journey: React.FC = () => {
    const { data, addJourneyItem, removeJourneyItem } = usePortfolioStore();
    const [newItem, setNewItem] = useState(INITIAL_STATE);
    const items = data?.journey || [];

    const handleAdd = () => {
        if (newItem.title && newItem.year && newItem.description) {
            addJourneyItem({ ...newItem, id: Date.now().toString() });
            setNewItem(INITIAL_STATE);
        }
    };
    
    const handleChange = (field: keyof Omit<JourneyItem, 'id'>, value: string) => {
        setNewItem(prev => ({ ...prev, [field]: value }));
    };

    return (
        <ScrollArea className="form-wrapper">
            <div className="form-content">
                <div className="form-header">
                    <div className="form-title">Career Journey</div>
                    <div className="form-description">Education, experience, and milestones that define your professional path.</div>
                </div>

                {/* Add New Journey Item Form */}
                <div className="form-section">
                    <h3 className="form-section-title">Add New Journey Item</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="journey-type">Type</Label>
                                <Select 
                                    value={newItem.type} 
                                    onValueChange={(value) => handleChange('type', value)}
                                >
                                    <SelectTrigger id="journey-type" className='w-full'>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Experience">Experience</SelectItem>
                                        <SelectItem value="Education">Education</SelectItem>
                                        <SelectItem value="Milestone">Milestone</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="journey-title">Title</Label>
                                <Input
                                    id="journey-title"
                                    value={newItem.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="e.g., Senior Software Engineer"
                                />
                            </div>
                        </div>

                        {newItem.type !== 'Milestone' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="journey-institution">
                                        {newItem.type === 'Experience' ? 'Company' : 'Institution'}
                                    </Label>
                                    <Input
                                        id="journey-institution"
                                        value={newItem.institution || ''}
                                        onChange={(e) => handleChange('institution', e.target.value)}
                                        placeholder={newItem.type === 'Experience' ? 'e.g., Google' : 'e.g., MIT'}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="journey-year">Year(s)</Label>
                                    <Input
                                        id="journey-year"
                                        value={newItem.year}
                                        onChange={(e) => handleChange('year', e.target.value)}
                                        placeholder="e.g., 2022 - Present"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="journey-year">Year</Label>
                                <Input
                                    id="journey-year"
                                    value={newItem.year}
                                    onChange={(e) => handleChange('year', e.target.value)}
                                    placeholder="e.g., 2025"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="journey-description">Description</Label>
                            <Textarea
                                id="journey-description"
                                value={newItem.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Describe your role, achievements, or what you learned..."
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={handleAdd}
                                disabled={!newItem.title || !newItem.year || !newItem.description}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Item
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Journey Items List */}
                <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Current Journey</h3>
                    {items.length > 0 ? (
                        <div className="form-item-grid">
                            {items.map((item, index) => {
                                const { icon: IconComponent, borderColor, iconColor, bgColor } = getJourneyItemStyle(item.type);
                                return (
                                    <div 
                                        key={item.id || index} 
                                        className={`form-item-card group relative overflow-hidden border-l-4 ${borderColor}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 ${iconColor}`}>
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.institution && <span>{item.institution} • </span>}
                                                            <span>{item.year}</span>
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeJourneyItem(index)}
                                                        className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-sm text-muted-foreground py-12 border-2 border-dashed rounded-lg bg-muted/50">
                            <p>No journey items added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};

export default Journey;
