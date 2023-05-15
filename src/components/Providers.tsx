"use client";

import * as React from "react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
    children: ReactNode;
}
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </>
    );
};
