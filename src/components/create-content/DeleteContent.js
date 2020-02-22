import React from 'react';
import { Typography, ModalBody, ModalFooter, Button } from 'components';

const DeleteContent = () => {
  return (
    <>
      <ModalBody>
        <Typography>Delete?</Typography>
      </ModalBody>
      <ModalFooter>
        <Button type="button" size="small" variant="ghost">
          Cancel
        </Button>
        <Button type="submit" size="small">
          Delete
        </Button>
      </ModalFooter>
    </>
  );
};

export default DeleteContent;
