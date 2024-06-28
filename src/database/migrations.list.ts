import { CreateEmpresaTable1713571769283 } from "./migrations/1713571769283-CreateEmpresaTable";
import { CreateCategoriaTable1713571780519 } from "./migrations/1713571780519-CreateCategoriaTable";
import { CreateProdutoTable1713571795414 } from "./migrations/1713571795414-CreateProdutoTable";
import { CreateFornecedorTable1713571805444 } from "./migrations/1713571805444-CreateFornecedorTable";
import { CreateFornecedorProdutoTable1713571832453 } from "./migrations/1713571832453-CreateFornecedorProdutoTable";
import { CreateLoteTable1713571842180 } from "./migrations/1713571842180-CreateLoteTable";
import { CreateEntradaTable1713571864238 } from "./migrations/1713571864238-CreateEntradaTable";
import { CreateEstoqueTable1713571842179 } from "./migrations/1713571842179-CreateEstoqueTable";
import { CreateCargoTable1713571910820 } from "./migrations/1713571910820-CreateCargoTable";
import { CreateUsuarioTable1713571917627 } from "./migrations/1713571917627-CreateUsuarioTable";
import { CreateUsuarioBloqueioTable1713571925760 } from "./migrations/1713571925760-CreateUsuarioBloqueioTable";
import { CreateSaidaTable1719543368871 } from "./migrations/1719543368871-CreateSaidaTable";

export const migrations = [
    CreateEmpresaTable1713571769283,
    CreateCargoTable1713571910820,
    CreateUsuarioTable1713571917627,
    CreateCategoriaTable1713571780519,
    CreateProdutoTable1713571795414,
    CreateFornecedorTable1713571805444,
    CreateFornecedorProdutoTable1713571832453,
    CreateLoteTable1713571842180,
    CreateEntradaTable1713571864238,
    CreateEstoqueTable1713571842179,
    CreateUsuarioBloqueioTable1713571925760,
    CreateSaidaTable1719543368871
]