 const arr=[
{'id':'29','pid':'','name':'总裁办'},
{"id":'2c','pid':'','name':'财务部'},
{'id':'2d','pid':'2c','name':'财务核算部'},
{'id':'2f','pid':'2c','name':"薪资管理部"},
{'id':'d2','pid':'','name':'技术部'},
{'id':'d3','pid':'d2','name':'java技术部'},
{'id':'e1','pid':'d3','name':'spring技术部'},
]

export function tranListToTreeData(list) {
  // 1. 定义两个中间变量
  const treeList = [],  // 最终要产出的树状数据的数组
        map = {}        // 存储映射关系
  // 2. 立一个映射关系，并给每个元素补充children属性.
  list.forEach(item => {
    if (!item.children) {
      item.children = []
    }
    map[item.id] = item
  })
    
    
    // map :{
    //     '29':{'id':'29','pid':'','name':'总裁办'},
    //     '2c':{'id':'2c','pid':'','name':'总裁办'},
    //     '2d':{'id':'2d','pid':'2c','name':'总裁办'},
    // }


  // 3. 循环处理每个元素
  list.forEach(item => {
    const parent = map[item.pid]
    // 如果存在则表示item不是最顶层的数据
    if (parent) {
      parent.children.push(item)
    } else {
      // 如果不存在 则是顶层数据
      treeList.push(item)
    }
  })
    
    // item.pid == '' treeList.push({ 'id': '29', 'pid': '', 'name': '总裁办' })
    // item.pid == ''    treeList.push({ "id": '2c', 'pid': '', 'name': '财务部' })
    // item.pid == '2c' 
    // map['2c'] = { 'id': '2c', 'pid': '', 'name': '总裁办' }
    // {'id':'2c','pid':'','name':'总裁办'}.children.push({'id':'2d','pid':'2c','name':'财务核算部'})
    
    
  // 返回出去
  return treeList
}