var app = new Vue({
    el: "#app",
    data: {
        show: false,
        results: "",
        flag: true,
        AdId: "",
        img: "./img/noImg.jpg",
        nowData: "",
        sdate: "",
        AdName: "",
        AdLink: "",
        StartDate: "",
        EndDate: "",
        shopId: "",
        shopAdId: "",
        onlineState: "下线",
       


    },
    methods: {
        // 取到问号后面的参数
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        // 请求页面内容
        getDetailList: function(AdId) {
            var that = this;
            if (that.flag == true) {
                that.flag = false;
                axios.get(httpUrl, {
                        params: {
                            action: "deathedaddata",
                            AdId,

                        }
                    })
                    .then(function(res) {
                        console.log(res)
                        var code = res.data.code
                        if (code == 1) {
                          
                            // 编辑广告
                            var results = res.data.data.data
                            console.log("results", results)
                            that.results = results
                            that.AdName = that.results.AdName
                            that.AdLink = that.results.AdLink
                            that.img = results.AdImg
                            that.shopId = results.ShopId
                                // 检验信息是否为空
                            if (results.StartDate) {
                                that.StartDate = that.ChangeDateFormat(results.StartDate)
                            }
                            if (results.EndDate) {
                                that.EndDate = that.ChangeDateFormat(results.EndDate)
                            }
                            that.State = results.State
                            console.log("that.State",that.State)
                            if (that.State) {
                                that.onlineState = "下线"
                            } else {
                                that.onlineState = "上线"
                            }
                            that.show = true


                        } else if (code == 0) {
                            // 添加广告
                            that.AdLink = ""
                            that.AdName = ""
                            that.img = "./img/noImg.jpg"
                            var date = new Date();
                            var now = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
                            console.log("now", now)
                            that.nowData = now
                            that.show = true
                        } else if (code == 2) {
                            window.location.href = loginUrl
                        }

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

        },
        // 保存并上线   修改广告
        saveOline: function() {
            var that = this;
            if (!that.AdName) {
                layer.open({
                    content: '请输入广告名称',
                    skin: 'msg',
                    time: 2
                });
                return false;

            }
            if (!that.img) {
                layer.open({
                    content: '请上传广告图片',
                    skin: 'msg',
                    time: 2
                });
                return false;

            }

            axios.get(httpUrl, {
                params: {
                    action: "deathedadedit",
                    AdName: that.AdName,
                    AdImg: that.img,
                    AdLink: that.AdLink,
                    StartDate: that.StartDate,
                    EndDate: that.EndDate,
                    AdId: that.AdId
                }
            })

            .then(function(res) {
                    console.log(res)
                    var code = res.data.code
                    if (code == 1) {
                        layer.open({
                            content: '保存成功',
                            skin: 'msg',
                            time: 2
                        });
                        that.onlineState = "下线"

                    } else if (code == 0) {
                        layer.open({
                            content: '广告名称重复，请修改后重试',
                            skin: 'msg',
                            time: 2
                        });

                    }
                })
                .catch(function(error) {

                });

        },
        // 保存并上线  新添加广告
        saveNewOline: function() {
            var that = this;
           
           
            if (!that.AdName) {
                layer.open({
                    content: '请输入广告名称',
                    skin: 'msg',
                    time: 2
                });
                return false;

            }
            if (!that.img || that.img == "./img/noImg.jpg") {
                layer.open({
                    content: '请上传广告图片',
                    skin: 'msg',
                    time: 2
                });
                return false;

            }

            axios.get(httpUrl, {
                    params: {
                        action: "deathedadadd",
                        AdName: that.AdName,
                        AdImg: that.img,
                        AdLink: that.AdLink,
                        StartDate: that.StartDate,
                        EndDate: that.EndDate,

                    }
                })
                .then(function(res) {
                    console.log(res)
                    var code = res.data.code
                    if (code == 1) {
                        that.shopAdId = res.data.data.data.AdId
                        that.shopId = res.data.data.data.shopId
                        console.log("that.shopAdId", that.shopAdId)
                        layer.open({
                            content: '保存成功',
                            skin: 'msg',
                            time: 2
                        });
                        sessionStorage.setItem("shopAdId", that.shopAdId);

                    } else if (code == 0) {
                        layer.open({
                            content: '广告名称重复，请修改后重试',
                            skin: 'msg',
                            time: 2
                        });

                    }
                })
                
                .catch(function(error) {

                });
                     
           

        },
        // 图片上传
        setImg: function(img) {
            this.img = img
            console.log("img", img)


        },
        // 删除广告
        deleteAdevrt: function() {
            var that = this
            layer.open({

                content: '您确定要删除本条广告吗？',
                btn: ['确认', '取消'],
                yes: function(layerindex) {
                    axios.get(httpUrl, {
                            params: {
                                action: "deathedaddel",
                                AdId: that.AdId

                            }
                        })
                        .then(function(res) {
                            console.log("删除", res)
                            var code = res.data.code
                            if (code == 1) {

                                window.history.go(-1);
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    layer.close(layerindex);

                }
            });
        },
        // 广告上下线
        // Offline: function(State) {
        //     var that = this
            // if (that.onlineState == "下线") {
                // 广告下线
                // axios.get(httpUrl, {
                //         params: {
                //             action: "deathedaddownonline",
                //             AdId: this.AdId

                //         }
                //     })
                //     .then(function(res) {
                //         console.log("下线", res)
                //         var code = res.data.code
                //         if (code == 1) {
                //             that.onlineState = "上线"
                //             layer.open({
                //                 content: '下线成功',
                //                 skin: 'msg',
                //                 time: 2
                //             });
                //         }
                //     })
                //     .catch(function(error) {
                //         console.log(error);
                //     });

            // } 
            // else {
            //     // 广告上线
            //     axios.get(httpUrl, {
            //             params: {
            //                 action: "deathedaduponline",
            //                 AdId: this.AdId

            //             }
            //         })
            //         .then(function(res) {
            //             console.log("下线", res)
            //             var code = res.data.code
            //             if (code == 1) {
            //                 that.onlineState = "下线"
            //                 layer.open({
            //                     content: '上线成功',
            //                     skin: 'msg',
            //                     time: 2
            //                 });
            //             }
            //         })
            //         .catch(function(error) {
            //             console.log(error);
            //         });

            // }
        // },


        // 格式化时间
        ChangeDateFormat: function(cellval) {
            var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + currentDate;
        },
        // 改变时间
        changeTime: function(nowData) {


            if (this.sdate == "StartDate") {
                this.StartDate = nowData
            } else {
                this.EndDate = nowData
            }

        },
        // 选择日期
        demoClick: function(nowData, sdate) {

            this.sdate = sdate
            var nowValue = nowData
            console.log(nowValue)
            new DatePicker({
                "type": "3", //0年, 1年月, 2月日, 3年月日
                "title": '', //标题(可选)
                "maxYear": "", //最大年份（可选）
                "minYear": "", //最小年份（可选）
                "separator": "-", //分割符(可选)
                "defaultValue": nowValue, //默认值（可选）

                "callBack": function(val) {
                    //回调函数（val为选中的日期）
                    nowValue = val;

                }
            });
        },
        // 点击分享
        shareOnLoad: function() {
            if (this.shopAdId) {

                window.location.href = "./shareAdevrt.html?AdId=" + this.shopAdId
            } else {
                layer.open({
                    content: '请先保存',
                    skin: 'msg',
                    time: 2
                });
            }

        },
        // 点击预览
        deathbedOnload: function() {

            if (this.shopAdId) {

                window.location.href = 'http://192.168.8.151:8081/?shopId=' + this.shopId + '!' + this.shopAdId
                    // window.location.href = 'http://b.fuyulove.com/ShopActity/deathbed/index.html?shopId=' + this.shopId + '!' + this.shopAdId
            } else {
                layer.open({
                    content: '请先保存',
                    skin: 'msg',
                    time: 2
                });
            }

        },

    },


    mounted() {

        this.AdId = this.getUrlParam("AdId")
        var shopAdId = sessionStorage.getItem("shopAdId")
        if (this.AdId) {
            // 从列表进入
            setTimeout(() => {
                this.getDetailList(this.AdId)
            }, 100);
            this.shopAdId = this.AdId
        } else if (shopAdId) {
            // 回退  新添加广告
            this.getDetailList(shopAdId)
            this.shopAdId = shopAdId
        } else {
            // 从添加广告进入
            this.getDetailList(this.AdId)
        }



    }
})