export const state = () => ({
    q:[]
});

export const getters = {
    getQuestions:(state) => {
        return state.q;
    }
};

export const mutations = {
    set(state,data) {
        state.q = data
    }
};

export const actions = {
    questions ({commit}) {
        return new Promise((resolve,reject)=>{
            (async function(commit,resolve,reject,self){
                try {
                    const r = await self.$axios.$get("/api/trivia/questions");
                    resolve(r);
                    commit("set",r)
                } catch ({response}) {
                    reject(response);
                }
            })(commit,resolve,reject,this);
        })
    },
    submit (_,data) {
        return new Promise((resolve,reject)=>{
            (async function(data,resolve,reject,self){
                try {
                    const r = await self.$axios.$post("/api/trivia/submit",data);
                    resolve(r);
                } catch ({response}) {
                    reject(response);
                }
            })(data,resolve,reject,this);
        })
    }
}