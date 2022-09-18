import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { Spacer } from "../utils/spacer";
import Img1 from "../public/images/both-2.jpg";
import Img2 from "../public/images/woman-3.png";
import Img3 from "../public/images/man-2.png";
import line from "../public/images/line.png";
import { Input } from "../components/input";
import flower from "../public/images/flower1.png";
import { useRouter } from "next/router";
import { AuthCtxt } from "./_app";
import AOS from "aos";
import "aos/dist/aos.css";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Index = () => {
	const router = useRouter();
	const { isAuthenticated } = useContext(AuthCtxt);
	const [registry, setRegistry] = useState([]);
	const [checkedItem, setCheckedItem] = useState("");
	const [userData, setUserData] = useState({
		name: "",
		phone: "",
	});
	const [added, setAdded] = useState("");
	const [failed, setFailed] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		AOS.init();
	}, []);

	useEffect(() => {
		async function fetchGuests() {
			try {
				//@ts-ignore
				let list = [];
				const querySnapshot = await getDocs(collection(db, "gifts-registry"));
				querySnapshot.forEach(doc => {
					list.push(doc.data());
				});
				//@ts-ignore

				setRegistry(list);
			} catch (error) {
				console.log(error);
			}
		}

		fetchGuests();
	}, []);

	async function confirmPresence() {
		setLoading(true);
		try {
			const res = await setDoc(doc(db, "dave-becky", userData.phone), {
				Name: userData.name,
				phone: userData.phone,
				time: new Date().toLocaleString(),
			});
			setAdded(
				"You have been successfully added to the guest list for the ceremony 🎉"
			);
			setTimeout(() => {
				setAdded("");
			}, 4000);
			setLoading(false);

			setUserData({ name: "", phone: "" });
		} catch (e) {
			setFailed("Oops!! Something went wrong please try again later 😕");
			setTimeout(() => {
				setFailed("");
			}, 4000);
			setLoading(false);
		}
	}

	if (!isAuthenticated && typeof window !== "undefined") {
		router.push("/auth");
	}

	return (
		<div className="mx-auto">
			<div className="w-full fixed z-50 bg-[#fcf9f7] sm:py-3 py-0">
				<Navbar />
			</div>

			<div
				id="home"
				className="flex flex-col items-center justify-center space-y-3">
				<Spacer className="h-48" />

				<p className="text-[#C6754D] font-sans text-2xl font-light">
					Please join us to celebrate
				</p>
				<p className="text-[#2B1105] font-sans text-7xl text-center">
					Becky <br className="sm:hidden" />& <br className="sm:hidden" />
					David
				</p>
				<p className="text-[#C6754D] font-sans text-2xl font-light">
					December 23rd, 2022 - Buea
				</p>
			</div>

			<Spacer className="h-12" />

			<section className="flex items-center justify-center">
				<div data-aos="zoom-in" data-aos-duration="3000" className="w-[900px]">
					<Image src={Img1} alt="" />
				</div>
			</section>

			<div id="story">
				<Spacer className="h-36" />

				<p className="text-7xl text-center">Our Story</p>

				<Spacer className="h-12" />

				<div className=" bg-[#97917A] bg-opacity-60 flex justify-center">
					{" "}
					<div className="sm:flex items-center sm:space-x-8 justify-center sm:w-[70%] w-[80%]">
						<div className="sm:w-1/2">
							<Spacer className="h-14" />

							<div
								data-aos="zoom-in"
								data-aos-duration="3000"
								style={{ shapeOutside: "circle(50%)" }}
								className="rounded-full block w-[150px] h-[150px] float-left mr-6">
								<Image
									src={Img2}
									width={150}
									height={150}
									layout="fixed"
									className="rounded-full"
								/>
							</div>
							<p className="text-justify font-sans text-lg text-white">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</p>

							<Spacer className="h-14" />
						</div>

						<div className="sm:hidden">
							<Image src={line} alt="" />
						</div>

						<div className="sm:w-1/2 ">
							<Spacer className="h-14" />
							<div
								data-aos="zoom-in"
								data-aos-duration="3000"
								style={{ shapeOutside: "circle(50%)" }}
								className="rounded-full block w-[150px] h-[150px] float-right ml-6">
								<Image
									src={Img3}
									width={150}
									height={150}
									layout="fixed"
									className="rounded-full"
								/>
							</div>

							<p className="text-justify font-sans text-lg text-white">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</p>

							<Spacer className="h-14" />
						</div>
					</div>
				</div>
			</div>

			{/* ITINERARY */}

			<div className="itinerary">
				<div id="itinerary">
					<Spacer className="h-36" />

					<p className="text-5xl text-center font-sans">Itinerary</p>

					<Spacer className="h-8" />

					<div className="sm:w-[60%] w-[80%] mx-auto">
						<div className=" space-y-2 mx-auto">
							<p className="text-2xl text-center text-[#2B1105] text-opacity-80">
								Tuesday, 23rd December 2022
							</p>
							<p className="text-2xl text-center text-[#2B1105] text-opacity-80">
								Holy Mountain Church of Worship - Mile 17, Buea
							</p>
						</div>

						<Spacer className="h-8" />

						<div className=" mx-auto">
							<Spacer className="h-12" />

							<div className="mx-auto">
								<p className="w-full flex items-center justify-between">
									<span className="text-xl text-[#2B1105] text-opacity-80">
										10:00 am:
									</span>
									<span className="text-xl text-right">
										Start of the church service
									</span>
								</p>

								<Spacer className="h-8" />

								<p className="w-full flex items-center justify-between">
									<span className="text-xl text-[#2B1105] text-opacity-80">
										12:00 am:{" "}
									</span>
									<span className="text-xl text-right">
										End of the church service
									</span>
								</p>

								<Spacer className="h-8" />

								<p className="w-full flex items-center justify-between">
									<span className="text-xl text-[#2B1105] text-opacity-80">
										16:00 pm:{" "}
									</span>
									<span className="text-xl text-right">Reception</span>
								</p>
							</div>

							<Spacer className="h-8" />
						</div>
					</div>
				</div>

				{/* GIFTS */}

				<div id="gifts & registry">
					<Spacer className="h-36" />

					<p className="text-5xl text-center font-sans">Gifts</p>

					<Spacer className="h-8" />

					<div className="sm:w-[60%] w-[85%] mx-auto text-[#2B1105] text-opacity-80">
						<div className="mx-auto">
							<p className="font-sans text-center text-xl">
								For all cash gifts please use the details below:
							</p>

							<Spacer className="h-8" />

							<p className="w-full flex flex-wrap items-center justify-between">
								<span className="text-xl text-[#2B1105] text-opacity-80">
									MTN Momo 1
								</span>
								<span className="text-xl font-bold">
									674743099 (Name: Dave Claig)
								</span>
							</p>

							<Spacer className="h-8" />

							<p className="w-full flex flex-wrap items-center justify-between">
								<span className="text-xl text-[#2B1105] text-opacity-80">
									MTN Momo 2
								</span>
								<span className="text-xl font-bold">
									671890867 (Name: Becky Namondo)
								</span>
							</p>
						</div>

						<Spacer className="h-16" />

						<p className="font-sans text-center text-xl">
							In case you to want get a gift for the couple, the following are
							most recommended. Please select any of the following:
						</p>
						<Spacer className="h-8" />

						<div className="flex flex-col sm:w-1/2 text-black mx-auto">
							{registry.map((item, idx) => {
								const isChecked =
									//@ts-ignore
									checkedItem === item.name || item.status === "checked";

								return (
									<button
										key={idx}
										//@ts-ignore
										onClick={() => setCheckedItem(item.name)}
										className="flex space-x-3 items-center justify-between relative border border-black rounded-lg px-3  mb-2">
										<div className="flex items-center space-x-3">
											{isChecked ? (
												<svg
													id="referral"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24">
													<path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z" />
												</svg>
											) : (
												<span
													className="w-5 h-5 mr-1 border-2 border-black"
													id="referral"
												/>
											)}
											<label
												htmlFor="referral"
												className="text-2xl font-sans-body">
												{/* @ts-ignore */}
												{item.name}
											</label>
										</div>
										{/* @ts-ignore */}
										{item.status === "checked" && (
											<span className="text-sm text-white border rounded-full px-3 bg-[#97917A] bg-opacity-50 font-sans-body">
												Item Taken
											</span>
										)}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<Spacer className="h-8" />

			{/* RSVP */}

			<div id="RSVP" className="relative">
				<p className="text-5xl text-center font-sans">RSVP</p>

				<div className="flex absolute left-0 right-0 top-0 mx-auto justify-center">
					<Image src={flower} />
				</div>

				<Spacer className="h-12" />

				<div className=" bg-[#97917A] bg-opacity-60 rsvp">
					<Spacer className="h-8" />

					<p className="font-sans text-white text-center sm:text-2xl text-xl">
						Please kindly provide your details below to confirm your presence at
						the ceremony
					</p>

					<Spacer className="h-8" />

					<div className="sm:w-[30%] w-[80%] mx-auto">
						<Input
							largeLabel
							value={userData.name}
							label="Full Name"
							onChange={e => setUserData({ ...userData, name: e.target.value })}
						/>

						<Spacer className="h-3" />

						<Input
							largeLabel
							value={userData.phone}
							label="Phone Number"
							onChange={e =>
								setUserData({ ...userData, phone: e.target.value })
							}
						/>

						<Spacer className="h-4" />

						{added && (
							<div className="bg-green-500 px-3 py-2 rounded-lg">
								<p className="text-lg font-sans-body text-center text-white">
									{added}
								</p>
							</div>
						)}
						{failed && (
							<div className="bg-red-400 px-3 py-2 rounded-lg">
								<p className="text-lg font-sans-body text-center text-white">
									{added}
								</p>
							</div>
						)}

						<Spacer className="h-4" />

						<div className="w-full flex items-center justify-center">
							<button
								onClick={confirmPresence}
								className="border rounded-lg px-8 py-2 bg-black bg-opacity-25 text-white cursor-pointer">
								{loading ? "Please wait ..." : "Submit"}
							</button>
						</div>
					</div>

					<Spacer className="h-28" />
				</div>
			</div>

			<Spacer className="h-4" />

			<p className="font-sans text-center ">Done with ❤️ by Neville</p>

			<Spacer className="h-6" />
		</div>
	);
};

export default Index;
