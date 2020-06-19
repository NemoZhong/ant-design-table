import React, { memo } from "react";
import ExpandTreeTable from "@components/ExpandTreeTable.jsx";
import tableData,{tableHeaderConfig} from "../mock/data";

const RenderTable = () => {
  return (
    <ExpandTreeTable
      dataSource={tableData}
      tableHeaderConfig={tableHeaderConfig}
    />
  );
};

export default memo(RenderTable);
