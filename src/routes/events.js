import { useEffect, useState } from "react";
import config from "../config";
import { subSquidQuery } from "../libs/subsquid";
import EventsFilter from "../screens/events/events-filter";
import EventsList from "../screens/events/events-list";

export default function Events() {
  const limit = config.ITEMS_PER_PAGE;
  const [filterParams, setFilterParams] = useState({
    module: "all",
    eventMethod: "all",
    timeDimension: "date", // date, block
    startDate: "",
    endDate: "",
    startBlock: "",
    endBlock: "",
  });

  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);

  const changeFilterParams = (param, value) => {
    setFilterParams({ ...filterParams, [param]: value });
  };

  useEffect(() => {
    let whereArgs = `where: {`;
    const { module, eventMethod, startBlock, endBlock, startDate, endDate, timeDimension } =
      filterParams;
    if (module && module !== "all") {
      whereArgs += `name_startsWith: "${module}",`;
    }
    if (eventMethod && eventMethod !== "all") {
      whereArgs += `name_endsWith: "${eventMethod}",`;
    }
    if (timeDimension === "block") {
      if (startBlock && endBlock) {
        whereArgs += `block: {height_gte: ${startBlock}, AND: {height_lte: ${endBlock}}}`;
      }
    } else if (timeDimension === "date") {
      if (startDate && endDate) {
        const startDateString = new Date(startDate).toISOString()
        const endDateString = new Date(endDate).toISOString()
        whereArgs += `block: {timestamp_gte: "${startDateString}", AND: {timestamp_lte: "${endDateString}"}}`;
      }
    }
    whereArgs += `}, `;

    const query = `{
    events(${whereArgs}orderBy: id_DESC, limit: ${limit}, offset: ${
      (pageNumber - 1) * 10
    }) {
      name
      id
      indexInBlock
      block {
        height
        timestamp
      }
      extrinsic {
        id
        indexInBlock
      }
    }
    }`;

    let isListMounted = true;
    const getEvents = async () => {
      setIsLoadingEvents(true);
      const { data } = await subSquidQuery.post("", {
        query,
      });
      let events = data.data.events.map((e) => ({
        ...e,
        eventId: `${e.block.height}-${e.indexInBlock}`,
        extrinsicId: e.extrinsic?.id,
        action: e.name,
        eventJSON: JSON.stringify(e, null, 2),
      }));

      if (isListMounted) {
        setEvents(events);
        setIsLoadingEvents(false);
      }
    };

    getEvents();
    return () => (isListMounted = false);
  }, [filterParams, limit, pageNumber]);

  return (
    <div className="page mb-40">
      <h3 className="text-white">Event history</h3>
      <div className="bordered-content-box mb-40">
        <EventsFilter
          params={filterParams}
          setFilterParams={setFilterParams}
          setPageNumber={setPageNumber}
        />
      </div>
      <EventsList
        events={events}
        isLoadingEvents={isLoadingEvents}
        pageOffset={pageOffset}
        setPageNumber={setPageNumber}
        setPageOffset={setPageOffset}
      />
      <div className="mt-40 mb-40"></div>
    </div>
  );
}
