export const state = () => ({
    ids:[]
});

export const getters = {
    getBoxes:(state) => {
        return state.ids;
    }
};

export const mutations = {
    set(state,data) {
        state.ids = data
    }
};

export const actions = {
    get ({commit}) {
        return new Promise((resolve,reject)=>{
            (async function(commit,resolve,reject,self){
                try {
                    const r = await self.$axios.$get("/api/boxes/get");
                    resolve(r);
                    commit("set",r)
                } catch ({response}) {
                    reject(response);
                }
            })(commit,resolve,reject,this);
        })
    },
    bet (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/boxes/bet",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    }
}