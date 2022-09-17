import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Spacer } from "../utils/spacer";

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
			<div className="sm:w-[60%] w-[80%] bg-[white] mx-auto translate-y-10 border shadow-lg rounded-lg px-8 py-6">
				<p className="text-3xl font-sans-body font-medium">Dashboard</p>

				<Spacer className="h-7" />

				<div className="flex items-center space-x-6">
					<p className="text-xl font-sans-body">TOTAL NUMBER OF GUESTS: </p>{" "}
					<p className="text-xl font-sans-body">{data.length}</p>
				</div>

				<Spacer className="h-7" />

				<div className="flex items-center justify-between w-full">
					<p className="font-semibold text-lg w-[5%]">#</p>

					<p className="font-semibold text-lg w-1/3">Name</p>
					<p className="font-semibold text-lg w-1/3 text-center">
						Phone Number
					</p>
					<p className="font-semibold text-lg w-1/3 text-right">Date</p>
				</div>

				<Spacer className="h-7" />

				{loading ? (
					<p className=" text-center">Loading Data ...</p>
				) : (
					data.map((data, idx) => {
						return (
							<div
								key={idx}
								className="flex w-full items-center justify-between">
								<p className="font-medium text-lg w-[5%]">{idx + 1}</p>
								<p className="font-medium text-lg w-1/3 text-left">
									{/* @ts-ignore */}

									{data.Name}
								</p>

								<p className="font-medium text-lg w-1/3 text-center">
									{/* @ts-ignore */}
									{data.phone}
								</p>

								<p className="font-medium text-lg w-1/3 text-right">
									{/* @ts-ignore */}
									{data.time.split(",")[0]}
								</p>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Admin;
