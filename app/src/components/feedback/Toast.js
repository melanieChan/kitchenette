import { useState, useEffect } from "react";
import { Box, Layer, Toast } from "gestalt";

export default function ToastOnSumbit({ toastData: { TextElement, ButtonElement } }) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setShowToast(true)
  }, [TextElement])

  function onClickHideToast() {
    setShowToast(false)
  }

  return (
    <>
      {showToast && (
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
              button={<ButtonElement onClick={onClickHideToast}/>}
              text={TextElement}
            />
          </Box>
        </Layer>
      )}
    </>
  );
}
