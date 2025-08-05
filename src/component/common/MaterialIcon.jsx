import React from "react";
import * as MdIcons from "react-icons/md";

const MaterialIcon = ({ name, size = 20, color = "black", ...props }) => {
  const IconComponent = MdIcons[name];

  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent size={size} color={color} {...props} />;
};

export default MaterialIcon;
