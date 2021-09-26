import React from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../dummy-data';
import Button from '../../components/ui/button';

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p className="center">Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p className="center">No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <React.Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </React.Fragment>
  );
}

export default FilteredEventsPage;
