import { format } from 'date-fns'
import UserAvatar from '../UserAvatar/UserAvatar'

const TimeBar = ({currentDate}) => {
  return (
    <div className='flex items-center justify-around p-2 bg-primary'>
        <h1 className='text-primary-foreground font-bold py-2 text-center text-xl'>
            {format(new Date(currentDate), "MMMM, yyyy")}
        </h1> 
        <div className='self-end'>
            <UserAvatar />
        </div>
    </div>
  )
}

export default TimeBar
