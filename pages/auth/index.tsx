import React, { useContext, useState } from "react";
import { Input } from "../../components/input";
import { Spacer } from "../../utils/spacer";
import flower from "../../public/images/flower1.png";
import Image from "next/image";
import { AuthCtxt } from "../_app";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const { authenticateUser, isAuthenticated } = useContext(AuthCtxt);
	const [pswd, setPswd] = useState("");
	const [error, setError] = useState("");
	const password = "DAVE123";

	return (
		<>
			<div className="absolute top-1/2 -translate-y-1/2  left-0 right-0 mx-auto sm:w-[40%] w-[90%] text-[#2B1105] text-opacity-70 login">
				<div className="w-full flex flex-col">
					<p className="font-sans text-2xl text-center ">
						Please provide a password
						<br />
						to gain access to the wedding page
					</p>

					<Spacer className={"h-4"} />

					<label className="font-sans text-center text-2xl font-medium">
						Password
					</label>

					<Spacer className="h-4" />
					{error ? (
						<p className="font-sans-body text-red-400 text-center">{error}</p>
					) : null}
					<div className=" flex flex-col items-center justify-center w-full">
						<input
							value={pswd}
							className={
								"box-border w-2/3 rounded-lg h-14 py-4 px-5 border border-neutral-200 focus:ring-1 focus:outline-[#2B1105]"
							}
							onChange={e => {
								setPswd(e.target.value);
								setError("");
							}}
						/>
					</div>

					<Spacer className="h-14" />

					<button
						onClick={() => {
							if (pswd !== password) {
								setError("Wrong password");
								setPswd("");
								return;
							}
							authenticateUser();
							router.push("/");
						}}
						className="text-lg font-sans-body text-white bg-[#2B1105] bg-opacity-70 w-32 mx-auto py-2 rounded-lg">
						Check
					</button>
				</div>
			</div>

			<div className="absolute top-[80%] -translate-y-1/2  left-0 right-0 mx-auto flex justify-center">
				<Image src={flower} width={301} height={120} />
			</div>
		</>
	);
};

export default Login;
