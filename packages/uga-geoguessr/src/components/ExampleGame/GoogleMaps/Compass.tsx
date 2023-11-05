import React, { useEffect, useState } from "react";
import "./Compass.css";

interface Props {
	heading: number;
}

const Compass: React.FC<Props> = ({ heading }) => {
	const full = 410.55;
	const half = full / 2;
	const quarter = full / 4;
	const [answer,setanswer] = useState(-full + quarter)

	const divStyle = {
		transform: `translateX(${answer }px)`,
	};

	useEffect(() => {
		// console.log(heading);
		const test = (-full+quarter - ((heading % 360 /360) * full));
		setanswer(test)
	}, [heading]);
	

	// I totally just ripped all the styling for this from geoguessr
	return (
		<div className="styles_compass-and-time-container__zP9rF text-white">
			<div className="styles_compass__fcGmP">
				<div style={divStyle}>
					<p className="styles_point__cXaqs">N</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">NE</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">E</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">SE</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">S</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">SW</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">W</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">NW</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
				</div>
				<div style={divStyle}>
					<p className="styles_point__cXaqs">N</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">NE</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">E</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">SE</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">S</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">SW</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">W</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">NW</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
				</div>
				<div style={divStyle}>
					<p className="styles_point__cXaqs">N</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">NE</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">E</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">SE</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">S</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">SW</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs">W</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<p className="styles_point__cXaqs styles_small__KDu3X">NW</p>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
					<span className="styles_divider__2906K"></span>
				</div>
			</div>
		</div>
	);
};

export default Compass;
