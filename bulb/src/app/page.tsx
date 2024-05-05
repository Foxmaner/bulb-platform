"use client";

import Image from "next/image";
import Link from "next/link";


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
				<Link href={"/login"} className="absolute top-[calc(5%)] right-[calc(5%)] bg-primaryLight text-white font-bold text-xl px-6 py-2 rounded-lg">
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
				<Image src="/corner_pattern.svg" width={100} height={150} alt="" className="absolute bottom-0 right-0" />
				<Image src="/top_pattern.svg" width={300} height={150} alt="" className="absolute -top-1 right-0" />
			</div>
			<div className="bg-primary h-[calc(90vh)] w-full flex flex-col items-center justify-center border-b-1 border-primary">
				<h1 className="font-bold text-5xl text-white text-left w-full px-16">Demo</h1>
				<h2 className="font-bold text-2xl text-primaryLight text-left w-full px-16">Skapa ditt nästa möte nu</h2>
				<div className="h-3/5 w-3/5 bg-[url('/laptop.png')] bg-cover"></div>
			</div>
			<div className="relative bg-white h-[calc(90vh)] w-full flex flex-col items-start justify-start p-16">
				<h1 className="text-primary font-bold text-6xl pb-1 border-b-4 border-primary">	
					EAST <br /> SWEDEN <br /> MEDTECH
				</h1>
				<p className="max-w-3xl text-4xl text-primary mt-20 border-l-4 border-primary pl-4">
					East Sweden Medtech är en länk mellan sjukvårdens behov, forskarnas kunskap och innovatörernas idéer. Vi matchar behov som utgår från patienten med innovativa lösningar. För en personcentrerad, jämlik vård – här, nu och i framtiden.
				</p>
				<h1 className="absolute top-16 right-16 text-white p-8 text-6xl outline-offset-4 outline outline-4 outline-primary bg-primary">
					EAST <br /> SWEDEN <br /> MEDTECH
				</h1>
				<Image src="/corner_pattern.svg" width={120} height={150} alt="" className="absolute bottom-0 right-0" />
			</div>
			<div className="relative bg-primaryLight h-[calc(60vh)] w-full flex flex-col items-start justify-center border-b-1 border-primary">
				<h1 className="font-bold text-5xl text-white text-left w-full px-16">Vården</h1>
				<h2 className="font-bold text-2xl text-primary text-left w-full px-16">Skapa ditt nästa möte nu</h2>

				<p className="text-4xl text-white border-primary ml-16 mt-4">
				Vården är som en varm, fluffig filt som omsorgsfullt sveper omkring dig, kryddad med kärlek och malet av dina unika behov.
				</p>
				<p className="max-w-3xl text-xl text-primary border-primary ml-16 mt-8">
					Du kan bli en del redan idag.
				</p>
				<Image src="/leaf.svg" width={150} height={150} alt="" className="absolute -bottom-1 right-16" />
			</div>
			<div className="bg-white h-[calc(10vh)] w-full">
			</div>
			<div className="bg-titleText h-[calc(40vh)] pl-16 w-full flex flex-row items-center justify-center">
				<div className="flex flex-col text-white w-1/4">
					<h1>Founded By</h1>
					<Image src="/liu_logga.svg" width={300} height={150} alt="" className="mt-4 mb-2"/>
					<Image src="/ostergotland_logga.svg" width={300} height={150} alt=""/>
				</div>
				<div className="w-2/4 text-white">
					<p>
						East Sweden Medtech is an initiative that was started by Region Östergötland and Linköping University. We work in collaboration with Region Kalmar County, Region Jönköping County and universities in our regions. We also work in close collaboration with industry through the industry organizations Swedish Medtech, Sweden Bio, the research-based pharmaceutical industry (LiF) and regional business and innovation organizations. East Sweden Medtech operates the MedTech4Health node within the Southeastern healthcare region.
						Privacy.
					</p>
					<div className="mt-2">
						<Link href={""} className="underline pr-2">Privacy Policy</Link>
						<Link href={""} className="underline border-l-2 px-2">Cookie Policy</Link>
					</div>
				</div>
				<div className="w-1/4 text-white flex flex-col items-start justify-center h-full ml-12">
					<h1 className="py-2 text-2xl">East Sweden Medtech</h1>
					<h2 className="py-2">info@eastswedenmedtech.se Universitetssjukhuset i Linköping</h2>
					<h2 className="py-2">entrance 50, 582 24 Linköping</h2>
					<Link href={""} className="py-2 underline">Contact Us</Link>
				</div>
			</div>
		</div>
	);
}
