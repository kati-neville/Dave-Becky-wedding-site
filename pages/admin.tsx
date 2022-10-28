import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Spacer } from "../utils/spacer";

export const Status: React.FC<{ status: "Pending" | "Accepted" }> = ({
	status = "Pending",
}) => {
	return (
		<div
			className={
				status === "Pending"
					? "border-2 rounded-full bg-yellow-500 text-white"
					: "border-2 rounded-full bg-green-500 text-white"
			}>
			{status}
		</div>
	);
};

const Admin = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchGuests() {
			setLoading(true);
			try {
				//@ts-ignore
				let list = [];
				const querySnapshot = await getDocs(collection(db, "dave-becky"));
				querySnapshot.forEach(doc => {
					list.push(doc.data());
				});
				//@ts-ignore

				setData(list);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}

		fetchGuests();
	}, []);

	return (
		<div className="w-full h-screen bg-gray-300 font-sans-body">
			<div className="sm:w-[60%] w-[90%] bg-[white] mx-auto translate-y-10 border shadow-lg rounded-lg px-8 py-6">
				<p className="text-3xl font-sans-body font-medium">Dashboard</p>

				<Spacer className="h-7" />

				<div className="flex items-center space-x-6">
					<p className="sm:text-xl font-sans-body">TOTAL NUMBER OF GUESTS: </p>{" "}
					<p className="text-xl font-sans-body">{data.length}</p>
				</div>

				<Spacer className="h-7" />

				<div className="flex items-center justify-between w-full">
					<p className="font-semibold sm:text-lg w-[5%] mr-3 sm:mr-0">#</p>

					<p className="font-semibold sm:text-lg sm:w-1/4 w-1/2">Name</p>
					<p className="font-semibold sm:text-lg sm:w-1/4 w-1/2 text-center sm:block hidden">
						Phone
					</p>

					<p className="font-semibold text-lg sm:w-1/4 w-1/2 text-center sm:block hidden">
						Date
					</p>
					<p className="font-semibold sm:text-lg sm:w-1/4 w-1/2 text-center">
						Status
					</p>
				</div>

				<Spacer className="h-7" />

				{loading ? (
					<p className=" text-center">Loading Data ...</p>
				) : (
					data.map((data, idx) => {
						return (
							<div
								key={idx}
								className="flex w-full items-start mb-3 justify-between">
								<p className="font-medium sm:text-lg w-[5%] mr-3 sm:mr-0">
									{idx + 1}
								</p>
								<p className="font-medium sm:text-lg sm:w-1/4 w-1/2 text-left">
									{/* @ts-ignore */}

									{data.Name}
									<span className="font-medium text-xs sm:w-1/4 w-1/2 block sm:hidden">
										{/* @ts-ignore */}
										{data.time.split(",")[0]}
									</span>
								</p>

								<p className="font-medium sm:text-lg sm:w-1/4 w-1/2 text-center sm:block hidden">
									{/* @ts-ignore */}
									{data.phone}
								</p>

								<p className="font-medium text-lg w-1/4 sm:block hidden text-center">
									{/* @ts-ignore */}
									{data.time.split(",")[0]}
								</p>

								<div className="font-medium sm:text-lg sm:w-1/4 w-1/2 text-center">
									{/* @ts-ignore */}
									<Status />
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Admin;
