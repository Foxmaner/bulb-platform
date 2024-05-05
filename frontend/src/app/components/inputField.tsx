import { useState } from "react";


interface IinputFieldProps{
    data: string
}

export default function InputField({data} : IinputFieldProps){
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
            <button className="border-2 border-primaryGrey"onClick={addInput}>{data}</button>
        </div>
    )
}