import React from 'react';
import { useSelector } from 'react-redux';
import LoadingIcon from '../assets/images/loading.gif';
import '../scss/loading.scss';

const GlobalLoading = () => {
    const isloading = useSelector((state) => state.isloading)
    return (
        <div className={isloading ? 'loading' : 'hide'}>
            <img src={LoadingIcon} alt="loadinggif" />
        </div>
    );
};

export default GlobalLoading;
