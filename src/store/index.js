import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
    // state: 用来保存所有的公共数据
    state: {
        userInfo: {
            userName: "油炸皮卡丘",
            age: "22",
            sex: "女"
        },
        token: "aerfrftregtyrb.rytyuhjyi",
        friends: ["Tom", "Herry", "Lucy"],
        likes: ["吃饭", '睡觉', '看电影'],
        money: 250
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        //   	模块名1： {
        //     		// namespaced为true，则在使用mutations时，就必须要加上模块名
        //       	namespaced: true,
        //   		  state: {},
        //   			getters: {},
        //   			mutations: {},
        //   			actions: {},
        //   			modules: {}
        //   	}，
        //     模块名2： {
        //         // namespaced不写，默认为false，则在使用mutations时，不需要加模块名
        //   		  state: {},
        //   			getters: {},
        //   			mutations: {},
        //   			actions: {},
        //          modules: {}
        //   	}
        //   }
    }
})

export default store
