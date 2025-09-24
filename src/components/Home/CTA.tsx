'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

export default function CTA() {
  const [clicked, setTimesClicked] = useState(0);

  const onButtonClick = () => {
    setTimesClicked(clicked + 1);
  };
  return (
    <div className="flex flex-col h-screen bg-companydef items-center justify-center">
      <div className="flex flex-wrap gap-2 md:flex-row">
        <Button variant="outline" className=" text-white" onClick={onButtonClick}>
          Button
        </Button>
      </div>

      <div>
        {clicked !== 0 && (
          <div className="mt-5 text-white">
            Button Has Been Pressed {clicked} {clicked === 1 ? 'time' : 'times'} my dear
          </div>
        )}
      </div>
    </div>
  );
}
