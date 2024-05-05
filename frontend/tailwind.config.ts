import type { Config } from "tailwindcss";


const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#512641',
        'primaryLight': "#B0538D",
        'secondary': '#8B4270',
        'primaryGrey': '#F5F5F5', //Tidigare använd färg är bg-slate-100. Detta är den gråa färgen
        'secondaryGrey':'#888888', 
        'thridGrey': "#D9D9D9",
        'easyGrey':'#EEE',
        'edge': "#D9D9D9", //Bordercolor
        'titleText':'#333333',
        'primaryText': "#888888",
        'online': "#21E6C1",
        
      },

            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};


export default config;
