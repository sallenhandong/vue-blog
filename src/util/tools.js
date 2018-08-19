import _ from "lodash";

/** 判断当前环境是否是PC端 **/
export const isPc = () => {
  const userAgentInfo = navigator.userAgent.toLowerCase();
  const Agents = [
    "android",
    "iphone",
    "symbianOS",
    "windows phone",
    "ipad",
    "ipod"
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.includes(Agents[v])) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * 通过文章GitName(对应github中.md文件的名称)获取文章相关信息
 * 发表日期
 * 配图 如果有的话
 * 简介
 * */
export const getBlogInfo = (gitname, allofblog) => {
  const data = allofblog.find(item => item.gitname === gitname);
  return data || {};
};

/**
 * 比较两个日期字符串的大小，倒序
 * sort排序
 * */
export const sortDate = (data, blogData) => {
  const d = _.cloneDeep(data);
  d.sort((a, b) => {
    const t1 = blogData.find(item => item.gitname === a.name);
    if (!t1) {
      return -1;
    }
    const t2 = blogData.find(item => item.gitname === b.name);
    if (!t2) {
      return 1;
    }
    return Number(
      t2.date.split("/").join("") - Number(t1.date.split("/").join(""))
    );
  });
  return d;
};
