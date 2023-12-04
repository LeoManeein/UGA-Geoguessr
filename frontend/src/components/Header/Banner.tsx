interface Props {
	text: string;
}
const Banner: React.FC<Props> = ({ text }) => {
	return (
		<div className="text-6xl w-full sm:w-[320px] md:w-[384px] lg:w-[512px] xl:w-[640px] 2xl:w-[768px] mx-auto text-ugared-300 mb-12 border-b-4 border-ugared-500 pb-2 text-center">
			{text}
		</div>
	);
};

export default Banner;
