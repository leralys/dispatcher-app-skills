import { IArticle } from './types/APITypes';
import { formatAreaChartDate } from './dateFormat';

export interface IGraphItem {
  name: string;
  amount: number;
}

type dataObjType = { [key: string]: number };

// split object with data to two arrays of graphs items where if amount is 1% and less sources are clustered together
const createArrSources = (obj: dataObjType, sum: number): IGraphItem[] => {
  const dataArr: IGraphItem[] = [];
  Object.entries(obj).forEach((el) => {
    const graphItem: IGraphItem = {
      name: el[0],
      amount: Math.round((el[1] * 100) / sum),
    };
    dataArr.push(graphItem);
  });
  return dataArr.sort((a, b) => b.amount - a.amount);
};

// returns two arrays of graphItems sorted by bigger amount, and total number of sources
export const prepareDoughnutData = (articles: IArticle[]) => {
  const sourcesObj: dataObjType = {};
  let sum = 0;
  articles.forEach((article) => {
    sourcesObj[article.source.name]
      ? sourcesObj[article.source.name]++
      : (sourcesObj[article.source.name] = 1);
    sum++;
  });
  return createArrSources(sourcesObj, sum);
};

// converts an object to an array of graphItem
const createArrDates = (obj: dataObjType): IGraphItem[] => {
  const dataArr: IGraphItem[] = [];
  Object.entries(obj).forEach((el) => {
    const graphItem: IGraphItem = { name: el[0], amount: el[1] };
    dataArr.push(graphItem);
  });
  return dataArr;
};

// returns an array of objects sorted by date e.g. [{name: '09/06', amount: 5}, {...}]
export const prepareAreaChartData = (articles: IArticle[]): IGraphItem[] => {
  const datesObj: dataObjType = {};
  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(a.publishedAt).valueOf() - new Date(b.publishedAt).valueOf()
  );
  sortedArticles.forEach((article) => {
    const formattedDate = formatAreaChartDate(article.publishedAt);
    datesObj[formattedDate]
      ? datesObj[formattedDate]++
      : (datesObj[formattedDate] = 1);
  });
  const arrGraphItems = createArrDates(datesObj);
  return arrGraphItems;
};

// splits an array into two, where if amount is <=1
// they are clustered together; returns total num of graphItems and the two arrays
export const partition = (data: IGraphItem[]) => {
  const total = data.length;
  let mainData: IGraphItem[] = [];
  let others: IGraphItem[] = [{ name: 'others', amount: 0 }];
  data.forEach((el) => {
    if (el.amount > 1) {
      mainData.push(el);
    } else {
      others[0].amount += el.amount;
    }
  });
  const concatenated =
    others[0].amount === 0 ? mainData : [...mainData, ...others];
  return { mainData, others, total, concatenated };
};
