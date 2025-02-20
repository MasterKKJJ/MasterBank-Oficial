
import React from "react";
interface PartesSeparadasComponentsProps {
    children?: React.ReactNode
}

const PartesSeparadasComponents = ({ children }: PartesSeparadasComponentsProps) => {
    return (

        <div className="p-8 pb-3 pr-8 pt-7 min-h-max">
            {children}
        </div>
    );
}

export default PartesSeparadasComponents;