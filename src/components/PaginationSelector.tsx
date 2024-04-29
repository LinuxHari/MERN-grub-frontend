import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type Props = {
    page:number
    pages: number
    onPageChange: (page: number) => void
}

const PaginationSelector = ({page, pages, onPageChange}: Props) => {

  const pageNumebers = []

  for(let i = 1; i<= pages; i++){
    pageNumebers.push(i)
  }

  return (
    <Pagination>
      <PaginationContent>

        {page !== 1 && <PaginationItem>
            <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)}/>
          </PaginationItem>
          }
          {pageNumebers.map((number) => (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page !== pageNumebers.length && (
            <PaginationItem>
              <PaginationNext href="#" onClick={() => onPageChange(page + 1)}/>
            </PaginationItem>
          )}
      </PaginationContent>
    </Pagination>
  )

  return (
    <div>Pagination</div>
  )
}

export default PaginationSelector