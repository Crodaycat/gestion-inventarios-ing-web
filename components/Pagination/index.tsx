import { FC, useMemo } from 'react';

export interface PaginationProps {
  currentPage?: number;
  itemsPerPage?: number;
  totalCount?: number;
  updatePage?: (page: number) => void;
}

export const Paginator: FC<PaginationProps> = ({
  currentPage = 1,
  itemsPerPage = 20,
  totalCount = 0,
  updatePage = () => {},
}) => {
  const [totalPages, pages] = useMemo(() => {
    const total = Math.ceil(totalCount / itemsPerPage);
    const pages = Array.from({ length: total }, (_, i) => i);

    return [total, pages];
  }, [totalCount, itemsPerPage]);

  const [from, to] = useMemo(() => {
    if (totalCount === 0) return [0, 0];

    const from = (currentPage - 1) * itemsPerPage + 1;
    const to = Math.min(currentPage * itemsPerPage, totalCount);

    return [from, to];
  }, [currentPage, itemsPerPage, totalCount]);

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    updatePage(page);
  };

  return (
    <nav
      role='navigation'
      aria-label='Pagination Navigation'
      className='flex flex-col items-center w-full gap-2 md:flex-row'
    >
      <p className='flex-1 text-sm text-center text-slate-500 md:text-left'>
        Mostrando resultados {from} a {to} de {totalCount}
      </p>

      <ul className='flex list-none items-center justify-center divide-x divide-slate-200 overflow-hidden rounded border border-slate-200 text-sm text-slate-700'>
        <li>
          <button
            aria-label='Goto Page 1'
            className='inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-50 hover:stroke-slate-500 hover:text-slate-500 focus:bg-slate-50 focus:stroke-slate-600 focus:text-slate-600 focus-visible:outline-none'
            type='button'
            onClick={() => {
              setPage(currentPage - 1);
            }}
          >
            <span className='order-2 md:sr-only'>Anterior</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='-mx-1 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              role='graphics-symbol'
              aria-labelledby='title-35 desc-35'
            >
              <title id='title-35'>Página anterior</title>
              <desc id='desc-35'>Botón hacia la página anterior</desc>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              aria-label='Goto Page 1'
              className={`hidden h-10 items-center justify-center stroke-slate-700 px-4 text-sm font-medium transition duration-300  focus-visible:outline-none md:inline-flex ${
                currentPage === page + 1
                  ? 'whitespace-nowrap text-white bg-slate-500 hover:bg-slate-600 focus:bg-slate-700'
                  : 'stroke-slate-700 text-slate-700 hover:bg-slate-50 hover:text-slate-500 focus:bg-slate-50 focus:text-slate-600'
              }`}
              type='button'
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {page + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            aria-label='Goto Page 4'
            className='inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-50 hover:stroke-slate-500 hover:text-slate-500 focus:bg-slate-50 focus:stroke-slate-600 focus:text-slate-600 focus-visible:outline-none'
            type='button'
            onClick={() => {
              setPage(currentPage + 1);
            }}
          >
            <span className='md:sr-only'>Siguiente</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='-mx-1 h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              role='graphics-symbol'
              aria-labelledby='title-36 desc-36'
            >
              <title id='title-36'>Siguiente página</title>
              <desc id='desc-36'>Botón hacia la siguiente página</desc>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
