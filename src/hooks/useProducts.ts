import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";

// Define types for the product and response
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const useProducts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [limit] = useState<number>(10);
  const skip = (currentPage - 1) * limit;

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedUpdate(search);
  }, [search, debouncedUpdate]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", skip, limit, debouncedSearch],
    queryFn: async () => {
      const response = await axios.get<ProductsResponse>(
        `https://dummyjson.com/products/search?skip=${skip}&limit=${limit}&q=${debouncedSearch}`
      );
      return response.data;
    },
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  return {
    products: data?.products || [],
    isLoading,
    isError,
    currentPage,
    setCurrentPage,
    totalPage: data ? Math.ceil(data.total / limit) : 0,
    search,
    setSearch,
  };
};
