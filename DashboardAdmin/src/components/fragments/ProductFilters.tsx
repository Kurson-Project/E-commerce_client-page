import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Search,
    X,
    SlidersHorizontal,
    Star,
    DollarSign
} from 'lucide-react';
import products from '@/data/product.json';

interface FilterState {
    search: string;
    category: string;
    status: string;
    priceRange: [number, number];
    rating: number;
    tools: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

interface ProductFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClearFilters: () => void;
}

const categories = [
    'All Categories',
    'Website Templates',
    'AI Agents',
];

const statuses = [
    'All Status',
    'Active',
    'Draft',
    'Archived'
];

const tools = products.reduce((acc, product) => [...acc, ...product.tools.map(tool => tool.name)], [] as string[]);

const sortOptions = [
    { value: 'title', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'sales', label: 'Sales' },
    { value: 'created_at', label: 'Date Created' }
];

export default function ProductFilters({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const toggleTool = (tool: string) => {
        const newTools = filters.tools.includes(tool)
            ? filters.tools.filter(t => t !== tool)
            : [...filters.tools, tool];
        updateFilter('tools', newTools);
    };

    const hasActiveFilters =
        filters.search !== '' ||
        filters.category !== 'All Categories' ||
        filters.status !== 'All Status' ||
        filters.priceRange[0] !== 0 ||
        filters.priceRange[1] !== 500 ||
        filters.rating !== 0 ||
        filters.tools.length > 0;

    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                {/* Basic Filters Row */}
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                    {/* Search */}
                    <div className="relative flex-1 min-w-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search products, categories, tools..."
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Category Filter */}
                    <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                        <SelectTrigger className="w-full lg:w-48">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                        <SelectTrigger className="w-full lg:w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Sort */}
                    <div className="flex items-center space-x-2">
                        <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {filters.sortOrder === 'asc' ? '↑' : '↓'}
                        </Button>
                    </div>

                    {/* Advanced Filters Toggle */}
                    <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Advanced
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3">Advanced Filters</h4>
                                </div>

                                {/* Price Range */}
                                <div className="space-y-3">
                                    <Label className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Price Range</span>
                                    </Label>
                                    <div className="px-2">
                                        <Slider
                                            value={filters.priceRange}
                                            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                                            max={500}
                                            min={0}
                                            step={5}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                            <span>${filters.priceRange[0]}</span>
                                            <span>${filters.priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div className="space-y-3">
                                    <Label className="flex items-center space-x-2">
                                        <Star className="w-4 h-4" />
                                        <span>Minimum Rating</span>
                                    </Label>
                                    <div className="flex space-x-2">
                                        {[0, 1, 2, 3, 4, 5].map((rating) => (
                                            <Button
                                                key={rating}
                                                variant={filters.rating === rating ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => updateFilter('rating', rating)}
                                                className="flex items-center space-x-1"
                                            >
                                                <Star className="w-3 h-3" />
                                                <span>{rating === 0 ? 'All' : rating}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tools Filter */}
                                <div className="space-y-3">
                                    <Label>Technologies</Label>
                                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                                        {tools.map((tool) => (
                                            <div key={tool} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={tool}
                                                    checked={filters.tools.includes(tool)}
                                                    onCheckedChange={() => toggleTool(tool)}
                                                />
                                                <Label htmlFor={tool} className="text-sm cursor-pointer">
                                                    {tool}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex space-x-2 pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onClearFilters}
                                        className="flex-1"
                                    >
                                        Clear All
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => setIsAdvancedOpen(false)}
                                        className="flex-1"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={onClearFilters}>
                            <X className="w-4 h-4 mr-2" />
                            Clear
                        </Button>
                    )}
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                        {filters.search && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>Search: {filters.search}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('search', '')}
                                />
                            </Badge>
                        )}

                        {filters.category !== 'All Categories' && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>{filters.category}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('category', 'All Categories')}
                                />
                            </Badge>
                        )}

                        {filters.status !== 'All Status' && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>{filters.status}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('status', 'All Status')}
                                />
                            </Badge>
                        )}

                        {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500) && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('priceRange', [0, 500])}
                                />
                            </Badge>
                        )}

                        {filters.rating > 0 && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>{filters.rating}+ stars</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('rating', 0)}
                                />
                            </Badge>
                        )}

                        {filters.tools.map((tool) => (
                            <Badge key={tool} variant="secondary" className="flex items-center space-x-1">
                                <span>{tool}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => toggleTool(tool)}
                                />
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}