/**
 *   Create by Knove
 *   2018/3/16 15:16:12
 *   针对分页的封装
 **/
 class WebPage {
   constructor(nowPage, pageSize) {
     /**
      * 当前页码
      */
     this.nowPage = nowPage;
     /**
      *  一页多少条数据
      */
     this.pageSize = pageSize;
     /**
      * 排序
      */
     // this.orderBy = orderBy;
   }
   // get set ... 方法
 }
 module.exports = WebPage;
