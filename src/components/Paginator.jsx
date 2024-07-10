import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

const Paginator = ({ url, paginator }) => {
  const [activePage, setActivePage] = useState(paginator.number);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <Pagination className='mt-2 justify-start'>
      {paginator?.length == 1 || (
        <PaginationContent>
          {paginator.number == 0 ||
            <PaginationItem>
              <PaginationPrevious 
                href={`${url}/${paginator.number - 1}`}
                isActive />
            </PaginationItem>
          }

          <PaginationItem >
            <PaginationLink 
              href={`${url}/0`}
              isActive={activePage == 0}
              onClick={() => handleClick(0)}
              className={paginator.first ? 'disabled' : ''} >
                <ChevronDoubleLeftIcon className='size-4' />
              </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href='#' >
              {paginator.number + 1}
            </PaginationLink>
          </PaginationItem>

          {paginator.number >= paginator.totalPages - 1 ||
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          }

          <PaginationItem>
            <PaginationLink 
              href={`${url}/${paginator.totalPages - 1}`}
              isActive={activePage == paginator.totalPages - 1}
              onClick={() => handleClick(paginator.totalPages - 1)}
              className={paginator.last ? 'disabled' : ''} >
                <ChevronDoubleRightIcon className='size-4' />
              </PaginationLink>
          </PaginationItem>

          {paginator.number >= paginator.totalPages - 1 ||
              <PaginationItem>
                <PaginationNext 
                  href={`${url}/${paginator.number + 1}`} 
                  isActive />
              </PaginationItem>
          }

        </PaginationContent>
      )}
    </Pagination>
  );
};

export { Paginator };
