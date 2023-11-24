export default function Footer() {
	return (
		<div className="border-slate-300/10 border-t-2 border-l-0 border-r-0 border-b-0 text-gray-400 mt-6 border-solid text-offwhite-50 text-center flex flex-col justify-center mb-1">
			<div className="text-offwhite-50 text-center flex justify-center">
				<div className="flex-col pt-5 pb-5 relative">
					<div className="flex flex-col">
						<div className="flex flex-row justify-between  mb-1">
							<div className="flex-col flex">
								<small>2023 UGA Geoguessr</small>
							</div>
							<div className="flex flex-col text-right">
								<small>Evan Hanson, Calvin Chau, Nand, and Leo Maneein</small>
							</div>
						</div>
						<small className="text-xs text-left">
							UGA Geoguessr is a student-made project for a web development class and is in no way related
							to the University of Georgia.
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
