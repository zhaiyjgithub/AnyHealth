import React from 'react'

const LoadingFooter = React.memo(({isHaxNextPage, style}) => {
	const title = isHaxNextPage ? 'Loading...' : 'No more records'
	return (
		<div style={style} className={'w-full  flex flex-row items-center justify-center bg-white'}>
			<p className={'text-base-black bg-white font-sm font-semibold'}>{title}</p>
		</div>
	)
})

LoadingFooter.defaultProps = {
	isHaxNextPage: true,
	style: {}
}

export default LoadingFooter
