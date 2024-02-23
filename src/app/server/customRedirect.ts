"use server"

import { redirect } from "next/navigation";

export const customRedirect =(url:string)=> redirect(url)