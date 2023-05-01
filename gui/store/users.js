export const state = () => ({
    upline:{},
    downlines:[]
});

export const getters = {
    getUpline:(state)=>{
        return state.upline
    },
    getDownlines:(state)=>{
        return state.downlines
    },
};

export const mutations = {
    set(state,data) {
        state.upline = Object.assign({},state.upline,data.upline);
        state.downlines = data.downlines.map(i=>{
            return {
                id:i.id,
                username:i.username,
                initiated:(i.initiated) ? "true" : "false"
            }
        })
    }
}

export const actions = {
    lines ({commit}) {
        return new Promise((resolve,reject)=>{
            (async function(commit,resolve,reject,self){
                try {
                    const r = await self.$axios.$get("/api/users/lines");
                    resolve(r);
                    commit("set",r)
                } catch ({response}) {
                    reject(response);
                }
            })(commit,resolve,reject,this);
        })
    }
}