import { useState, useRef } from 'react';
import { Tooltip, Overlay, OverlayTrigger, Button } from 'react-bootstrap';
import './PopoverStyle.css';

const MyPopover = () => {
  const [tooltip, displayTooltip] = useState(false);
  const elementTarget = useRef(null);

  return (
    <div className='App mt-5'>
      <Button
        ref={elementTarget}
        onClick={() => displayTooltip(!tooltip)}
        variant='primary'
      >
        Show Tooltip
      </Button>

      <Overlay
        elementTarget={elementTarget.current}
        show={tooltip}
        placement='top'
      >
        {(props) => (
          <Tooltip {...props}>
            Lorem Ipsum is simply dummy text of the printing industry.
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default MyPopover;
