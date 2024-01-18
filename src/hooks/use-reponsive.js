import { Grid, theme } from 'antd';
import { Breakpoint, ScreenMap, ScreenSizeMap } from 'antd/es/_util/responsiveObserver';

const { useBreakpoint } = Grid;

export function useResponsive() {
  const {
    token: { screenXS, screenSM, screenMD, screenLG, screenXL, screenXXL },
  } = theme.useToken();
  const screenArray = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  const screenEnum = {
    xs: screenXS,
    sm: screenSM,
    md: screenMD,
    lg: screenLG,
    xl: screenXL,
    xxl: screenXXL,
  };
  const screenMap = useBreakpoint();

  const currentScrren = screenArray.findLast((item) => {
    const result = screenMap[item];
    return result === true;
  });

  return {
    screenEnum,
    screenMap,
    currentScrren,
  };
}
