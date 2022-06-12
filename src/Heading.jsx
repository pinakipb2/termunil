import React from 'react';
import { banner } from './Commands';

const Heading = () => {
  return (
    <div className="ml-2 mt-10">
      <pre>
        {banner.map((line, index) => (
          <div className="" key={index}>
            <code>{line}</code>
          </div>
        ))}
      </pre>
      <div className="mt-2 text-lg font-medium">
        <span>Welcome to my interactive web terminal.</span>
        <div>
          For a list of available commands, type <span className="text-orange-500">'help'</span>.
        </div>
      </div>
    </div>
  );
};

export default Heading;
