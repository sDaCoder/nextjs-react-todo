import { startOfDay } from "date-fns"
import { redirect } from "next/navigation"

const page = () => {
  redirect(`/${new Date().getTime()}`)
}

export default page