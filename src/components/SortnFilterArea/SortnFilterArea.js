"use client"
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { ArrowDown01Icon, SlidersHorizontalIcon } from 'lucide-react';
import useSortnFilter from '@/hooks/useSortnFilter';
import { filterOptions, sortOptions } from '@/context/SortnFilterContext';

const SortnFilterArea = () => {
    // const { selectedDateTodos } = useTodo();
    const {
        sortOption,
        setSortOption,
        filterOption,
        setFilterOption
    } = useSortnFilter();
    return (
        <>
            <div className='flex items-start justify-start gap-x-4'>
                <Select defaultValue={sortOption} onValueChange={(value) => setSortOption(value)}>
                    <SelectTrigger>
                        <div className='flex items-center justify-center gap-2 px-2 py-4'>
                            <ArrowDown01Icon className='h-5 w-5' />
                            <span>Sort Tasks By</span>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option, index) => (
                            <SelectItem className='capitalize' key={index} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select defaultValue={filterOption} onValueChange={(value) => setFilterOption(value)}>
                    <SelectTrigger>
                        <div className='flex items-center justify-center gap-2 px-2 py-4'>
                            <SlidersHorizontalIcon className='h-5 w-5' />
                            <span>Filter Tasks</span>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {filterOptions.map((option, index) => (
                            <SelectItem className='capitalize' key={index} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>

        </>
    )
}

export default SortnFilterArea