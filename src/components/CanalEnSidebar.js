import React from "react";

import { Avatar } from "@material-ui/core";

function CanalEnSidebar({ nombre, id, date, photo }) {
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannel__hash">
          <Avatar src={photo}></Avatar>

        </span>
        {nombre}
      </h4 >
    </div >
  )
};

export default CanalEnSidebar;