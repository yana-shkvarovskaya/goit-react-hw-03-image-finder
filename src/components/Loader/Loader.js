import { ImSpinner } from 'react-icons/im';
import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div role="alert" className="Loader">
      <ImSpinner size="32" />
      Loading...
    </div>
  );
}
