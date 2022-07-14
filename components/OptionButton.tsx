import React from 'react'

interface OptionButtonProps {
    option: string
    activeOption: string
    onClick: () => void
}

const OptionButton = ({ option, activeOption, onClick }: OptionButtonProps) => {

    return (
        <div className={`text-xl`}>
            <button
                onClick={onClick}
                className={`${activeOption === option ? "bg-black text-white" : "bg-transparent text-black"} border-2 border-gray-500 rounded-3xl w-full h-16 px-1 `}
            >
                {option}</button>
        </div>)

}

export default OptionButton;