import React, { ReactNode, createContext, useContext, useState } from "react";

interface GameIdContextProps {
	children: ReactNode;
}

interface GameIdContextValue {
	getNextId: () => number;
}

const GameIdContext = createContext<GameIdContextValue | undefined>(undefined);

export const GameIdProvider: React.FC<GameIdContextProps> = ({ children }) => {
	const [nextId, setNextId] = useState(1);

	const getNextId = (): number => {
		const currentId = nextId;
		setNextId((prevId) => prevId + 1);
		return currentId;
	};

	const contextValue: GameIdContextValue = {
		getNextId,
	};

	return <GameIdContext.Provider value={contextValue}>{children}</GameIdContext.Provider>;
};

export const useGameId = (): GameIdContextValue => {
	const context = useContext(GameIdContext);
	if (!context) {
		throw new Error("useGameId must be used within a GameIdProvider");
	}
	return context;
};
