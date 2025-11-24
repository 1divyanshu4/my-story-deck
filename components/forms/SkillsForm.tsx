"use client";

import React, { useState } from 'react';
import { Skill } from '@/types';
import { usePortfolioStore } from '@/lib/store/usePortfolioStore';
import { Trash2, Plus, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { predefinedSkills, PredefinedSkill } from '@/data/skillsLogo';

const INITIAL_STATE: Omit<Skill, 'id'> = { name: '', logoUrl: '' };

export const SkillsForm: React.FC = () => {
    const { data, addSkill, removeSkill } = usePortfolioStore();
    const [newSkill, setNewSkill] = useState(INITIAL_STATE);
    const [searchTerm, setSearchTerm] = useState('');
    const [showManualInput, setShowManualInput] = useState(false);
    const items = data?.skills || [];

    const handleAdd = () => {
        if (newSkill.name) {
            addSkill({ ...newSkill, id: Date.now().toString() });
            setNewSkill(INITIAL_STATE);
            setShowManualInput(false);
        }
    };

    const handleAddPredefined = (skill: PredefinedSkill) => {
        const existingIndex = items.findIndex(item => item.name === skill.name);
        if (existingIndex !== -1) {
            removeSkill(existingIndex);
        } else {
            addSkill({ ...skill, id: Date.now().toString() });
        }
    };
    
    const handleChange = (field: keyof typeof INITIAL_STATE, value: string) => {
        setNewSkill(prev => ({ ...prev, [field]: value }));
    };

    const filteredSkills = predefinedSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollArea className="w-full h-136 rounded-xl border bg-background">
            <div className="w-full h-full p-6 space-y-8">
                <div className="flex flex-col cursor-pointer">
                    <div className="flex justify-between items-center">
                         <div className="font-bold text-xl">Skills</div>
                         <ChevronUp className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="text-muted-foreground text-sm">Your technical abilities. Click header to collapse form.</div>
                </div>

                <div className="space-y-4">
                     <h3 className="font-medium text-base">Add a Skill</h3>
                     <div className="border rounded-lg p-4 space-y-4 bg-white">
                        {!showManualInput ? (
                            <>
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search for a Skill"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 py-2">
                                    {filteredSkills.map((skill) => (
                                        <button
                                            key={skill.name}
                                            onClick={() => handleAddPredefined(skill)}
                                            className="group flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors aspect-square relative"
                                            title={skill.name}
                                        >
                                            <img 
                                                src={skill.logoUrl} 
                                                alt={skill.name} 
                                                className="w-10 h-10 object-contain transition-transform group-hover:scale-110" 
                                            />
                                            {items.some(item => item.name === skill.name) && (
                                                <div className="absolute inset-0 bg-black/5 rounded-md flex items-center justify-center">
                                                   
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Manual Input Toggle */}
                                <div className="border-t pt-4  cursor-pointer" onClick={() => setShowManualInput(true)}>
                                    <button 
                                        
                                        className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                                    >
                                        Other (Specify manually)
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                <h4 className="font-medium text-base">Add a Custom Skill</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="skill-name">Custom Skill Name</Label>
                                        <Input
                                            id="skill-name"
                                            value={newSkill.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            placeholder="e.g., Svelte"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="skill-logo">Logo URL (Optional)</Label>
                                        <Input
                                            id="skill-logo"
                                            value={newSkill.logoUrl}
                                            onChange={(e) => handleChange('logoUrl', e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowManualInput(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAdd}
                                        disabled={!newSkill.name}
                                        className="bg-slate-500 hover:bg-slate-600 text-white"
                                    >
                                        Add Skill
                                    </Button>
                                </div>
                            </div>
                        )}
                     </div>
                </div>

                {/* Current Skills List (Empty State) */}
                {items.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground py-12 border-2 border-dashed rounded-lg bg-muted/50">
                        <p>No skills added yet.</p>
                    </div>
                )}

                {/* Current Skills List (Populated) */}
                {items.length > 0 && (
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {items.map((item, index) => (
                            <Card key={item.id || index} className="group  relative overflow-hidden hover:border-primary/50 transition-colors rounded-md">
                                <CardContent className="p-0 flex flex-col items-center justify-center gap-1 text-center ">
                                    <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => removeSkill(index)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="w-10 h-10 flex items-center justify-center bg-muted/20 rounded-lg p-1 mt-2">
                                        {item.logoUrl ? (
                                            <img src={item.logoUrl} alt={item.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-lg font-bold text-muted-foreground">{item.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <span className="font-medium text-sm truncate w-full px-1">{item.name}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </ScrollArea>
    );
};
