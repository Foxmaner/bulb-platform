import MenuBtn from "../../components/btn/MenuBtn";

import Image from "next/image";


interface PageHeaderProps {
	contentTitle: string;
	buttenMenu?: boolean;
	createButton?: () => void;
}

export default function PageHeader({ contentTitle, createButton, buttenMenu = true }: PageHeaderProps) {
	const username = "Test User1";

	return (
		<div className=" w-full flex-col justify-between mb-2">
			<div className="w-full px-4 py-2">
				<h2 className="text-black">Good afternoon, {username}</h2>
			</div>

			<div className="bg-primaryGrey w-full flex flex-row justify-between items-center pl-4 border-y border-primaryBorder overflow-hidden">
				<div className="w-full flex flex-col items-start">
					<h1 className="text-black font-bold text-7xl">
						{contentTitle}
					</h1>

					{
						buttenMenu && (
							<div className="flex flex-row items-center justify-between space-x-2 w-2/5 ml-1 mt-1">
							<div className="flex-1">
								<MenuBtn>
								Skapa
								</MenuBtn>
							</div>
							<div className="flex-1">
								<MenuBtn>
								Företag
								</MenuBtn>
							</div>
							<div className="flex-1">
								<MenuBtn>
								Månad
								</MenuBtn>
							</div>
							<div className="flex-1">
								<MenuBtn>
								01
								</MenuBtn>
							</div>
							<div className="flex-1">
								<MenuBtn>
								Filter
								</MenuBtn>
							</div>
						</div>
						)
					}

				</div>
				
				<div className="flex-shrink-0">
					<Image src="/placeholder.jpg" alt="" height={130} width={500}></Image>
				</div>
			</div>	
		</div>
	);
}
