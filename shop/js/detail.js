var app = new Vue({
    el: "#app",
    data: {
        date: "",
        flag: true,
        results: "",
        isActive: 0,
        receive: "",
        sysUserId: "",
        totalPage: '',
        pageIndex: 1,
        switchColor: true,
        switchColorNext: false,
        calendardetail: false,
        notext: false,


    },

    methods: {
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return decodeURI(r[2]);
            return null; //返回参数值
        },
        pageContent: function(pageIndex, sdate) {

            console.log("pageIndex", pageIndex)
            var that = this;
            if (that.flag == true) {
                that.flag = false;

                axios.get(httpUrl, {
                        params: {
                            action: "daytotal",
                            pageIndex,
                            PageSize: 10,
                            sdate

                        }
                    })
                    .then(function(res) {
                        console.log(res);
                        var data = res.data;
                        var Code = data.Code
                            // 数据为空
                        if (Code === 0) {
                            that.switchColorNext = true
                            that.notext = true

                        }
                        if (Code === 1) {

                            var results = data.Datas;
                            that.results = results;
                            console.log("result", results)

                            var receive = results.map(function(item) {
                                return item.WriteOff;
                            });
                            var sysUserId = results.map(function(item) {
                                return item.SysUserId;
                            });
                            that.receive = receive;
                            that.sysUserId = sysUserId;
                            
                            var DataCount = data.DataCount;

                            // 取到总页数
                            var totalPage = Math.ceil(Number(DataCount) / 10);
                            // 只有一页
                            if (totalPage == 1) {
                                that.switchColorNext = true
                            }
                            that.totalPage = totalPage

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
        // 下一页
        nextPage: function() {
            if (this.pageIndex < this.totalPage) {

                this.pageIndex += 1;
                this.pageContent(this.pageIndex, this.date)
                this.switchColor = false;
            } else {
                layer.open({
                    content: '暂无更多数据',
                    skin: 'msg',
                    time: 2
                });

            }

            if (this.pageIndex == this.totalPage) {
                this.switchColorNext = true

            }
        },
        // 上一页
        prvePage: function() {
            if (this.pageIndex > 1) {
                this.pageIndex -= 1;
                this.pageContent(this.pageIndex, this.sdate)
                this.switchColorNext = false
            } else {
                layer.open({
                    content: '当前为第一页',
                    skin: 'msg',
                    time: 2
                });

            }
            if (this.pageIndex == 1) {
                this.switchColor = true;
            }
        },

        // 核销
        cancel: function(Allowance, index) {
            var receive = this.receive[index]
            var sysUserId = this.sysUserId[index]
            // console.log("Allowance",Allowance)
            // console.log("receive",receive)
            // console.log("sysUserId",sysUserId)
           if(Allowance > 0){
          
            var that = this
               if (receive == 0) {
                layer.open({
                    content: '您确定要核销本条惠民补贴金吗？',
                    btn: ['确认', '取消'],
                    yes: function(layerindex) {
                        axios.get(httpUrl, {
                                params: {
                                    action: "userallowance",
                                    sysUserId,

                                }
                            })
                            .then(function(res) {
                                console.log(res)
                                var code = res.data.code;
                                if (code == 1) {
                                    console.log("核销补贴金成功")
                                    layer.open({
                                        content: '核销成功',
                                        skin: 'msg',
                                        time: 2
                                    });
                                }
                                console.log("that.receive", that.receive)
                                console.log("index", index)
                                Vue.set(that.receive, index, 1)


                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        layer.close(layerindex);
                    }
                });


            } else {
                layer.open({
                    content: '已核销',
                    skin: 'msg',
                    time: 2
                });

            }
            }else{
            layer.open({
                content: '核销失败，用户未获得补贴金',
                skin: 'msg',
                time: 2
            });
        }
        },



    },
    mounted() {
        this.date = this.getUrlParam("date")
        console.log("date", this.date)
        this.pageContent(this.pageIndex, this.date)



    }
})