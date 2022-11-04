import Image, { StaticImageData } from "next/image";
import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { Navbar } from "../components/navbar";
import { Spacer } from "../utils/spacer";
import Img1 from "../public/images/both.jpg";
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
import { TypeAnimation } from "react-type-animation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import close from "../public/images/close.png";
import { Gallery } from "../utils/gallery";

export function CarouselArrow({
	onClick,
	right,
}: PropsWithChildren<{
	onClick?: () => void;
	right?: boolean;
	className?: string;
}>) {
	return (
		<button
			onClick={onClick}
			className={`rounded-full flex text-center items-center justify-center text-4xl text-gold z-10 top-1/2 absolute w-10 h-10
			 ${right ? "sm:-right-6 -right-10" : "-left-10 sm:-left-6  rotate-180"}
			`}>
			<span>{">"}</span>
		</button>
	);
}

const Index = () => {
	const router = useRouter();
	const { isAuthenticated, setShowPreview, showPreview } = useContext(AuthCtxt);
	const [registry, setRegistry] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [viewMap, setViewMap] = useState<"church" | "reception">();
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

	const settings2 = {
		dots: false,
		infinite: true,
		fade: true,
		speed: 750,
		slidesToScroll: 1,
		nextArrow: <CarouselArrow right />,
		prevArrow: <CarouselArrow />,
	};

	function getLocation() {
		if (typeof window !== "undefined") {
			console.log();
		}
	}

	getLocation();

	useEffect(() => {
		if (isLoading) {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		}
	}, [isLoading]);

	if (!isAuthenticated && typeof window !== "undefined") {
		router.push("/auth");
	}

	return (
		<div className={showPreview ? "h-screen overflow-y-hidden" : ""}>
			{showPreview ? (
				<div className="absolute bg-black w-full h-screen bg-opacity-90 z-[100]">
					<button
						onClick={() => setShowPreview(false)}
						className="text-5xl font-sans mt-10 pr-10 flex justify-end w-full">
						<Image src={close} alt="" width={40} height={40} />
					</button>
					<div className="grid grid-cols-1 lg:gap-4 sm:w-2/3 w-4/5 relative sm:translate-y-[2%] translate-y-[15%] mx-auto">
						<>
							<Slider className="" {...settings2}>
								{Gallery?.map((image, idx) => {
									return (
										<div key={`SCGRP-${idx}`}>
											<div className="sm:flex justify-center hidden mx-auto">
												<Image
													src={image}
													alt=""
													height={700}
													width={500}
													placeholder="blur"
													objectFit="contain"
												/>
											</div>
											<div className="block sm:hidden mx-auto">
												<Image src={image} alt="" placeholder="blur" />
											</div>
										</div>
									);
								})}
							</Slider>
						</>
					</div>
				</div>
			) : null}

			<div className="mx-auto">
				<div className="w-full fixed z-50 sm:py-3 py-0 bg-[#0B090E]">
					<Navbar />
				</div>

				<section className="flex flex-col relative items-center justify-center">
					<div
						id="home"
						className="flex flex-col items-center justify-center  space-y-3 z-20">
						<Spacer className="h-48" />

						<div className="sm:block hidden">
							<TypeAnimation
								sequence={["Please", 1000, "Please join us to celebrate"]}
								wrapper="div"
								cursor={false}
								repeat={1}
								style={{ fontSize: "4rem", color: "#fff" }}
							/>
						</div>

						<div className="sm:hidden block">
							<TypeAnimation
								sequence={["Please", 1000, "Please join us to celebrate"]}
								wrapper="div"
								cursor={false}
								repeat={1}
								style={{ fontSize: "1.5rem", color: "#fff" }}
							/>
						</div>

						<p className="text-gold font-sans text-7xl sm:text-[8rem] text-center">
							Becky <br className="sm:hidden" />& <br className="sm:hidden" />
							David
						</p>
						<p className="text-white font-sans sm:text-5xl text-2xl font-light">
							December 23rd, 2022 - Buea
						</p>

						<Spacer className={"h-12"} />
					</div>

					<Spacer className="h-12" />

					{/* <div data-aos="zoom-in" data-aos-duration="3000" className="">
					<Image src={Img1} alt="" />
				</div> */}
				</section>

				<div id="story">
					<Spacer className="h-36" />

					<p className="text-7xl text-center text-gold">Our Story</p>

					<Spacer className="h-12" />

					<div className=" bg-[#97917A] bg-opacity-60 flex justify-center">
						{" "}
						<div className="sm:flex items-start sm:space-x-8 justify-center sm:w-[70%] w-[80%]">
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
									Six years ago, I never realized that the guy I spotted playing
									the bass guitar in church would end up being my man.😅 When I
									said "yes" to you, the only thing on my mind was that I wanted
									to be happy all my life, and for me, happiness is being with
									you. Life has become more beautiful since I met you. You have
									seen me through the best and worst phases of life and have
									always been my pillar of strength and reason to smile. Thank❤️
									you for your constant love and friendship, and thank you for
									trusting me to partner with you on this journey. I know now
									for sure that I would walk down the aisle for no one but you.
									Let's drive our way through a wonderful life together. I love
									you, my darling. ❤️
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
									You gave me a reason to love again. You complete me, and your
									kind heart melts my heart. The memories are in thousands of
									different, lovely colors, all painted by your kind heart. I
									remember when I was on outreach with kids at the orphanage
									before, I realized you had prepared snacks for all the kids,
									making them happy. I will choose you again and again, because
									in you I found an outstanding woman, a calm and gentle soul,
									and a Jesus lover. You are a gift from God to me. ❤️
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

						<p className="text-5xl text-center font-sans text-gold">
							Itinerary
						</p>

						<Spacer className="h-8" />

						<div className="sm:w-[60%] w-[80%] mx-auto">
							<div className=" space-y-2 mx-auto">
								<p className="text-3xl text-center text-neutral-300 text-opacity-80">
									Friday, 23rd December 2022
								</p>
							</div>

							<Spacer className="h-8" />

							<div className="mx-auto">
								<Spacer className="h-6" />

								<div className="mx-auto sm:w-3/4">
									<p className="w-full flex flex-col space-y-4 items-center justify-center">
										<span className="text-3xl text-[#a59049]">
											Church service
										</span>

										<span className="text-2xl text-[#fff] text-opacity-80">
											12:00 pm - 2:00 pm
										</span>
										<span className="text-2xl text-center font-medium text-[#fff] text-opacity-80">
											Holy Mountain of Worship Church - Mile 17, Buea
										</span>
									</p>
									<Spacer className="h-8" />
									<p className="flex flex-col space-y-4 items-center justify-center">
										<span className="text-3xl text-right text-[#a59049]">
											Reception
										</span>
										<span className="text-2xl text-[#fff] text-opacity-80">
											04:00 pm
										</span>

										<span className="text-2xl text-center text-[#fff] text-opacity-80">
											Former CEFAM, currently NASLA (National Advanced School of
											Local Administration)
										</span>
									</p>

									<Spacer className="h-5" />

									<div className="text-gold w-full text-2xl flex sm:flex-row flex-col items-center text-center">
										{" "}
										<span className="sm:text-gold text-[#a59049] sm:mb-0 mb-2">
											COLORS:{" "}
										</span>
										<span className="inline-flex items-center space-x-2 m-1">
											<span>Emerald Green</span>{" "}
											<span className="bg-[#50C878] w-8 h-8 inline-block rounded-full"></span>
										</span>
										<span className="inline-flex items-center space-x-2 m-1">
											<span>/ burnt orange</span>
											<span className="bg-[#CC5500] w-8 h-8 inline-block rounded-full"></span>
										</span>
										<span className="inline-flex items-center space-x-2 m-1">
											<span>/ silver</span>
											<span className="bg-[#C0C0C0] w-8 h-8 inline-block rounded-full"></span>
										</span>
									</div>
								</div>

								<Spacer className="h-8" />
							</div>
						</div>
					</div>

					{/* GIFTS */}

					<div id="gifts & registry">
						<Spacer className="h-36" />

						<p className="text-5xl text-center font-sans text-gold">Gifts</p>

						<Spacer className="h-8" />

						<div className="sm:w-[60%] w-[85%] mx-auto text-[#2B1105] text-opacity-80">
							<div className="mx-auto">
								<p className="font-sans text-center text-xl text-neutral-200">
									For all cash gifts please use the details below:
								</p>

								<Spacer className="h-8" />

								<p className="w-full flex flex-wrap items-center justify-between text-neutral-200">
									<span className="text-xl text-opacity-80">MTN Momo 1</span>
									<span className="text-xl font-bold">
										674743099 (Name: David Claig)
									</span>
								</p>

								<Spacer className="h-8" />

								<p className="w-full flex flex-wrap items-center justify-between text-neutral-200">
									<span className="text-xl text-opacity-80 ">MTN Momo 2</span>
									<span className="text-xl font-bold">
										671890867 (Name: Becky Namondo)
									</span>
								</p>
							</div>

							<Spacer className="h-16" />

							<p className="font-sans text-center text-xl text-neutral-200">
								Your presence at our wedding is present enough! However, for
								friends and family who have been asking for gift ideas, below
								are some items we’d find the most useful as we prepare for
								married life. In No way should you feel pressured to get these
								listed ones, every present will be highly appreciated.
							</p>
							<Spacer className="h-8" />

							<div className="flex flex-col  lg:w-3/4 w-full text-black mx-auto">
								{registry.map((item, idx) => {
									// const isChecked =
									// 	//@ts-ignore
									// 	checkedItem === item.name || item.status === "checked";

									return (
										<button
											key={idx}
											//@ts-ignore
											onClick={() => setCheckedItem(item.name)}
											className="flex space-x-3 items-center justify-between relative border border-white rounded-lg px-3  mb-2">
											<div className="flex items-center space-x-3">
												{/* {isChecked ? (
												<svg
													id="referral"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													fill="white"
													viewBox="0 0 24 24">
													<path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z" />
												</svg>
											) : (
												<span
													className="w-5 h-5 mr-1 border-2 border-neutral-200"
													id="referral"
												/>
											)} */}
												<label
													htmlFor="referral"
													className="sm:text-2xl font-sans-body text-neutral-200">
													{/* @ts-ignore */}
													{item.name}
												</label>
											</div>
											{/* @ts-ignore */}
											{/* {item.status === "checked" && (
											<span className="text-sm text-white border rounded-full px-3 bg-[#97917A] bg-opacity-50 font-sans-body">
												Taken
											</span>
										)} */}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				<Spacer className="h-8" />

				<div className="sm:w-[45%] w-3/4 mx-auto flex sm:flex-row flex-col items-center sm:space-x-3 sm:space-y-0 space-y-3 my-4 text-white justify-center">
					<button
						onClick={() => {
							if (viewMap === "church") {
								setViewMap(undefined);
							} else {
								setViewMap("church");
								setIsLoading(loading => !loading);
							}
						}}
						className="border w-full border-neutral-300 px-3 py-2 rounded-md bg-[#97917A] text-white font-sans-body">
						Church Location{" "}
						<span className="text-sm">
							({viewMap === "church" ? "open" : "closed"})
						</span>
					</button>
					<button
						onClick={() => {
							if (viewMap === "reception") {
								setViewMap(undefined);
								return;
							} else {
								setViewMap("reception");
								setIsLoading(loading => !loading);
							}
						}}
						className="border w-full border-neutral-300 px-3 py-2 rounded-md bg-[#97917A] text-white font-sans-body">
						Reception Location{" "}
						<span className="text-sm">
							({viewMap === "reception" ? "open" : "closed"})
						</span>
					</button>
				</div>

				<div className="relative w-full">
					{isLoading ? (
						<div className="absolute top-1/3 left-1/2">
							<div className="h-14 w-14 rounded-full border-4 border-t-[#97917A]  border-r-[#97917A]  border-primary-200 animate-spin mr-3"></div>
						</div>
					) : null}

					{viewMap === "reception" ? (
						<div className="mapouter sm:h-[32.3rem] z-30 mx-auto sm:w-[42.2rem] relative text-right">
							<div className="gmap_canvas  overflow-hidden bg-none">
								<iframe
									className="h-[32.3rem] sm:w-[42.2rem]  w-[22rem] mx-auto"
									id="gmap_canvas"
									src="https://maps.google.com/maps?q=National%20Advanced%20School%20of%20Local%20Administration%20buea&t=&z=17&ie=UTF8&iwloc=&output=embed"
									frameBorder="0"
									scrolling="no"
									marginHeight={0}
									marginWidth={0}></iframe>
							</div>
						</div>
					) : null}
					{viewMap === "church" ? (
						<div className="mapouter sm:h-[32.3rem] w-[22rem] z-30 mx-auto sm:w-[42.2rem] relative text-right">
							<div className="gmap_canvas sm:h-[32.3rem] sm:w-[42.2rem] overflow-hidden bg-none">
								<iframe
									className="h-[32.3rem] sm:w-[42.2rem]  w-[22rem] mx-auto"
									id="gmap_canvas"
									src="https://maps.google.com/maps?q=holy%20mountain%20of%20worship%20church%20buea&t=&z=17&ie=UTF8&iwloc=&output=embed"
									frameBorder="0"
									scrolling="no"
									marginHeight={0}
									marginWidth={0}></iframe>
							</div>
						</div>
					) : null}
				</div>

				{/* !important */}

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
							Please kindly provide your details below to confirm your presence
							at the ceremony
						</p>

						<Spacer className="h-8" />

						<div className="sm:w-[30%] w-[80%] mx-auto">
							<Input
								largeLabel
								value={userData.name}
								label="Full Name"
								onChange={e =>
									setUserData({ ...userData, name: e.target.value })
								}
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

				<p className="font-sans text-center text-white">
					Done with ❤️ by Neville
				</p>

				<Spacer className="h-6" />
			</div>
		</div>
	);
};

export default Index;
