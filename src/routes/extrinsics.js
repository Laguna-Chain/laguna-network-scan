import React, { useEffect, useState } from "react";
import ExtrinsicsHistory from "../components/extrinsics/history";
import ExtrinsicsFilter from "../components/extrinsics/filter";
import ExtrinsicsList from "../components/extrinsics/list";
import { shortenHex } from "../utils";
import { subSquidQuery, chainQuery } from "../libs/subsquid";

export default function Extrinsics() {
  const [filterParams, setFilterParams] = useState({
    module: "all", // dynamicFee, timestamp
    timeDimension: "date", // date, block
    startDate: "",
    endDate: "",
    startBlock: "",
    endBlock: "",
  });
  const [extrinsics, setExtrinsics] = useState([]);
  const [isLoadingExtrinsics, setIsLoadingExtrinsics] = useState(false);
  const [modules, setModules] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageNum, setPageNum] = useState(0);

  const changeFilterParams = (param, value) => {
    setFilterParams({ ...filterParams, [param]: value });
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 50) % extrinsics.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    setPageNum(event.selected);
  };

  useEffect(() => {
    let isFilterMounted = true;

    const getModules = async () => {
      const response = await chainQuery.get("/unique-event-names")

      const modules = new Set();
      response.data.rows.forEach((e) => {
        const splitName = e.name.split(".")
        const module = splitName[0]

        modules.add(module);
      });

      if (isFilterMounted) {
        setModules([...modules]);
      }
    };
    try {
      getModules();
    } catch (e) {
      console.error(e)
    }

    return () => (isFilterMounted = false);
  }, []);

  useEffect(() => {
    let whereArgs = `where: {`;
    const { module, startBlock, endBlock, startDate, endDate, timeDimension } =
      filterParams;
    if (module && module !== "all") {
      whereArgs += `block: {events_some: {name_startsWith: "${module}"}},`;
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
      extrinsics(${whereArgs}orderBy: id_DESC, limit: ${50}, offset: ${pageNum * 10}) {
        block {
          timestamp
          id
          height
          hash
          events {
            name
            indexInBlock
          }
        }
        indexInBlock
        hash
        id
        signature
      }
    }`

    let isListMounted = true;
    const getEvents = async () => {
      const { data } = await subSquidQuery.post("", {
        query,
      });
      const { module } = filterParams;
      const extrinsics = data.data.extrinsics.map((e) => {
        const extrinsicModule = module === "all" ? e.block.events[0]?.name : e.block.events.find(e => e.name.startsWith(module))?.name

        return {
          extrinsicId: `${e.block.height}-${e.indexInBlock}`,
          blockNumber: e.block.height,
          hash:
            shortenHex(e.hash) || "-",
          time: e.block.timestamp,
          isSigned: e.signature !== null,
          action: extrinsicModule,
          module: extrinsicModule.split(".")[0],
          extrinsicJSON: JSON.stringify(e),
        }
      });

      if (isListMounted) {
        setExtrinsics(extrinsics);
      }
    };

    getEvents();
    return () => (isListMounted = false);
  }, [filterParams]);

  return (
    <div className="page">
      {/* <ExtrinsicsHistory extrinsicsList={extrinsicsList} /> */}
      <ExtrinsicsFilter
        filterOptions={modules}
        params={filterParams}
        changeFilterParams={changeFilterParams}
      />
      <ExtrinsicsList
        extrinsicsList={extrinsics.slice(itemOffset, itemOffset + 50)}
        isLoadingExtrinsics={isLoadingExtrinsics}
        handlePageClick={handlePageClick}
        pageCount={Math.ceil(extrinsics.length / 50)}
        pageNum={pageNum}
      />
    </div>
  );
}
