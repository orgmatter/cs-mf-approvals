export const Session = {
    check: () => {
        
        return (localStorage.getItem('isLogin') === 'true' && localStorage.getItem('accessToken') !== '');
        // return true;
    },
    getStaff: () => {

        if(Session.check()) {

            return JSON.parse(localStorage.getItem('staff'));
        }
    },
    getToken: () => {

        if(Session.check()) {

            return localStorage.getItem('accessToken');
        }
    },
    getAdminRoles: () => {

        if(Session.check()) {

            return Session.getStaff().groups[1];
        }
    },
    logout: () => {

        if(Session.check()) {

            localStorage.clear();
            window.location = '/';
            
        }
    }
}