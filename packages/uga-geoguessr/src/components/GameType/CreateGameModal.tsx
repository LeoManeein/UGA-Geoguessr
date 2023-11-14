import React, { useState } from "react";
type LatLngLiteral = google.maps.LatLngLiteral;

interface props {
	example: number;
}

const CreateGameModal: React.FC<props> = ({ example }) => {
	return <div>{example}</div>;
};

export default CreateGameModal;
