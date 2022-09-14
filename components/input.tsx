import React, { ReactNode } from "react";
import classNames from "classnames";
import { Spacer } from "../utils/spacer";

interface InputProps {
	id?: string;
	label?: string | JSX.Element;
	subLabel?: string;
	placeholder?: string;
	error?: string;
	hideLabel?: boolean;
	largeLabel?: boolean;
	min?: string;
	max?: string;
	type?: "search" | "date" | "text" | "number" | "phone" | "password" | "email";
	value?: string;
	className?: string;
	alwaysShowMask?: boolean;
	mask?: string;
	disabled?: boolean;
	readOnly?: boolean;
	smallPrefix?: boolean;
	prefix?: ReactNode;
	onKeyPress?: (event: any) => void;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input: React.FC<InputProps> = ({
	placeholder,
	error,
	onChange,
	id,
	label,
	largeLabel,
	value,
	className,
	disabled,
	min,
	max,
}) => {
	return (
		<div className="w-full flex flex-col">
			{label ? (
				<>
					<label
						className={classNames("font-sans text-[#2B1105]", {
							"text-lg font-medium": largeLabel,
							"text-sm font-semibold": !largeLabel,
						})}
						htmlFor={id}>
						{label}
					</label>

					<Spacer className="h-1" />
				</>
			) : null}

			<div className=" flex flex-col w-full">
				<input
					id={id}
					className={classNames(
						"box-border w-full rounded-lg h-14 py-4 px-3",
						className,
						{
							"border border-red-100 bg-red-100": error,
							"border border-neutral-200 focus:ring-1 focus:ring-blue-100":
								!error && !disabled,
						}
					)}
					min={min}
					max={max}
					placeholder={error ? "" : placeholder}
					onChange={onChange}
					value={value}
				/>
				{error ? (
					<p className=" text-red-100 text-sm font-sans-body mt-2">{error}</p>
				) : null}
			</div>
		</div>
	);
};
