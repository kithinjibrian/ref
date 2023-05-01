export const state = () => ({
    src:null
});

export const getters = {
    getSrc:(state) => {
        return state.src;
    }
};

export const mutations = {
    set(state,data) {
        state.src = data.src
    }
};

export const actions = {
    src ({commit}) {
        return new Promise((resolve,reject)=>{
            (async function(commit,resolve,reject,self){
                try {
                    const r = await self.$axios.$get("/api/video/src");
                    resolve(r);
                    commit("set",r)
                } catch ({response}) {
                    reject(response);
                }
            })(commit,resolve,reject,this);
        })
    },
    played (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/video/played",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    }
}