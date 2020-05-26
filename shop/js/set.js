var app = new Vue({
    el: "#app",
    data: {
        message: 0,
        flag: true,

    },
    methods: {
        setValue: function() {
            var that = this;
            if (that.flag == true) {
                that.flag = false;
                axios.get(httpUrl, {
                        params: {
                            action: "setAllowance",
                            amount: that.message

                        }
                    })
                    .then(function(res) {
                        console.log(res)
                        var Code = res.data.code;
                        if (Code === 1) {
                            console.log("修改信息成功")
                            layer.open({
                                content: '设置成功',
                                skin: 'msg',
                                time: 2
                            });
                        }
                        if (Code === 2) {
                            window.location.href = loginUrl

                        }
                        that.flag = true

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

        },
        getValue: function() {
            var that = this;
            if (that.flag == true) {
                that.flag = false;
                axios.get(httpUrl, {
                        params: {
                            action: "shopdata",


                        }
                    })
                    .then(function(res) {
                        console.log(res)
                        var Code = res.data.code;
                        if (Code === 1) {
                            var shopAllowance = res.data.data.data.shopAllowance;
                            that.message = shopAllowance

                        }
                        if (Code === 2) {
                            window.location.href = loginUrl

                        }
                        that.flag = true

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

        },
    },
    mounted() {
        this.getValue()
    }
})