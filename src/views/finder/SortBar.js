import React from "react";

const SortBar = () => {
	return (
		<div className={'flex flex-row items-center justify-between p-2 border rounded mt-3'}>
			<p className={'font-semibold text-base text-primary font-mono'}>Doctors for you</p>
			<div className={'flex flex-row items-center'}>
				<p className={'font-semibold mr-2 text-base text-base-black'}>{'Sort: '}</p>
				<label className="inline-flex items-center">
					<input type="radio" className=" h-4 w-4 rounded-full" checked={true} />
					<span
						className="ml-2 text-gray-700 font-mono text-base">Default</span>
				</label>

				<label className="inline-flex items-center ml-4">
					<input type="radio" className=" h-4 w-4 rounded-full" checked={false} />
					<span
						className="ml-2 text-gray-700 font-mono text-base font-semibold">By distance</span>
				</label>
			</div>
		</div>
	)
}

export default SortBar
