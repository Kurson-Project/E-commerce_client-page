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
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import {
    Search,
    X,
    SlidersHorizontal,
    Calendar as CalendarIcon,
    DollarSign
} from 'lucide-react';
import { format } from 'date-fns';

interface OrderFilterState {
    search: string;
    status: string;
    paymentMethod: string;
    amountRange: [number, number];
    dateRange: {
        from: Date | undefined;
        to: Date | undefined;
    };
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

interface OrderFiltersProps {
    filters: OrderFilterState;
    onFiltersChange: (filters: OrderFilterState) => void;
    onClearFilters: () => void;
}

const statuses = [
    'All Status',
    'Completed',
    'Processing',
    'Pending',
    'Refunded',
    'Cancelled'
];

const paymentMethods = [
    'All Methods',
    'Credit Card',
    'PayPal',
    'Bank Transfer',
    'Cryptocurrency'
];

const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'customer', label: 'Customer' },
    { value: 'status', label: 'Status' }
];

export default function OrderFilters({ filters, onFiltersChange, onClearFilters }: OrderFiltersProps) {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const updateFilter = (key: keyof OrderFilterState, value: OrderFilterState[keyof OrderFilterState]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const hasActiveFilters =
        filters.search !== '' ||
        filters.status !== 'All Status' ||
        filters.paymentMethod !== 'All Methods' ||
        filters.amountRange[0] !== 0 ||
        filters.amountRange[1] !== 1000 ||
        filters.dateRange.from ||
        filters.dateRange.to;

    return (
        <Card>
            <CardContent className="space-y-4">
                {/* Basic Filters Row */}
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                    {/* Search */}
                    <div className="relative flex-1 min-w-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search orders, customers, products..."
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Status Filter */}
                    <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                        <SelectTrigger className="w-full lg:w-40">
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

                    {/* Payment Method Filter */}
                    <Select value={filters.paymentMethod} onValueChange={(value) => updateFilter('paymentMethod', value)}>
                        <SelectTrigger className="w-full lg:w-40">
                            <SelectValue placeholder="Payment" />
                        </SelectTrigger>
                        <SelectContent>
                            {paymentMethods.map((method) => (
                                <SelectItem key={method} value={method}>
                                    {method}
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

                                {/* Amount Range */}
                                <div className="space-y-3">
                                    <Label className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Amount Range</span>
                                    </Label>
                                    <div className="px-2">
                                        <Slider
                                            value={filters.amountRange}
                                            onValueChange={(value) => updateFilter('amountRange', value as [number, number])}
                                            max={1000}
                                            min={0}
                                            step={10}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                            <span>${filters.amountRange[0]}</span>
                                            <span>${filters.amountRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="space-y-3">
                                    <Label className="flex items-center space-x-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>Date Range</span>
                                    </Label>
                                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {filters.dateRange.from ? (
                                                    filters.dateRange.to ? (
                                                        <>
                                                            {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                                                            {format(filters.dateRange.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(filters.dateRange.from, "LLL dd, y")
                                                    )
                                                ) : (
                                                    <span>Pick a date range</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={filters.dateRange.from}
                                                selected={filters.dateRange}
                                                onSelect={(range) => updateFilter('dateRange', range as { from: Date | undefined; to: Date | undefined; })}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
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

                        {filters.status !== 'All Status' && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>{filters.status}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('status', 'All Status')}
                                />
                            </Badge>
                        )}

                        {filters.paymentMethod !== 'All Methods' && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>{filters.paymentMethod}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('paymentMethod', 'All Methods')}
                                />
                            </Badge>
                        )}

                        {(filters.amountRange[0] !== 0 || filters.amountRange[1] !== 1000) && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <span>${filters.amountRange[0]} - ${filters.amountRange[1]}</span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('amountRange', [0, 1000])}
                                />
                            </Badge>
                        )}

                        {(filters.dateRange.from || filters.dateRange.to) && (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                                <CalendarIcon className="w-3 h-3" />
                                <span>
                                    {filters.dateRange.from && format(filters.dateRange.from, "MMM dd")}
                                    {filters.dateRange.from && filters.dateRange.to && " - "}
                                    {filters.dateRange.to && format(filters.dateRange.to, "MMM dd")}
                                </span>
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => updateFilter('dateRange', { from: undefined, to: undefined })}
                                />
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}