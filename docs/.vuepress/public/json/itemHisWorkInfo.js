const getMonthLength = (date) => {
  return parseInt((new Date().getTime() - new Date(date).getTime())/(1000 * 60 * 60 * 24 * 30)) + 1
}

export default [
  {
    type: 2,
    industry: "高级研发工程师",
    time: `20201203-至今(${getMonthLength('2020/12/03')}个月)`,
    work: [
      "负责快的新出租小程序的维护以及日常功能交付",
      "扫码付、红包码、年度司机评选等营销活动",
      "推动项目进度，把控研发风险",
      "负责滴滴出行小程序，行中模块，日常业务迭代"
    ],
  },
  {
    type: 1,
    industry: "软件开发工程师",
    time: "201807-202012",
    work: [
      "设计UED规范、产出对应的开发脚手架",
      "日常系统（多级公文、内控系统、工作流系统）技术选型、开发",
      "工作流引擎、表单设计器迭代",
    ],
  },
];
