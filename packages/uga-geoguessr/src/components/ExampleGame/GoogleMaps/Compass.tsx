import React, { useEffect, useRef, useState } from "react";

interface Props {
	heading: number;
}

const Compass: React.FC<Props> = ({ heading }) => {
	const [fullWidth, setFullWidth] = useState(528);
	const [compassOffset, setCompassOffset] = useState(-fullWidth + +88);

	const divStyle = {
		transform: `translateX(${compassOffset}px)`,
	};

	useEffect(() => {
		const offset = -fullWidth + 88.5 - ((heading % 360) / 360) * fullWidth;
		setCompassOffset(offset);
	}, [, heading]);

	// Getting a ref to one of the compass parts to obtain it's width
	const myRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (myRef.current) {
			const fullWidth = myRef.current.getBoundingClientRect().width;
			setFullWidth(fullWidth);
		}
	}, []);

	// I totally just ripped all the styling for this from geoguessr
	return (
		<div className="compass_container text-white">
			<div className="compass_piece">
				<div style={divStyle} ref={myRef}>
					<p className="compass_text">N</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">NE</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">E</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">SE</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">S</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">SW</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">W</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">NW</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
				</div>
				<div style={divStyle}>
					<p className="compass_text">N</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">NE</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">E</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">SE</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">S</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">SW</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">W</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">NW</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
				</div>
				<div style={divStyle}>
					<p className="compass_text">N</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">NE</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">E</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">SE</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">S</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">SW</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text">W</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<p className="compass_text compass_small">NW</p>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
					<span className="divider"></span>
				</div>
			</div>
		</div>
	);
};

export default Compass;
