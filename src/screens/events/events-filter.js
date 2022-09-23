import { useEffect, useState } from "react";
import Dropdown from "../../components/drop-down";
import FilterField from "../../components/filter-field";
import { chainQuery } from "../../libs/subsquid";

export default function EventsFilter({
  params,
  setFilterParams,
  setPageNumber,
}) {
  const [localParams, setLocalParams] = useState({ ...params });
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isTimeDimensionDropdownOpen, setIsTimeDimensionDropdownOpen] =
    useState(false);
  const [moduleOptions, setModuleOptions] = useState([
    {
      option: "all",
      onClick: () => changeFilter("module", "all"),
    },
  ]);
  const [eventMethodOptions, setEventMethodOptions] = useState([
    {
      option: "all",
      onClick: () => changeFilter("eventMethod", "all"),
    },
  ]);
  const [isFetchingMethods, setIsFetchingMethods] = useState(false);
  const [moduleAndEvents, setModuleAndEvents] = useState({})

  const toggleModuleDropdown = () =>
    setIsModuleDropdownOpen(!isModuleDropdownOpen);
  const toggleTimeDimensionDropdown = () =>
    setIsTimeDimensionDropdownOpen(!isTimeDimensionDropdownOpen);
  const toggleEventDropdown = () =>
    setIsEventDropdownOpen(!isEventDropdownOpen);

  const changeFilter = (param, value) => {
    setLocalParams({ ...localParams, [param]: value });
    param === "module" && toggleModuleDropdown();
    param === "eventMethod" && toggleEventDropdown();
    param === "timeDimension" && toggleTimeDimensionDropdown();
  };

  useEffect(() => {
    let isFilterMounted = true;
    setIsFetchingMethods(true);
    const getModuleAndEventOptions = async () => {
      const response = await chainQuery.get("/unique-event-names")

      const modules = new Set();
      const events = new Set();
      const modAndEvents = {};
      response.data.rows.forEach((e) => {
        const splitName = e.name.split(".")
        const module = splitName[0]
        const event = splitName[1]

        modules.add(module);
        events.add(event);

        if (!modAndEvents[module]) modAndEvents[module] = [];
        modAndEvents[module].push(event)
      });
      modAndEvents["all"] = [...events]

      const moduleOptions = [...modules].map(m => ({
        option: m,
        onClick: () => changeFilter("module", m)
      }))
      const eventOptions = [...events].map(e => ({
        option: e,
        onClick: () => changeFilter("eventMethod", e)
      }))
      moduleOptions.unshift({
        option: "all",
        onClick: () => changeFilter("module", "all"),
      })
      eventOptions.unshift({
        option: "all",
        onClick: () => changeFilter("eventMethod", "all"),
      });
      if (isFilterMounted) {
        setModuleOptions(moduleOptions);
        setEventMethodOptions(eventOptions);
        setModuleAndEvents(modAndEvents)
        setIsFetchingMethods(false);
      }
    };
    try {
      getModuleAndEventOptions();
    } catch (e) {
      console.error(e)
    }

    return () => (isFilterMounted = false);
  }, []);

  useEffect(() => {
    let isFilterMounted = true;
    setIsFetchingMethods(true);

    if (moduleAndEvents[localParams.module]) {
      const options = moduleAndEvents[localParams.module].map(e => ({
        option: e,
        onClick: () => changeFilter("eventMethod", e),
      }))
      options.unshift({
        option: "all",
        onClick: () => changeFilter("eventMethod", "all"),
      });
      if (isFilterMounted) {
        setEventMethodOptions(options);
        setIsFetchingMethods(false);
      }
    }

    return () => (isFilterMounted = false);
  }, [localParams.module]);

  return (
    <div className="mt-40 mb-40 extrinsics-filter">
      <div className="mb-40 d-flex justify-content-space-between">
        <div
          className="d-flex justify-content-space-between align-items-center extrinsics-filter-fields"
          onClick={toggleModuleDropdown}
        >
          <span className="text-dark-white">
            Module ({localParams.module ? localParams.module : "all"})
          </span>{" "}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
          {isModuleDropdownOpen && (
            <Dropdown
              options={moduleOptions}
              top={moduleOptions.length > 1 ? "440px" : "140px"}
            />
          )}
        </div>

        <div
          className="d-flex justify-content-space-between align-items-center extrinsics-filter-fields"
          onClick={toggleEventDropdown}
        >
          <span className="text-dark-white">
            Event (
            {isFetchingMethods
              ? "..."
              : localParams.eventMethod
              ? localParams.eventMethod
              : "all"}
            )
          </span>{" "}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
          {isEventDropdownOpen && eventMethodOptions && (
            <Dropdown
              options={eventMethodOptions}
              top={eventMethodOptions?.length > 1 ? "180px" : "140px"}
            />
          )}
        </div>
      </div>
      <div className="d-flex justify-content-space-between align-items-center">
        <div
          className="d-flex justify-content-space-between align-items-center extrinsics-filter-fields"
          onClick={toggleTimeDimensionDropdown}
        >
          <span className="text-dark-white">
            Time dimension (
            {localParams.timeDimension ? localParams.timeDimension : "date"})
          </span>{" "}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
          {isTimeDimensionDropdownOpen && (
            <Dropdown
              options={[
                {
                  option: "Date",
                  onClick: () => changeFilter("timeDimension", "date"),
                },
                {
                  option: "Block",
                  onClick: () => changeFilter("timeDimension", "block"),
                },
              ]}
            />
          )}
        </div>
        {localParams.timeDimension === "date" && (
          <>
            <FilterField
              changeFilter={changeFilter}
              label="Start"
              type="date"
              paramName="startDate"
              param={localParams.startDate}
            />
            <FilterField
              changeFilter={changeFilter}
              label="End"
              type="date"
              paramName="endDate"
              param={localParams.endDate}
              minDate={localParams.startDate}
            />
          </>
        )}
        {localParams.timeDimension === "block" && (
          <>
            <FilterField
              changeFilter={(e) => changeFilter("startBlock", e.target.value)}
              label="Start block"
              type="number"
              step={1}
            />
            <FilterField
              changeFilter={(e) => changeFilter("endBlock", e.target.value)}
              label="End block"
              type="number"
              minBlock={localParams.startBlock}
              step={1}
            />
          </>
        )}
        <div>
          <span
            className="button"
            onClick={() => {
              setPageNumber(1);

              setFilterParams(localParams);
            }}
          >
            Filter
          </span>
        </div>
      </div>
    </div>
  );
}
