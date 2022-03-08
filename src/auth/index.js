import { API } from "../config";
export const signup = (user) => {
    // console.log(name, email, password);
    const form = new FormData();
    form.append("email",user);
    return fetch(`http://localhost:5000/signup`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
        return response.json();
        })
        .catch((err) => {
        console.log(err);
        });
    };
    export const Emails = (user) => {
        // console.log(name, email, password);
        return fetch(`http://localhost:5000/email-verification`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
            return response.json();
            })
            .catch((err) => {
            console.log(err);
            });
        };
    
    export const signin = (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
        return response.json();
        })
        .catch((err) => {
        console.log(err);
        });
    };
    
    export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
    };
export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return localStorage.getItem('jwt');
    } else {
        return false;
    }
};

    export const signout = (next) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            next();
            return fetch(`${API}/signout`, {
            method: 'GET',
            })
            .then((response) => {
                console.log('signout', response);
            })
            .catch((err) => console.log(err));
        }
};