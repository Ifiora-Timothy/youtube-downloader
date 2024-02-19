"use server"

import { redirect } from "next/navigation";

console.log("no errors good to go");
export const customRedirect =(url:string)=> redirect(url)