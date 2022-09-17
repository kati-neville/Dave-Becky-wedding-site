import { useState, Fragment } from "react";
import Image from "next/image";
import Img2 from "../public/images/woman-4.png";
import Img3 from "../public/images/man-2.png";
import menu from "../public/images/menuIc.png";
import { Transition } from "@headlessui/react";

export const NavItem: React.FC<{
	link: string;
	name: string | JSX.Element;
	onClick?: () => void;
}> = ({ link, onClick, name }) => {
	return (
		<a
			href={`#${link}`}
			onClick={onClick}
			className="font-sans text-[#2B1105] text-xl text-center capitalize">
			{name}
		</a>
	);
};

export const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="sm:flex hidden items-center justify-between w-[60%] mx-auto">
				<NavItem link="home" name="home" />

				<NavItem link="story" name="story" />
				<NavItem link="itinerary" name="itinerary" />

				<div className="relative flex items-end space-x-2">
					<div className="absolute animate-zoom top-0 -left-6 shadow-md shadow-black rounded-full flex items-center justify-center">
						<div className="relative bg-green-400 rounded-full flex items-center justify-center">
							<Image className="z-10" src={Img2} width={45} height={45} />
							<span className="absolute text-5xl animate-ping">❤️</span>
						</div>
					</div>

					<div className="w-28 h-28 rounded-full border-2 border-[#2B1105] text-[#291e19] flex items-center justify-center text-4xl">
						B&D
					</div>

					<div className="absolute -right-6 bottom-0 animate-zoom shadow-md shadow-black rounded-full flex items-center justify-center">
						<div className="relative bg-green-400 rounded-full flex items-center justify-center">
							<Image className="z-10" src={Img3} width={45} height={45} />
							<span className="absolute text-5xl animate-ping">❤️</span>
						</div>
					</div>
				</div>
				<NavItem link="gifts & registry" name={"gifts"} />
				<NavItem link="RSVP" name={"RSVP"} />

				<a
					href="/images/wedding-card.png"
					download="Wedding-Invite.png"
					className="border border-neutral-300 px-3 py-2 rounded-md bg-[#97917A] hover:bg-opacity-80 text-white font-sans-body cursor-pointer">
					Get Invitation Card
				</a>
			</div>

			<div>
				<div className="sm:hidden flex items-center justify-between w-[85%] py-4 mx-auto">
					<div className="flex items-end relative">
						<div className="absolute animate-zoom top-0 -left-6 shadow-md shadow-black rounded-full flex items-center justify-center">
							<div className="relative bg-green-400 rounded-full flex items-center justify-center">
								<Image className="z-10" src={Img2} width={45} height={45} />
								<span className="absolute text-5xl animate-ping">❤️</span>
							</div>
						</div>
						<div className="w-20 h-20 rounded-full border-2 border-[#2B1105] text-[#291e19] flex items-center justify-center text-2xl">
							B&D
						</div>
						<div className="absolute animate-zoom bottom-0 -right-6 shadow-md shadow-black rounded-full flex items-center justify-center">
							<div className="relative bg-green-400 rounded-full flex items-center justify-center">
								<Image className="z-10" src={Img3} width={45} height={45} />
								<span className="absolute text-5xl animate-ping">❤️</span>
							</div>
						</div>
					</div>

					<button onClick={() => setOpen(!open)}>
						{" "}
						<Image src={menu} />
					</button>
				</div>

				<Transition
					as={Fragment}
					show={open}
					enter=" transition transform ease-out duration-75"
					enterFrom="translate-y-0"
					enterTo="translate-y-100"
					leave="transition-opacity ease-in duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="sm:hidden flex flex-col items-center bg-[#97917A] bg-opacity-20 py-6 px-3 space-y-6">
						<NavItem link="home" name="home" onClick={() => setOpen(false)} />
						<NavItem
							link="story"
							name={"story"}
							onClick={() => setOpen(false)}
						/>
						<NavItem
							link="itinerary"
							name={"itinerary"}
							onClick={() => setOpen(false)}
						/>
						<NavItem
							link="gifts"
							name={"gifts & registry"}
							onClick={() => setOpen(false)}
						/>
						<NavItem link="RSVP" name="RSVP" onClick={() => setOpen(false)} />

						<a
							href="/images/wedding-card.png"
							download="Wedding-Invite.png"
							className="border border-neutral-300 px-3 py-2 rounded-md bg-[#97917A] text-white font-sans-body">
							<button>Get Invitation Card</button>
						</a>
					</div>
				</Transition>
			</div>
		</>
	);
};
