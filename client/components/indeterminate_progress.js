import React, { Component } from 'react';

const IndeterminateProgress = () => {
  return <div className="text-center">
      <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span>
      <span>Loading...</span>
    </div>;
};

export default IndeterminateProgress;
