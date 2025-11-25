"use client";

import React, { useState } from 'react';
import { Stat } from '@/types';
import { usePortfolioStore } from '@/lib/store/usePortfolioStore';
import { Trash2, Plus } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const INITIAL_STATE: Omit<Stat, 'id'> = { value: '', label: '' };

export const StatsForm: React.FC = () => {
    const { data, addStat, removeStat } = usePortfolioStore();
    const [newStat, setNewStat] = useState(INITIAL_STATE);
    const items = data?.stats || [];

    const handleAdd = () => {
        if (newStat.value && newStat.label) {
            addStat({ ...newStat, id: Date.now().toString() });
            setNewStat(INITIAL_STATE);
        }
    };
    
    const handleChange = (field: keyof typeof INITIAL_STATE, value: string) => {
        setNewStat(prev => ({ ...prev, [field]: value }));
    };

    return (
        <ScrollArea className="form-wrapper">
            <div className="form-content">
                <div className="form-header">
                    <div className="form-title">Statistics</div>
                    <div className="form-description">Quantifiable achievements to showcase your impact.</div>
                </div>

                {/* Add New Stat Form */}
                <div className="form-section">
                    <h3 className="form-section-title">Add New Stat</h3>
                    <div className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="space-y-2 w-full sm:w-1/3">
                            <Label htmlFor="stat-value">Value</Label>
                            <Input
                                id="stat-value"
                                value={newStat.value}
                                onChange={(e) => handleChange('value', e.target.value)}
                                placeholder="15+"
                                className="font-bold"
                            />
                        </div>
                        <div className="space-y-2 flex-1 w-full">
                            <Label htmlFor="stat-label">Label</Label>
                            <Input
                                id="stat-label"
                                value={newStat.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                                placeholder="Years of Experience"
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={handleAdd}
                            disabled={!newStat.value || !newStat.label}
                            className="shrink-0"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                        </Button>
                    </div>
                </div>

                {/* Stats List */}
                <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Current Stats</h3>
                    {items.length > 0 ? (
                        <div className="form-item-grid">
                            {items.map((item, index) => (
                                <div 
                                    key={item.id || index} 
                                    className="form-item-card group relative overflow-hidden flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-2xl text-primary min-w-[3rem]">{item.value}</span>
                                        <span className="text-muted-foreground font-medium">{item.label}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeStat(index)}
                                        className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-sm text-muted-foreground py-12 border-2 border-dashed rounded-lg bg-muted/50">
                            <p>No statistics added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};
