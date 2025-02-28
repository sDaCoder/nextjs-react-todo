import { format } from 'date-fns'

const TimeBar = ({currentDate}) => {
  return (
    <>
        <h1 className='bg-primary text-primary-foreground font-bold py-2 text-center text-xl'>
            {format(new Date(currentDate), "MMMM, yyyy")}
        </h1> 
    </>
  )
}

export default TimeBar
