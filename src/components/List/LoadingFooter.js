import React from 'react'

const LoadingFooter = React.memo(({isHaxNextPage, style}) => {
	const title = isHaxNextPage ? 'Loading...' : 'No more records'
	return (
		<div style={style} className={'w-full flex flex-row items-center justify-center h-16'}>
			<div className={'animate-spin h-10 w-10 flex flex-row items-center justify-center'}>
				<i className="fas fa-spinner text-primary"></i>
			</div>
			<p className={'text-base-black bg-white font-sm font-semibold'}>{title}</p>
		</div>
	)
})

LoadingFooter.defaultProps = {
	isHaxNextPage: true,
	style: {}
}

export default LoadingFooter
