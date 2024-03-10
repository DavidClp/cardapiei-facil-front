import { useQuery } from "@tanstack/react-query";
import { ProdutoApi } from "../../services/produto";

interface PropsUseCategoriasProdutoList {
  estId: number;
}

export function useCategoriasProdutoList({
  estId,
}: PropsUseCategoriasProdutoList) {
  const query = useQuery({
    queryKey: ["categorias-com-produtos-ADMIN", { estId }],
    queryFn: () =>
      ProdutoApi.doDataCategoriasProdutoList({ estId }),
  });

  return query;
}
