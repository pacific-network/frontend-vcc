import { useState } from 'react';

interface PaginationMeta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export function usePaginatedQuery<T>(
    fetchFunction: (page: number, limit: number) => Promise<{ data: T[]; meta: PaginationMeta }>,
    limit: number = 10
) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<T[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        page: 1,
        take: limit,
        itemCount: 0,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await fetchFunction(pageNumber, limit);
            setData(response.data);
            setMeta(response.meta);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error fetching paginated data:", error);
        } finally {
            setLoading(false);
        }
    };

    return { data, meta, loading, page, setPage, fetchData };
}
