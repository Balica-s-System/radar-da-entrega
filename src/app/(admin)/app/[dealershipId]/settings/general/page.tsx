import { GeneralSettings } from "./_components/general-settings";

export default function GeneralRoute() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <GeneralSettings />
    </div>
  );
}
