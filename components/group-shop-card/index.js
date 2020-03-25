Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tableData: {
            type: Array,
            value: [],
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //跳转商品详情
        onProductDetail(e) {
            wx.navigateTo({
                url: `/pages/home/productDetail/productDetail?postId=${e.currentTarget.dataset.item.id}&userId=${e.currentTarget.dataset.item.userId}`
            })
        },

    }
})
