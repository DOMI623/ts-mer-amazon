import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import type { Product } from "../types/Product";
import type { ApiError } from "../types/ApiError";

export const useGetProductsQuery = () =>
  useQuery<Product[], ApiError>({
    queryKey: ['products'],
    queryFn: async () =>
      (await apiClient.get<Product[]>(`/api/products`)).data, // 👈 agregar / al inicio
  });


export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery<Product, ApiError>({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`/api/products/${slug}`)).data, // 👈 quitar "slug/" literal
  });
