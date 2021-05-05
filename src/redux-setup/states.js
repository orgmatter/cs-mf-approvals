export const States = {
    auth: {
        login: {
            isFetching: false,
            isLogin: '',
            status: '',
            response: {}
        },
        logout: {
            isFetching: false,
            isLogout: false,
            status: '',
            response: {}
        }
    },
    dashboard: {
        get: {
            isFetching: false,
            status: '',
            response: []
        },
        post: {
            isFetching: false,
            status: '',
            response: []
        },
    }
}