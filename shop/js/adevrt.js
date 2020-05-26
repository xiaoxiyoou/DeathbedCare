var app = new Vue({
    el: "#app",
    data: {
        show: false,
        results: "",
        flag: true,
        notext: false,
        Message:""

    },
    methods: {
        getDataList: function() {
            var that = this;
            if (that.flag == true) {
                that.flag = false;
                axios.get(httpUrl, {
                        params: {
                            action: "deathedadlist",
                            pageIndex: 1,
                            PageSize: 100


                        }
                    })
                    .then(function(res) {
                        console.log(res)
                        var code = res.data.Code
                        that.Message = parseInt(res.data.Message)
                        console.log("that.Message",that.Message)
                        if (code == 1) {
                           var results = res.data.Datas
                            console.log("results", results)
                            that.results = results
                            that.show = true
                            that.notext = false

                        } else if (code == 0) {
                            that.notext = true
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
        clickssession: function() {

            //删除名称为key的信息。
            sessionStorage.removeItem("shopAdId");
          
            if(this.Message){
                 window.location.href = './adevrtDatail.html'
            }else{
             layer.open({
                      content: '您当前最多只能添加5条广告',
                       skin: 'msg',
                       time: 2
                });
            }
        }

    },
    mounted() {
        // 回退刷新
        setTimeout(() => {
            this.getDataList()

        }, 100);

    }
})