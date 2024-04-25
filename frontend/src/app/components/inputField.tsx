import { useState } from "react";

export default function InputField({inputType} : {inputType:string}){
    const [textFields, setTextFields] = useState<string[]>([]);

    const addInput = () => {
        setTextFields(prevTextFields =>[...prevTextFields, '']);
    };
    
    return(
        <div>
            {textFields.map((textField, index) =>(
                <div key={index}>
                    <input className="border-1 border-black gap-1"/>
                </div>
            ))}
            <button className="border-2 border-primaryGrey"onClick={addInput}>{inputType}</button>
        </div>
    )
}