import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 25,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="glass-surface rounded-xl p-3 shadow-md">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="h-8 w-8 p-0"
          >
            <Icon name="ChevronLeft" size={14} />
          </Button>

          <Button variant="default" size="sm" className="h-8 w-8 p-0">
            {currentPage}
          </Button>

          {currentPage < totalPages && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              className="h-8 w-8 p-0"
            >
              {currentPage + 1}
            </Button>
          )}

          {currentPage < totalPages - 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 2)}
              className="h-8 w-8 p-0"
            >
              {currentPage + 2}
            </Button>
          )}

          {currentPage < totalPages - 2 && (
            <span className="px-2 text-muted-foreground text-sm">...</span>
          )}

          {currentPage < totalPages - 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              className="h-8 w-8 p-0"
            >
              {totalPages}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="h-8 w-8 p-0"
          >
            <Icon name="ChevronRight" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
