"use client"
import useTodo from '@/hooks/useTodo'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { ArrowDown01Icon, SlidersHorizontalIcon } from 'lucide-react';

const SortnFilterArea = () => {
    const { todos } = useTodo();
    return (
        <>
            {todos.length > 0 &&
                <div className='flex items-start justify-start gap-x-4'>
                    <Select defaultValue="deadline soonest" onValueChange={(value) => console.log(value)}>
                        <SelectTrigger>
                            <div className='flex items-center justify-center gap-2 px-2 py-4'>
                                <ArrowDown01Icon className='h-5 w-5' />
                                <span>Sort Tasks By</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='capitalize' value='deadline soonest'>deadline soonest</SelectItem>
                            <SelectItem className='capitalize' value='date added latest'>date added latest</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => console.log(value)}>
                        <SelectTrigger>
                            <div className='flex items-center justify-center gap-2 px-2 py-4'>
                                <SlidersHorizontalIcon className='h-5 w-5' />
                                <span>Filter Tasks</span>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='capitalize' value='incomplete'>incomplete</SelectItem>
                            <SelectItem className='capitalize' value='completed'>completed</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            }
        </>
    )
}

export default SortnFilterArea