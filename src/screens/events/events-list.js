import InfoPlaceholder from "../../components/info-placeholder";
import ExpandableRow from "../../components/expandable-row";
import Pagination from "../../components/pagination/pagination";

export default function EventsList({
  events,
  isLoadingEvents,
  setPageNumber,
  setPageOffset,
  pageOffset,
}) {
  const handleChangePage = ({ selected }) => {
    setPageNumber(selected + 1);
    setPageOffset(selected);
  };

  if (isLoadingEvents) {
    return <InfoPlaceholder text="Loading events list..." isListContainer />;
  }
  if (events.length < 1) {
    return (
      <InfoPlaceholder text="Sorry, nothing to show here" isListContainer />
    );
  }

  return (
    <>
      <div className="extrinsics-list bordered-content-box scroll-x list-container">
        <table className="table">
          <thead>
            <tr>
              <th className="no-wrap">Event Id</th>
              <th>Block</th>
              <th className="no-wrap">Extrinsic Id</th>
              <th>Time</th>
              <th>Action</th>
              <th>Expand</th>
            </tr>
          </thead>
          <tbody>
            {events.map(
              ({
                id,
                block,
                extrinsicId,
                action,
                eventJSON,
              }) => (
                <ExpandableRow
                  eventId={id}
                  blockNumber={block.height}
                  blockTimestamp={block.timestamp}
                  extrinsicId={extrinsicId}
                  action={action}
                  eventJSON={eventJSON}
                  key={id}
                />
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <div></div> {/* Downloads component  */}
        <Pagination
          pageCount={10}
          pageOffset={pageOffset}
          handleChangePage={handleChangePage}
        />
      </div>
    </>
  );
}
