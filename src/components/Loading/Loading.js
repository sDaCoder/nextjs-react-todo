const Loading = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className='bg-slate-200 animate-pulse w-[25px] h-[25px] rounded-full'>
        </div>
        <div className='bg-slate-200 animate-pulse w-[80vw] h-[2vh] rounded-md'>
        </div>
        <div className='bg-slate-200 animate-pulse w-[80vw] h-[2vh] rounded-md'>
        </div>
        <div className='bg-slate-200 animate-pulse w-[80vw] h-[2vh] rounded-md'>
        </div>
      </div>
    </>
  )
}

export default Loading
