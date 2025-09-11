import React from "react";
import BasketDrawer from "@/components/drawers/basket-drawer/BasketDrawer";

interface DrawerManagerProps {
  activeDrawer: string | null;
  onClose: () => void;
}

const DrawerManager: React.FC<DrawerManagerProps> = ({
  activeDrawer,
  onClose,
}) => {
  if (!activeDrawer) return null;

  switch (activeDrawer) {
    case "basket":
      return (
        <BasketDrawer
          isOpen={activeDrawer === null ? false : true}
          onClose={onClose}
        />
      );

    default:
      return null;
  }
};

export default DrawerManager;
