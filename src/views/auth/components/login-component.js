import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Card from '@material-ui/core/Card';
import LoaderComponent from './loader-component';
import { appImgs as APP_IMGS } from '../../images';

export default function LoginComponent(props) {

    const { loginComponentProps } = props;
    
    const { loginState, dispatchLoginAction } = loginComponentProps;

    const inputValObj = {
        username: '',
        password: ''
    }

    const [inputVal, setInputVal] = useState(inputValObj);
    const [isPwdVisible, setIsPwdVisible] = useState(false);

    const handleInputChange = (e) => {
        setInputVal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handlePwdVisibility = (e) => {
        setIsPwdVisible(prevState => !prevState);
    }

    const isAnyFieldEmpty = () => {
        
        if((inputVal.username !== '') && (inputVal.password !== '')) {
            return false;
        }
        return true;
    }

    const handleBtnDisabled = () => {
        if(isAnyFieldEmpty()) {
            return true;
        }
        if(!isAnyFieldEmpty() && !loginState.isFetching) {
            return false;
        }
        if(!isAnyFieldEmpty() && loginState.isFetching && loginState.isLogin !== '' && !loginState.isLogin) {
            return false;
        }
        if(!isAnyFieldEmpty() && loginState.isFetching && loginState.isLogin !== '' && loginState.isLogin) {
            return true;
        }
        return false;
    }

    const handleBtnBgColor = () => {

        if(isAnyFieldEmpty()) {
            return {
                backgroundColor: 'rgba(240, 240, 240, 0.8)',
                color: 'rgba(0, 0, 0, 0.6)',
            };
        }
        if(!isAnyFieldEmpty() && !loginState.isFetching) {
            return {
                backgroundColor: '#171d2b',
            };
        }
        if(!isAnyFieldEmpty() && loginState.isFetching  && loginState.isLogin !== '' && !loginState.isLogin) {
            return {
                backgroundColor: '#171d2b',
            };
        }
        if(!isAnyFieldEmpty() && loginState.isFetching  && loginState.isLogin !== '' && loginState.isLogin) {
            return {
                backgroundColor: 'rgba(240, 240, 240, 0.8)',
                color: 'rgba(0, 0, 0, 0.6)',
            };
        }
        return {
            backgroundColor: 'rgba(240, 240, 240, 0.8)',
        };
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        dispatchLoginAction(inputVal);
    }

    useEffect(() => {

        loginState.isLogin !== '' && loginState.isLogin && (window.location = '/dashboard');

        
        loginState.isLogin !== '' && !loginState.isLogin && 
        setTimeout(() => {

            (window.location = '/');
        }, 4000);

    }, [loginState.isLogin !== '' && !loginState.isLogin ? false : loginState.isLogin])
    
    return (
        <div className="login-component-container">
            <div className="login-component-flex">
                <div className="login-component-item">
                    <div className="login-form-cover-flex">
                        <div className="login-form-cover-item">
                            <div className="form-cover-flex">
                                <div className="form-cover-item">
                                    <div className="app-logo-cover-flex">
                                        <div className="app-logo-cover-item">
                                            <img className="app-logo-img" src={APP_IMGS.appLogo} alt="app logo" />
                                        </div>
                                    </div>
                                    <Card className="form-card-cover">
                                        <div className="form-card-header-cover">
                                            <div className="header-cover-flex">
                                                <div className="header-cover-item">
                                                    <h2 className="header-text-cover">
                                                        <span className="text-span">Admin Login</span>
                                                        <span className="text-icon-span"><LockIcon className="lock-icon" /></span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-card-content-cover">
                                            <div className="content-cover-flex">
                                                <div className="content-cover-item">
                                                    <form className="login-form" id="login_form" method="post" onSubmit={handleLoginSubmit}>
                                                        <div className="form-input-cover-flex">
                                                            <div className="form-input-cover-item">
                                                                <TextField
                                                                    className="form-input"
                                                                    id="email_input"
                                                                    name="username"
                                                                    type="text"
                                                                    onChange={handleInputChange}
                                                                    value={inputVal.username}
                                                                    label='Username'
                                                                    variant="outlined"
                                                                    placeholder="Username"
                                                                    InputProps={{
                                                                        endAdornment: 
                                                                        <InputAdornment position="end">
                                                                            <IconButton className="form-input-icon-btn">
                                                                                <PersonIcon className="form-input-icon" />
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-input-cover-flex">
                                                            <div className="form-input-cover-item">
                                                                <TextField
                                                                    className="form-input"
                                                                    id="password_input"
                                                                    name="password"
                                                                    type={isPwdVisible ? 'text' : 'password'}
                                                                    onChange={handleInputChange}
                                                                    value={inputVal.password}
                                                                    variant="outlined"
                                                                    label='Password'
                                                                    placeholder="Password"
                                                                    InputProps={{
                                                                        endAdornment: 
                                                                        <InputAdornment position="end">
                                                                            <IconButton 
                                                                                className="form-input-icon-btn"
                                                                                onClick={handlePwdVisibility}
                                                                            >
                                                                                {
                                                                                    isPwdVisible ? <VisibilityIcon className="form-input-icon" /> : 
                                                                                    <VisibilityOffIcon className="form-input-icon" />
                                                                                }
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <div className="form-input-text-cover-flex">
                                                            <div className="form-input-text-cover-item">
                                                                <p className="form-input-text">Forgot Password</p>
                                                            </div>
                                                        </div> */}
                                                        <div className="form-btn-cover-flex">
                                                            <div className="form-btn-cover-item">
                                                                <Button
                                                                    className={'form-btn'}
                                                                    id="submit-btn"
                                                                    type="submit"
                                                                    color="primary"
                                                                    variant="contained"
                                                                    disabled={handleBtnDisabled()}
                                                                    style={handleBtnBgColor()}
                                                                >
                                                                    {
                                                                        loginState.isFetching ?
                                                                        (<div className="loader-cover">
                                                                            <LoaderComponent />
                                                                        </div>):
                                                                        <div className="btn-text-cover">
                                                                            <span className="btn-text">Login</span>
                                                                        </div>
                                                                    }
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}