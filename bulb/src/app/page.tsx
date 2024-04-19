"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import loginImage from "../../public/login.svg";
import loginImage2 from "../../public/login2.svg";
import loginImage3 from "../../public/login3.svg";
import loginImage4 from "../../public/login4.svg";

export default function Home() {
    return (
		<div className="flex flex-col w-screen flex-shrink-0">
			<div className="w-full h-[calc(100vh-1rem)] relative flex items-center justify-center flex-col">
				<h1 className="text-white font-bold text-8xl z-10 text-cente p-4">BULB</h1>
				<h2 className="text-thridGrey text-3xl z-10 text-center">Varje vårdsituation är en möjlighet till förändring.</h2>
				<div className="flex flex-row items-center justify-center w-full z-10 m-4">
					<Link href={"/loginPage"} className="m-4 bg-primaryLight text-white font-bold text-xl px-6 py-2 rounded-lg">
						Börja Nu
					</Link>
					<Link href={"https://eastswedenmedtech.se/en/start-uk/"} className="m-4 bg-primaryLight text-white font-bold text-xl px-6 py-2 rounded-lg">
						Om Oss
					</Link>
				</div>

				<div className="absolute top-0 left-0 h-full w-full bg-[url('/liu_university.png')] bg-cover"></div>
				<div className="absolute top-0 left-0 h-full w-full bg-primary bg-opacity-50 z-1"></div>

				<h1 className="absolute top-[calc(5%)] left-[calc(5%)] text-white font-bold text-5xl">
					EAST <br /> SWEDEN <br /> MEDTECH
				</h1>
				<Link href={"/loginPage"} className="absolute top-[calc(5%)] right-[calc(5%)] bg-primaryLight text-white font-bold text-xl px-6 py-2 rounded-lg">
					Logga in
				</Link>


			</div>
			<div className="h-[calc(60vh)] w-full bg-white p-16 relative">
				<h1 className="font-bold text-5xl text-primary">Visste Du? Att Det Finns Över...</h1>
				<div className="flex flex-row justify-evenly items-center h-4/5 mt-4">
					<div className="flex flex-col items-center justify-center">
						<h1 className="font-bold text-5xl text-primary m-2">1400</h1>
						<h2 className="font-bold text-2xl text-primaryText">Alltal behov i vården</h2>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="font-bold text-5xl text-primary m-2">1400</h1>
						<h2 className="font-bold text-2xl text-primaryText">Alltalet vi försöker lösa</h2>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="font-bold text-5xl text-primary m-2">1400</h1>
						<h2 className="font-bold text-2xl text-primaryText">Antalet du kan fixa</h2>
					</div>
				</div>
				<div className="absolute -top-1 right-0">

				</div>
			</div>
			<div className="bg-primary h-[calc(90vh)] w-full flex flex-col items-center justify-center">
				<h1 className="font-bold text-5xl text-white text-left w-full px-16">Demo</h1>
				<h2 className="font-bold text-2xl text-primaryLight text-left w-full px-16">Skapa ditt nästa möte nu</h2>
				<div className="h-3/5 w-3/5 bg-[url('/laptop.png')] bg-cover"></div>
			</div>
			
		</div>
	);
}
