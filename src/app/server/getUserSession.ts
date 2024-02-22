"use server"

import { auth } from "../../../auth"

//get the current user session using server actions

export default async function getUserSession() {
    const session=await auth()
    return session
}

