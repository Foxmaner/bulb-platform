import React from "react";
import MenuBtn from "../../components/btn/MenuBtn";
import Image from "next/image";
import { useUserContext } from "app/context/userProvider";


interface PageHeaderProps {
	children?: React.ReactNode;
	contentTitle: string;
}

export default function PageHeader({ children, contentTitle }: PageHeaderProps) {
	const userContext = useUserContext();
	const username = userContext.user?.name;
	const times = [
		"Morgon",
		"Eftermiddag",
		"Kväll"
	]

	const getTimes = (): string => {
		const date = new Date();
		const hours = date.getHours();

		if (hours >= 0 && hours < 12) {
			return times[0];
		} else if (hours >= 12 && hours < 18) {
			return times[1];
		} else {
			return times[2];
		}
	}

	return (
		<div className=" w-full flex-col justify-between mb-2">
			<div className="w-full px-5 py-2">
				<h2 className="text-titleText font-medium">God {getTimes()}, {username?.split(" ")[0]}!</h2>
			</div>

			<div className="bg-primaryGrey w-full flex flex-row justify-between items-center pl-4 border-y border-primaryBorder overflow-hidden">
				<div className="w-full flex flex-col items-start pr-2">
					<h1 className="text-titleText font-bold text-7xl">
						{contentTitle}
					</h1>
					{children}
				</div>
				
				<div className="flex-shrink-0">
					<Image src="/placeholder.jpg" alt="" height={130} width={500}></Image>
				</div>
			</div>	
		</div>
	);
}
