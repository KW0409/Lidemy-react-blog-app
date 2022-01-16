import { useMemo, useCallback } from "react";

export default function usePagination(pageDatas, setPageDatas) {
  const { currentPage, totalPage } = pageDatas;

  const totalPageArray = useMemo(() => {
    return Array.from({ length: totalPage }, (item, index) => index + 1);
  }, [totalPage]);

  const slicePageArray = useMemo(() => {
    if (currentPage < 6) return totalPageArray.slice(0, 6);
    else if (currentPage > totalPage - 5)
      return totalPageArray.slice(totalPage - 6);
    else return totalPageArray.slice(currentPage - 2, currentPage + 1);
  }, [currentPage, totalPage, totalPageArray]);

  const handleChangePage = useCallback(
    (pageValue) => {
      switch (pageValue) {
        case "prev":
        case "next":
          setPageDatas((prevState) => {
            return {
              ...prevState,
              currentPage:
                pageValue === "prev"
                  ? prevState.currentPage--
                  : prevState.currentPage++,
            };
          });
          break;
        default:
          setPageDatas((prevState) => {
            return {
              ...prevState,
              currentPage: pageValue,
            };
          });
      }
    },
    [setPageDatas]
  );

  return {
    currentPage,
    totalPage,
    totalPageArray,
    slicePageArray,
    handleChangePage,
  };
}
