import * as React from "react";
import { Dialog, Portal, Text } from "react-native-paper";

const AlertMessage = ({ content, visible, setVisible }) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default AlertMessage;
