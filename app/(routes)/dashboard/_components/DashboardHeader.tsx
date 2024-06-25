import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader() {
  return (
    <div className="p-5 shadown-sm border-b flex justify-between fixes w-full">
      <div>Search Bar</div>
      <div>
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
        />
      </div>
    </div>
  );
}
