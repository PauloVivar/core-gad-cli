import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Paginator = () => {
  const { paginator } = useSelector((state) => state.users);

  return (
    <>
      {paginator?.length === 0 || (
        <Pagination>
          <PaginationContent>
            {paginator.number == 0 ||
              <>
                <PaginationItem>
                  <PaginationPrevious href='#' to={`/users/page/${paginator.number - 1}`} />
                </PaginationItem>  
              </>
            }
            <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href='#' isActive>2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            
            {paginator.number >= paginator.totalPage -1 ||
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href='#' to={`/users/page/${paginator.number + 1}`} />
                </PaginationItem>
              </>
            }

          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export { Paginator };
