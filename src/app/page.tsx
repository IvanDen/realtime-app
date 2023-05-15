import * as React from "react";
import { db } from "@/lib/db";
import Dashboard from "@/app/(dashboard)/dashboard/page";
import Button from "@/components/ui/Button";

export default async function Home() {
    return (
        <>
            <Button variant="ghost">Hello</Button>
        </>
    );
}
