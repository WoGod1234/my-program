export const getTreeData = (data) => {
  // 循环遍历json数据
  data ? data.forEach((item) => {
    if (item.children && item.children.length < 1) {
      // children若为空数组，则将children设为undefined
      item.children = undefined;
    } else {
      // children若不为空数组，则继续 递归调用 本方法

      getTreeData(item.children);
    }
  }) : [];
  return data;
}