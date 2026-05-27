import { DeashboardHeader } from "@/app/dashboard/components/Header";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeashboardHeader />
      {children}
    </>
  );
}
