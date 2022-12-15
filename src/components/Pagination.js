import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from './Loader';

const Pagination = (props) => {

    const history = useHistory();
    const [isBottom, setIsBottom] = useState(false);

    const [showLoading, setShowLoading] = useState(false);
    const params = useLocation();
    const searchParams = new URLSearchParams(params.search);
    const oldPathname = localStorage.getItem('pathname');
    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        setShowLoading(false);
        // eslint-disable-next-line
    }, [props.data]);

    useEffect(() => {
        if (oldPathname !== params.pathname) {
            setPage(1);
            localStorage.setItem("pathname", params.pathname);
        }
        // eslint-disable-next-line
    }, [params.pathname]);

    useEffect(() => {
        setShowLoading(true);
        props.preparePageData(page);
        history.push('?page=' + page);
        // eslint-disable-next-line
    }, [page]);

    // Update page counter when is bottom
    useEffect(() => {
        console.log('isBottom', isBottom)
        if (isBottom) {
            setPage(page + 1);
        }
        // eslint-disable-next-line
    }, [isBottom]);

    // Add scroll event
    useEffect(() => {
        localStorage.setItem("pathname", params.pathname);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line
    }, []);

    const handleScroll = () => {
        let scrollbarHeight = window.innerHeight * (window.innerHeight / document.documentElement.scrollHeight);
        let maxPos = parseInt(document.getElementById('photo-container').offsetTop);
        let scrollToTop = window.pageYOffset;
        let maxScroll = parseInt(scrollToTop) + scrollbarHeight + 500;
        if ((scrollToTop + window.innerHeight) >= document.documentElement.scrollHeight - 100) {
            if (maxScroll >= maxPos || maxScroll < maxPos) {
                console.log('2')
                setIsBottom(true);
            } else {
                console.log('3')
                setIsBottom(false);
            }
        } else {
            setIsBottom(false);
        }
    };

    return (
        showLoading ? <Loader /> : ""
    );
}

export default Pagination;