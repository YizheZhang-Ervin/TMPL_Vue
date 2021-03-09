var app = new Vue({
    el: '#app',
    data: {},
    methods: {
        get() {
            axios.get("/axios")
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                })
        },
        post() {
            axios.post("/axios", { key: 'value' })
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                })
        }
    }
})