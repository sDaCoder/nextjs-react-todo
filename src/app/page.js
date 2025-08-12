import React from 'react'
import HeroHome from '@/components/HeroHome/HeroHome'
import DeviceMocks from '@/components/DeviceMocks/DeviceMocks'
import FeatureGrid from '@/components/FeatureGrid/FeatureGrid'
import Footer from '@/components/Footer/Footer'

const page = () => {
	return (
		<>
			<HeroHome />
			<FeatureGrid />
			<DeviceMocks />
			{/* <Footer /> */}
		</>
	)
}

export default page