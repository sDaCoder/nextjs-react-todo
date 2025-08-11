import React from 'react'
import HeroHome from '@/components/HeroHome/HeroHome'
import DeviceMocks from '@/components/DeviceMocks/DeviceMocks'

const page = () => {
	return (
		<>
			{/* https://ui.aceternity.com/components/bento-grid */}
			{/* Will use it in my bento grid */}
			<HeroHome />
			<DeviceMocks />
		</>
	)
}

export default page