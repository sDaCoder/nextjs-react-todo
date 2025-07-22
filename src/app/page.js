import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import TodosArea from "@/components/TodosArea/TodosArea";
import TodoInput from "@/components/TodoInput/TodoInput";
import BgDimmer from "@/components/BgDimmer/BgDimmer";

export default function Home() {
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
