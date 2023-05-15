import * as React from "react";
import Button from "@/components/ui/Button";
import { FC } from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

type PageProps = {};
const page: FC<PageProps> = (props) => {
    const session = await getServerSession(authOptions);
    return <pre>Hello</pre>;
};

export default page;
