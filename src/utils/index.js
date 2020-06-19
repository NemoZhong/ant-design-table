// 根据某条数据的唯一值key，找其在多层嵌套对象数组中的位置
export const getLevelByKeyInTree = (tableData,keyname, key) => {
  // 构造树结构
  const treeData={
    children:tableData
  }
  const tmp = [];

  const FindPos = (sourceTree, sourceId) => {
    if (!sourceTree.children) {
      return; // 为末端节点
    }
    sourceTree.children.forEach((item, index) => {
      if (item[keyname] === sourceId) {
        // 寻找到指定的元素节点
        tmp.unshift(index);
        // 继续寻找上层元素的位置
        FindPos(treeData, sourceTree[keyname]);
      } else {
        FindPos(item, sourceId);
      }
    });
  };

  FindPos(treeData, key);

  return tmp;
};