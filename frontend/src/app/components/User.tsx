import React from 'react'

interface IUserProps {
    name: string;
}

export default function User({ name }: IUserProps) {
  return (
    <div className='flex flex-row'>
        <div className="cursor-pointer h-10 w-10 bg-secondary flex justify-center items-center text-white rounded-md relative">
            <h1 className="text-lg">
            {
                name.charAt(0).toUpperCase()
            }
            </h1>
        </div>
        <div className="flex flex-col justify-center items-start mx-2">
            <h1 className="text-primary font-bold text-md p-0">{name}</h1>
        </div>
    </div>
  )
}
