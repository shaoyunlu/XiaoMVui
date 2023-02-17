/** 返回一个树形结构  */
export function tranListToTreeDate(listData, rootValue, idKey, pIdKey) {
    let list = Object.assign([], listData)
    const arr = []
    list.forEach(itemD => {
        let item = Object.assign({}, itemD)
        if (item[pIdKey] == rootValue) {
            const children = tranListToTreeDate(list, item[idKey], idKey, pIdKey)
            if (children.length) {
                item.children = children
            }
            arr.push(item)
        }
    })
    return arr
}

export function isEmpty(obj){
    if (obj == undefined){
        return true
    }
    else if(typeof obj == "string"){
        return !obj
    }
    else if(typeof obj == "object"){
        if (obj instanceof Array)
            return obj.length == 0
        else
            return !obj
    }
}


/**
 * 显示层级数据
 * @param tree {Array} 树数据
 * @param func {Function} 回调函数
 * @param field {String} 字段名称
 * @param path {Array} 路径数据
 * @returns {*[]|[]|*}
 */

export function treeFindPath(tree, func, field = "", path = []) {
    if (!tree) return []
    for (const data of tree) {
      field === "" ? path.push(data) : path.push(data[field]);
      if (func(data)) return path
      if (data.children) {
        const findChildren = treeFindPath(data.children, func, field, path)
        if (findChildren.length) return findChildren
      }
      path.pop()
    }
    return []
}
