import { Box, CompositeZIndex, FixedZIndex, Layer, Modal, Text } from "gestalt";

// popup for error messages of invalid user input
export default function ModalInvalidInput({showModal, onDismissCloseModal, messageToUser = ''}) {

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return showModal &&
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Delete board 60s Furniture"
        heading="Please double check your inputs"
        onDismiss={onDismissCloseModal}
        footer={
          <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <button style={{minWidth: '5em'}}
              className="button" onClick={onDismissCloseModal}>
              Ok
            </button>
          </div>
        }
        size="sm"
      >
        <Box padding={8}>
          <Text align="center" size="lg">{messageToUser}</Text>
        </Box>
      </Modal>
    </Layer>
  ;
}
