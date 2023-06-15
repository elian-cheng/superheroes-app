import { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setPage } from 'store/heroSlice';

const Pagination: FC<{ topHeight: number }> = ({ topHeight }) => {
  const dispatch = useAppDispatch();
  const { page, limit, count } = useAppSelector((state) => state.heroes);

  const [totalPages, setTotalPages] = useState<number[]>([]);

  const countTotalPage = useCallback(() => {
    const arr = [];
    for (let index = 1; index <= Math.ceil(count / limit); index++) {
      arr.push(index);
    }
    setTotalPages(arr);
  }, [count, limit]);

  const changePageHandler = useCallback(
    (p: number) => {
      dispatch(setPage(p));
      window.scrollTo(0, topHeight);
    },
    [dispatch, topHeight]
  );

  useEffect(() => {
    countTotalPage();
    dispatch(setPage(page));
  }, [page, countTotalPage, dispatch]);

  if (!count) {
    return <></>;
  }

  return (
    <section className="pagination__wrapper">
      <button
        className="pagination__arrow-left"
        onClick={() => page > 1 && changePageHandler(page - 1)}
      >
        &#8249;
      </button>
      <div className="pagination__pages-number">
        {totalPages
          .filter((p) => p < page + 4 && p > page - 4)
          .map((p) => (
            <button
              key={p}
              onClick={() => changePageHandler(p)}
              className={`pagination__page-number ${
                p === page ? 'pagination__page-number_active' : ''
              }`}
            >
              {p}
            </button>
          ))}
      </div>
      <button
        className="pagination__arrow-right"
        onClick={() => page < totalPages.length && changePageHandler(page + 1)}
      >
        &#8250;
      </button>
    </section>
  );
};

export default Pagination;
