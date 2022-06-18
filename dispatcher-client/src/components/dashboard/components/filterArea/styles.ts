import styled from 'styled-components';
import { FlexColumn, FlexRow } from '../../../../styles/sharedStyles';
import { COLORS } from '../../../../utils/constants/colors';
import { SCREENS } from '../../../../utils/constants/screenSizes';

export const FiltersWrapper = styled(FlexColumn)`
  padding-inline: 12.5%;
  @media only screen and (max-width: 900px) {
    padding-inline: 1.25rem;
    border-top: 1px solid ${COLORS.secondary};
  }
  @media only screen and (max-width: ${SCREENS.mobileL}px) {
    padding-inline: 1rem;
  }
`;

export const FilterDiv = styled(FlexRow)`
  padding-block: 1.25rem;
  align-items: center;
  gap: min(1.25rem, 2%);
  overflow-x: hidden;

  @media only screen and (max-width: 880px) {
    gap: max(1.25rem, 3%);
    justify-content: space-evenly;
  }
  @media only screen and (max-width: ${SCREENS.tabletM}px) {
    width: 100%;
    margin-left: 0;
    padding-left: 0;
    display: grid;
    background: none;
    grid-template-columns: repeat(4, 1fr);
    padding-block: 1rem;
    border-top: none;
  }
  @media only screen and (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: ${SCREENS.breakpoint500}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const BottomLine = styled.div`
  width: 100;
  height: 1px;
  background: ${COLORS.secondary};
`;
