export default {
    namespaced: true,
    state: () => ({
        alerts: [],
        hasError: false,
    }),
    getters: {
        alerts: (state : any) => {
            return state.alerts
        },
        hasError: (state : any)  => {
            return state.hasError
        }
    },
    actions: {
        addAlert(context: any, payload: any){
            context.state.alerts.push(payload);
        }
    },
    mutations: {
        addAlert (state: any, payloads: any) {
            state.alerts.push(payloads);
            state.hasError = true;

            setTimeout(function(){
                state.alerts.splice(0, 1);
                if(state.alerts.length < 1){
                    state.hasError = false;
                }
            }, 5000);
        }     
    }
}
