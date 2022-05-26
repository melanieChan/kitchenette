import { useState, useEffect } from "react";
import { Box, Layer, Button, Toast } from "gestalt";

export default function ToastOnSumbit({
  toastData: { TextElement, ButtonElement = null}, // toast content
  showToast,
  onClickHideToast // called when Toast's button is clicked
}) {

  return (
    <>
      {showToast && TextElement && (
        <Layer>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 10,
                zIndex: 50,
              },
            }}
            fit
            paddingX={1}
            position="fixed"
          >
            <Toast
              button={<Button text="Ok" onClick={onClickHideToast} />}
              text={TextElement}
            />
          </Box>
        </Layer>
      )}
    </>
  );
}
