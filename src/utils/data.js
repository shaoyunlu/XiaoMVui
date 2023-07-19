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

/** 深拷贝一个数组 */
export function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    let clone;
    if (Array.isArray(obj)) {
      clone = [];
      for (let i = 0; i < obj.length; i++) {
        clone[i] = deepClone(obj[i]);
      }
    } else {
      clone = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          clone[key] = deepClone(obj[key]);
        }
      }
    }
  
    return clone;
  }

// 判断数据是否为空
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

export function find(array ,fn){
    let res = null
    for (let i = 0; i < array.length; i++) {
        let tmp = array[i]
        if (fn(tmp)) {
            res = tmp
            break;
        }
    }
    return res
}

export function filter(array ,fn){
    return array.filter(tmp =>{
        return fn(tmp)
    })
}

export function findNode(nestedArray, value ,type = 'value'){
  for (let item of nestedArray) {
    if (item[type] === value) {
      return item;
    }

    if (item.children && item.children.length > 0) {
      let found = findNode(item.children, value ,type);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * 通过子节点查询父节点
 */
export function findParentNodeByChildNode(nestedArray, value, parents = [] ,type = 'value'){
    for (let item of nestedArray) {
      if (item[type] === value) {
        return parents;
      }

      if (item.children && item.children.length > 0) {
        let newParents = parents.concat(item);
        let foundParents = findParentNodeByChildNode(item.children, value, newParents);
        if (foundParents) {
          return foundParents;
        }
      }
    }
    return null;
}

let uuid = 0
export function generateId(){
    return uuid++
}