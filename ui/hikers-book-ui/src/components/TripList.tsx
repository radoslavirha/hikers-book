import { gql } from '../__generated__/gql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const query = gql(/* GraphQL */ `
  query Trips {
    trips {
      id
      label
      description
    }
  }
`);

export default function TripsList() {
  const { loading, data } = useQuery(query);

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="columns-3xs">
      {data &&
        data.trips &&
        data.trips.map((trip) => (
          <div key={trip?.id}>
            <img className="w-full aspect-square" alt="" src="https://picsum.photos/200/300" />
            {trip?.label}
            {trip?.description}
          </div>
        ))}

      <Link to="/trips/new">Create new trip</Link>
    </div>
  );
}
