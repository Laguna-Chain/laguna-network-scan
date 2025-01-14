import { useState } from "react";
import { Link } from "react-router-dom";
import { copyText } from "../utils";
import FormatedTime from "./formated-time";
import JsonToTable from "./json-to-table";

export default function ExpandableRow({
  eventId,
  blockNumber,
  blockTimestamp,
  extrinsicId,
  action,
  eventJSON,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCodeViewOpen, setIsCodeViewOpen] = useState(false);
  const toggleIsExpanded = () => setIsExpanded((isExpanded) => !isExpanded);
  const toggleIsCodeViewOpen = () =>
    setIsCodeViewOpen((isCodeViewOpen) => !isCodeViewOpen);
  return (
    <>
      <tr key={eventId}>
        <td className="text-accent-purple no-wrap">
          {extrinsicId ? (
            <Link to={`/extrinsic/${extrinsicId}?event=${eventId}`}>
              {eventId}
            </Link>
          ) : (
            eventId
          )}
        </td>
        <td className="text-accent-purple">
          <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
        </td>

        <td className="text-accent-purple no-wrap">
          {extrinsicId ? (
            <Link to={`/extrinsic/${extrinsicId}`}>{extrinsicId}</Link>
          ) : (
            "-"
          )}
        </td>

        <td className="text-dark-white">
          <FormatedTime time={Number(new Date(blockTimestamp))} />
        </td>

        <td className="text-accent-purple">{action}</td>

        <td className="no-wrap">
          <span className="button icon" onClick={toggleIsExpanded}>
            {isExpanded ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <path
                  d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            ) : (
              <span className="text-dark-white">&gt;</span>
            )}
          </span>
        </td>
      </tr>
      <tr>
        <td
          colSpan={6}
          style={{
            display: isExpanded ? "table-cell" : "none",
          }}
        >
          <div className="table-expandable-container">
            <div className="d-flex justify-content-end mb-40">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 pointer"
                  onClick={() => copyText(eventJSON)}
                >
                  <path
                    d="M17.9091 19.3636H8.90909V7.90909H17.9091V19.3636ZM17.9091 6.27273H8.90909C8.4751 6.27273 8.05888 6.44513 7.75201 6.75201C7.44513 7.05888 7.27273 7.4751 7.27273 7.90909V19.3636C7.27273 19.7976 7.44513 20.2138 7.75201 20.5207C8.05888 20.8276 8.4751 21 8.90909 21H17.9091C18.3431 21 18.7593 20.8276 19.0662 20.5207C19.3731 20.2138 19.5455 19.7976 19.5455 19.3636V7.90909C19.5455 7.4751 19.3731 7.05888 19.0662 6.75201C18.7593 6.44513 18.3431 6.27273 17.9091 6.27273ZM15.4545 3H5.63636C5.20237 3 4.78616 3.1724 4.47928 3.47928C4.1724 3.78616 4 4.20237 4 4.63636V16.0909H5.63636V4.63636H15.4545V3Z"
                    fill="#979798"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer"
                  onClick={toggleIsCodeViewOpen}
                >
                  <path
                    d="M11.5 6C7.18182 6 3.49409 8.69533 2 12.5C3.49409 16.3047 7.18182 19 11.5 19C15.8182 19 19.5059 16.3047 21 12.5C19.5059 8.69533 15.8182 6 11.5 6ZM11.5 16.8333C9.11636 16.8333 7.18182 14.892 7.18182 12.5C7.18182 10.108 9.11636 8.16667 11.5 8.16667C13.8836 8.16667 15.8182 10.108 15.8182 12.5C15.8182 14.892 13.8836 16.8333 11.5 16.8333ZM11.5 9.9C10.0664 9.9 8.90909 11.0613 8.90909 12.5C8.90909 13.9387 10.0664 15.1 11.5 15.1C12.9336 15.1 14.0909 13.9387 14.0909 12.5C14.0909 11.0613 12.9336 9.9 11.5 9.9Z"
                    fill={isCodeViewOpen ? "#a6a3ff" : "#979798"}
                  />
                </svg>
              </span>
            </div>
            <div className="expanded-view">
              {isCodeViewOpen ? (
                <code>
                  <pre>{eventJSON}</pre>
                </code>
              ) : (
                <JsonToTable json={eventJSON} />
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
