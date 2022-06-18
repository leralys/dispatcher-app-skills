import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { FlexColumn } from '../../styles/sharedStyles';
import { SCREENS } from '../../utils/constants/screenSizes';
import { COLORS } from '../../utils/constants/colors';

export const sx = { bgcolor: COLORS.secondary };

export const SkeletonCardImage = styled(Skeleton)`
  border-radius: 1.25rem 0 0 1.25rem;

  @media only screen and (max-width: ${SCREENS.breakpoint700}px) {
    border-radius: 1.25rem 1.25rem 0 0;
  }
`;

export const SkeletonSecondaryCardContainer = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const SkeletonPieContainer = styled.div`
  min-width: 9rem;
  min-height: 9rem;
  margin-top: 8%;
  justify-content: center;
  align-items: center;
`;

export const SkeletonDoughnutOuter = styled(Skeleton)`
  position: relative;
  top: 0.85rem;
  left: 0.85rem;
`;

export const SkeletonDoughnutInner = styled.div`
  width: 65%;
  height: 65%;
  background: ${COLORS.white};
  border-radius: 50%;
  position: relative;
  top: -63%;
  left: 17%;
`;

export const SkeletonAreaChartStyled = styled(Skeleton)`
  margin-top: 20%;
  margin-bottom: 5%;
`;
