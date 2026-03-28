import EventsPage from "../_components/event/EventsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedParams = await searchParams;
  return (
    <div>
      <EventsPage searchParams={resolvedParams} />
    </div>
  );
}
