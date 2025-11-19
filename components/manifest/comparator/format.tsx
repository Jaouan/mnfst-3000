import { ReactNode } from "react";

export const renderValue = (value: unknown): ReactNode => {
	if (value === null) return <span className="opacity-50 italic">null</span>;
	if (value === undefined)
		return <span className="opacity-50 italic">undefined</span>;
	if (typeof value === "string") return `"${value}"`;
	if (typeof value === "number" || typeof value === "boolean")
		return String(value);
	return JSON.stringify(value, null, 2);
};
