"use client";

import React, { useState } from 'react';
import { Project } from '@/types';
import { usePortfolioStore } from '@/lib/store/usePortfolioStore';
import { Trash2, Plus, ExternalLink, Github, Building2, User } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";

type ProjectType = 'Personal' | 'Company';

const INITIAL_STATE: Omit<Project, 'id'> & { projectType: ProjectType } = {
    projectType: 'Personal',
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    liveUrl: '',
    liveAccess: 'public',
    repoUrl: '',
    repoAccess: 'public',
    companyName: '',
    companyUrl: ''
};

const Projects: React.FC = () => {
    const { data, addProject, removeProject } = usePortfolioStore();
    const [newItem, setNewItem] = useState(INITIAL_STATE);
    const [tagsInput, setTagsInput] = useState('');
    const items = data?.projects || [];

    const handleAdd = () => {
        const isCompanyProject = newItem.projectType === 'Company';
        const personalFieldsValid = !isCompanyProject && newItem.title && newItem.description;
        const companyFieldsValid = isCompanyProject && newItem.title && newItem.description && newItem.companyName;

        if (personalFieldsValid || companyFieldsValid) {
            const finalNewItem: Omit<Project, 'id'> = {
                title: newItem.title,
                description: newItem.description,
                imageUrl: newItem.imageUrl,
                tags: newItem.tags,
                liveUrl: newItem.liveUrl,
                liveAccess: newItem.liveAccess,
                repoUrl: isCompanyProject ? '' : newItem.repoUrl,
                repoAccess: isCompanyProject ? 'private' : newItem.repoAccess,
                companyName: isCompanyProject ? newItem.companyName : '',
                companyUrl: isCompanyProject ? newItem.companyUrl : '',
            };
            addProject({ ...finalNewItem, id: Date.now().toString() });
            setNewItem(INITIAL_STATE);
            setTagsInput('');
        }
    };
    
    const handleChange = (field: keyof typeof newItem, value: any) => {
        setNewItem(prev => {
            const newState = { ...prev, [field]: value };
            // When switching type, reset irrelevant fields
            if (field === 'projectType') {
                if (value === 'Company') {
                    newState.repoUrl = '';
                    newState.repoAccess = 'private';
                } else {
                    newState.companyName = '';
                    newState.companyUrl = '';
                }
            }
            return newState;
        });
    };

    const handleTagsChange = (value: string) => {
        setTagsInput(value);
        const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        handleChange('tags', tags);
    };

    const isAddButtonDisabled = !newItem.title || !newItem.description || (newItem.projectType === 'Company' && !newItem.companyName);

    return (
        <ScrollArea className="form-wrapper">
            <div className="form-content">
                <div className="form-header">
                    <div className="form-title">Projects</div>
                    <div className="form-description">Showcase your best work and achievements.</div>
                </div>

                {/* Add New Project Form */}
                <div className="form-section">
                    <h3 className="form-section-title">Add New Project</h3>
                    <div className="space-y-6">
                        {/* Core Details */}
                        <div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="project-title">Project Title *</Label>
                                    <Input
                                        id="project-title"
                                        value={newItem.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., E-commerce Platform"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="project-description">Description *</Label>
                                    <Textarea
                                        id="project-description"
                                        value={newItem.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="Describe what you built and the impact it had..."
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="project-image">Image URL</Label>
                                        <Input
                                            id="project-image"
                                            value={newItem.imageUrl}
                                            onChange={(e) => handleChange('imageUrl', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="project-tags">Tags (comma separated)</Label>
                                        <Input
                                            id="project-tags"
                                            value={tagsInput}
                                            onChange={(e) => handleTagsChange(e.target.value)}
                                            placeholder="React, TypeScript, Node.js"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Links & Access */}
                        <div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="project-type">Project Type</Label>
                                    <Select 
                                        value={newItem.projectType} 
                                        onValueChange={(value) => handleChange('projectType', value as ProjectType)}
                                    >
                                        <SelectTrigger id="project-type" className="w-full">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Personal">Personal Project</SelectItem>
                                            <SelectItem value="Company">Built for a Company</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="project-live-url">
                                            {newItem.projectType === 'Company' ? 'Live / Landing Page URL' : 'Live URL'}
                                        </Label>
                                        <Input
                                            id="project-live-url"
                                            value={newItem.liveUrl}
                                            onChange={(e) => handleChange('liveUrl', e.target.value)}
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="project-live-access">Live Demo Access</Label>
                                        <Select 
                                            value={newItem.liveAccess} 
                                            onValueChange={(value) => handleChange('liveAccess', value as 'public' | 'private')}
                                        >
                                            <SelectTrigger id="project-live-access" className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="private">Private</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {newItem.projectType === 'Personal' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="project-repo-url">Repository URL</Label>
                                            <Input
                                                id="project-repo-url"
                                                value={newItem.repoUrl}
                                                onChange={(e) => handleChange('repoUrl', e.target.value)}
                                                placeholder="https://github.com/username/repo"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="project-repo-access">Repository Access</Label>
                                            <Select 
                                                value={newItem.repoAccess} 
                                                onValueChange={(value) => handleChange('repoAccess', value as 'public' | 'private')}
                                            >
                                                <SelectTrigger id="project-repo-access" className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="public">Public</SelectItem>
                                                    <SelectItem value="private">Private</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Info */}
                        {newItem.projectType === 'Company' && (
                            <div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="project-company-name">Company Name *</Label>
                                        <Input
                                            id="project-company-name"
                                            value={newItem.companyName || ''}
                                            onChange={(e) => handleChange('companyName', e.target.value)}
                                            placeholder="e.g., Acme Inc."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="project-company-url">Company URL</Label>
                                        <Input
                                            id="project-company-url"
                                            value={newItem.companyUrl || ''}
                                            onChange={(e) => handleChange('companyUrl', e.target.value)}
                                            placeholder="https://company.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={handleAdd}
                                disabled={isAddButtonDisabled}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Projects List */}
                <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Current Projects</h3>
                    {items.length > 0 ? (
                        <div className="form-item-grid">
                            {items.map((item, index) => (
                                <div 
                                    key={item.id || index} 
                                    className="form-item-card group relative overflow-hidden"
                                >
                                    <div className="flex gap-4">
                                        {/* Project Image */}
                                        <div className="shrink-0">
                                            <img 
                                                src={item.imageUrl || 'https://placehold.co/80x80/e2e8f0/94a3b8?text=Project'} 
                                                alt={item.title}
                                                className="w-20 h-20 rounded-lg object-cover bg-muted"
                                            />
                                        </div>

                                        {/* Project Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
                                                        {item.companyName && (
                                                            <Badge variant="secondary" className="shrink-0">
                                                                <Building2 className="w-3 h-3 mr-1" />
                                                                {item.companyName}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                                                    
                                                    {/* Tags */}
                                                    {item.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {item.tags.slice(0, 3).map((tag, i) => (
                                                                <Badge key={i} variant="outline" className="text-xs">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                            {item.tags.length > 3 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{item.tags.length - 3}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Links */}
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                        {item.liveUrl && (
                                                            <span className="flex items-center gap-1">
                                                                <ExternalLink className="w-3 h-3" />
                                                                Live
                                                            </span>
                                                        )}
                                                        {item.repoUrl && (
                                                            <span className="flex items-center gap-1">
                                                                <Github className="w-3 h-3" />
                                                                Repo
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeProject(index)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-sm text-muted-foreground py-12 border-2 border-dashed rounded-lg bg-muted/50">
                            <p>No projects added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};

export default Projects;
