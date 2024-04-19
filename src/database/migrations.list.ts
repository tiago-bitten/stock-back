import { CreateUsuarioTable1711801468579 } from "./migrations/1711801468579-CreateUsuarioTable";
import { CreateEmpresaTable1712972515016 } from "./migrations/1712972515016-CreateEmpresaTable";
import { CreateCargoTable1713567199713 } from "./migrations/1713567199713-CreateCargoTable";
import { CreateCategoriaTable1713567212961 } from "./migrations/1713567212961-CreateCategoriaTable";
import { CreateEntradaTable1713567241261 } from "./migrations/1713567241261-CreateEntradaTable";
import { CreateEstoqueTable1713567258001 } from "./migrations/1713567258001-CreateEstoqueTable";
import { CreateFornecedorTable1713567278554 } from "./migrations/1713567278554-CreateFornecedorTable";
import { CreateFornecedorProdutoTable1713567399805 } from "./migrations/1713567399805-CreateFornecedorProdutoTable";
import { CreateLoteTable1713567416068 } from "./migrations/1713567416068-CreateLoteTable";
import { CreateProdutoTable1713567439579 } from "./migrations/1713567439579-CreateProdutoTable";
import { CreateSaidaTable1713567467715 } from "./migrations/1713567467715-CreateSaidaTable";
import { CreateUsuarioBloqueioTable1713567563548 } from "./migrations/1713567563548-CreateUsuarioBloqueioTable";

export const migrations = [
    // CreateCategoriaTable1713567212961,
    CreateEmpresaTable1712972515016,
    // CreateEntradaTable1713567241261,
    // CreateEstoqueTable1713567258001,
    // CreateFornecedorTable1713567278554,
    // CreateFornecedorProdutoTable1713567399805,
    // CreateLoteTable1713567416068,
    // CreateProdutoTable1713567439579,
    // CreateSaidaTable1713567467715,
    CreateCargoTable1713567199713,
    CreateUsuarioTable1711801468579,
    // CreateUsuarioBloqueioTable1713567563548
]