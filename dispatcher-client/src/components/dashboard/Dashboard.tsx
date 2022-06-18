import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import useWindowSize from '../../hooks/useWindowSize';
import { asyncActions } from '../../store/asyncAtions';
import FilterArea from './components/filterArea/FilterArea';
import NavBar from '../navBar/NavBar';
import NewsWidget from './components/newsWidget/NewsWidget';
import GraphsArea from './components/graphsArea/GraphsArea';
import PageTitle from '../pageTitle/PageTitle';
import { DashboardContainer, DashboardContent, MainContent } from './styles';
import { SCREENS } from '../../utils/constants/screenSizes';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const defaultCountry = useAppSelector(
    (state) => state.location.defaultCountry
  );
  const { width, height } = useWindowSize();
  const { laptopM } = SCREENS;

  useEffect(() => {
    dispatch(asyncActions.fetchSources());
  }, [dispatch]);

  useEffect(() => {
    if (defaultCountry.id !== '') {
      dispatch(asyncActions.fetchGraphData());
      dispatch(asyncActions.fetchNews());
    }
  }, [dispatch, defaultCountry]);

  return (
    <DashboardContainer>
      <NavBar />
      <DashboardContent>
        <FilterArea />
        <PageTitle />
        <MainContent isPortrait={height > width ? true : false}>
          <NewsWidget />
          {width > laptopM && <GraphsArea />}
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;
