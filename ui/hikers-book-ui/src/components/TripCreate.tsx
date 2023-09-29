import { gql } from '../__generated__/gql';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const mutation = gql(/* GraphQL */ `
  mutation CreateTrip($label: String!, $description: String!) {
    addTrip(label: $label, description: $description) {
      id
      label
      description
    }
  }
`);

export default function TripsCreate() {
  const [mutateFunction, { loading, error }] = useMutation(mutation);
  const navigate = useNavigate();

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateFunction({ variables: { label, description } })
      .then(() => {
        return navigate('/');
      })
      .catch((error) => {
        return `Submission error! ${error.message}`;
      });
  };

  return (
    <div className="columns-3xs">
      <Link to="/">Back</Link>
      <h3>Create new trip</h3>
      <form onSubmit={onSubmit}>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Label</span>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                onChange={(event) => setLabel(event.target.value)}
                value={label}
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Description</span>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </label>

            <button type="submit">Create trip</button>
          </div>
        </div>
      </form>
    </div>
  );
}
