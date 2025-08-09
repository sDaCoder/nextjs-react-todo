import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import TodosArea from "@/components/TodosArea/TodosArea";
import TodoInput from "@/components/TodoInput/TodoInput";
import BgDimmer from "@/components/BgDimmer/BgDimmer";
import { headers } from "next/headers";
import React from "react";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/login");
  }
  // return (
  //   <div className='flex items-center justify-center h-[100vh]'>
  //     <h1 className='text-3xl font-bold'>You are not logged in</h1>
  //   </div>
  // )

  return (
    <>
      <HorizontalCalendar />
      <div className="flex flex-col py-6 gap-8 items-center justify-center">
        <TodosArea />
        <TodoInput />
        <BgDimmer />
      </div>
    </>
  );
}
