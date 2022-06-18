import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { newsActions } from '../../../../store/slices/newsSlice';
import { asyncActions } from '../../../../store/asyncAtions';
import { IArticle } from '../../../../utils/types/APITypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardPrimary from '../../../cardPrimary/CardPrimary';
import SkeletonCardList from '../../../skeletons/SkeletonCardList';
import NoData from '../../../noData/NoData';
import { CardsContainer } from './styles';
import { RESPONSES } from '../../../../utils/constants/responseStatus';
import {
  MAX_API_PAGE_NUM,
  MAX_API_RESULTS,
} from '../../../../utils/constants/maxValues';

const NewsWidget = () => {
  const dispatch = useAppDispatch();
  const { articles, totalResults, page, status, hasSearched } = useAppSelector(
    (state) => state.news
  );

  const getMoreData = () => {
    if (articles.length !== MAX_API_RESULTS && page !== MAX_API_PAGE_NUM) {
      dispatch(newsActions.incrementPage());
      dispatch(asyncActions.scrollNews());
      if (!hasSearched) {
        dispatch(newsActions.setHasSearched(true));
      }
    }
  };
  return (
    <CardsContainer id='scrollableDiv'>
      {status === RESPONSES.LOADING && <SkeletonCardList />}
      {totalResults > 0 && status !== RESPONSES.ERROR && (
        <InfiniteScroll
          dataLength={articles.length}
          next={getMoreData}
          hasMore={
            articles.length !== MAX_API_RESULTS || page !== MAX_API_PAGE_NUM
          }
          loader={null}
          scrollableTarget='scrollableDiv'
        >
          {articles.map((article: IArticle, index: number) => (
            <CardPrimary
              key={`${index}-${article.title}`}
              urlToImage={article.urlToImage}
              title={article.title}
              publishedAt={article.publishedAt}
              source={article.source}
              content={article.content}
              author={article.author}
              description={article.description}
              url={article.url}
            />
          ))}
        </InfiniteScroll>
      )}
      {(totalResults === 0 || status === RESPONSES.ERROR) && (
        <NoData type='search' />
      )}
    </CardsContainer>
  );
};
export default NewsWidget;
