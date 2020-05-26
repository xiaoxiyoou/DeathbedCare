var app = new Vue({
    el: "#app",
    data: {
        setShow: false,
        results: "",
        flag: true,
        condition: "按月筛选",
        pageIndex: 1,
        switchColor: true,
        sdate: "",
        totalPage: '',
        switchColorNext: false,
        calendardetail: false,
        notext: false,
        scrollerHeight: "8rem",
        Message: "",
        slide: true,
        inputValue:"2019年11",

    },
    computed: {
       

    },
    methods: {

        pageContent: function(pageIndex, sdate) {
            this.sdate = sdate
            this.pageIndex = pageIndex
            console.log("pageIndex", pageIndex)
            var that = this;
            if (that.flag == true) {
                that.flag = false;

                axios.get(httpUrl, {
                        params: {
                            action: "monthtotal",
                            pageIndex,
                            PageSize: 8,
                            sdate: sdate

                        }
                    })
                    .then(function(res) {
                        console.log(res);
                        var data = res.data;
                        var Code = data.Code;
                        var Message = data.Message;
                        that.Message = Message;
                        console.log("Message", Message)
                        sessionStorage.setItem("shopId", Message);
                        var DataCount = data.DataCount;
                        // 取到总页数
                        var totalPage = Math.ceil(Number(DataCount) / 8);
                        that.totalPage = totalPage
                        // 当总页码为1
                        if (totalPage == 1) {
                            that.switchColorNext = true
                        }else{
                            that.switchColorNext = false
                        }
                        // 当页码相等时  下一页变暗
                        if (that.pageIndex == that.totalPage) {
                            that.switchColorNext = true
                            
                        }
                        // 当页码为第一页  下一页变暗
                        if (that.pageIndex == 1) {
                            that.switchColor = true;
                        }
                        // console.log("that.switchColorNext",that.switchColorNext)
                        // console.log("totalPage", totalPage)
                        // console.log("Code", Code);
                        if (Code === 0) {
                            that.switchColorNext = true
                            that.notext = true
                            that.results = "";

                        }
                        if (Code === 1) {
                            var results = data.Datas
                            console.log("result", results);
                            that.results = results;
                            that.notext = false
                        }
                        if (Code === 2) {
                            window.location.href = loginUrl

                        }
                        that.flag = true
                        that.calendardetail = true;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            }

        },
        // 切换下一页
        nextPage: function() {
            if (this.pageIndex < this.totalPage) {
                // 小于总页码
                this.pageIndex += 1;
                this.pageContent(this.pageIndex, this.sdate)
                // 把上一页变高亮
                this.switchColor = false;
            } else {
                layer.open({
                    content: '暂无更多数据',
                    skin: 'msg',
                    time: 2
                });

            }
            // if (this.pageIndex == this.totalPage) {
            //     this.switchColorNext = true
            // }
        },
        // 切换上一页
        prvePage: function() {
            if (this.pageIndex > 1) {
                this.pageIndex -= 1;
                this.pageContent(this.pageIndex, this.sdate)
                 // 把下一页变高亮
                this.switchColorNext = false
            } else {
                layer.open({
                    content: '当前为第一页',
                    skin: 'msg',
                    time: 2
                });
            }
            // if (this.pageIndex == 1) {
            //     this.switchColor = true;
            // }

        },
        // 点击设置
        setShowing: function() {
            if (this.setShow == true) {
                // 页面显示
                this.slide = false
                setTimeout(() => {
                    this.setShow = false
                }, 300)
            } else {
                this.setShow = !this.setShow
                this.slide = true
            }
        },
           // 选择日期
       demoClick: function(nowData) {
        var nowValue = nowData
        console.log(nowValue)
        new DatePicker({
            "type": "1", //0年, 1年月, 2月日, 3年月日
            "title": '', //标题(可选)
            "maxYear": "", //最大年份（可选）
            "minYear": "", //最小年份（可选）
            "separator": "年", //分割符(可选)
            "defaultValue": nowValue, //默认值（可选）

            "callBack": function(val) {
                //回调函数（val为选中的日期）
                nowValue = val;

            }
        });
    },
     // 改变时间
     changeTime: function(nowData) {
         this.inputValue = nowData
         console.log(" this.inputValue", this.inputValue)
       

    },



    },
  
    mounted() {
        // 取到当前月份
        var date = new Date();
        var now = sessionStorage.getItem("sdate") || date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1);
       
        this.condition = sessionStorage.getItem("inputValue") ||"按月筛选"  
        this.pageContent(this.pageIndex, now)      
        this.inputValue =sessionStorage.getItem("inputValue2") ||  date.getFullYear() + '年' + (parseInt(date.getMonth()) + 1);

    }
})