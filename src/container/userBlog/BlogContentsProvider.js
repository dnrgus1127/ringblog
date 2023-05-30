import React from 'react'
import PostCardList from '../../components/UserBlog/PostCardList';
import PageBySeries from '../../components/UserBlog/PageBySeries';
import Error from '../../components/common/Error/Error';

export default function BlogContentsProvider({ type = 0 }) {
    switch (type) {
        case 0:
            return <PostCardList uri={"/posts/writer"} />;
        case 1:
            return <PostCardList uri={"/popularPosts"} />;
        case 2:
            return <PageBySeries />;
        default:
            return <Error text="404 NOT FOUND" />;
    }

}
