import React from 'react';
import { TitleStyled } from './style';
import { useAppSelector } from '../../store/hooks';
import { findCountryById } from '../../utils/findCountryById';
import { MAX_API_RESULTS } from '../../utils/constants/maxValues';

export interface TitleProps {
  firstVisit?: boolean;
}

const PageTitle: React.FC = () => {
  const country = useAppSelector((state) => state.filters.country);
  const hasSearched = useAppSelector((state) => state.news.hasSearched);
  const totalResults = useAppSelector((state) => state.news.totalResults);
  const countryTitle = findCountryById(country).name;
  return (
    <TitleStyled firstVisit={!hasSearched}>
      {!hasSearched && `Top Headlines In ${countryTitle}`}
      {hasSearched &&
        totalResults !== -1 &&
        `${totalResults < MAX_API_RESULTS ? totalResults : MAX_API_RESULTS}
        Total results`}
    </TitleStyled>
  );
};

export default PageTitle;
