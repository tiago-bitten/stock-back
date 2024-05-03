import Cargo from "../app/models/Cargo";
import Categoria from "../app/models/Categoria";
import Empresa from "../app/models/Empresa";
import Entrada from "../app/models/Entrada";
import Estoque from "../app/models/Estoque";
import Fornecedor from "../app/models/Fornecedor";
import FornecedorProduto from "../app/models/FornecedorProduto";
import Lote from "../app/models/Lote";
import Produto from "../app/models/Produto";
import Saida from "../app/models/Saida";
import Usuario from "../app/models/Usuario";
import UsuarioBloqueio from "../app/models/UsuarioBloqueio";

export const entities = [
    Cargo,
    Categoria,
    Empresa,
    Entrada,
    Estoque,
    Fornecedor,
    FornecedorProduto,
    Lote,
    Produto,
    Saida,
    Usuario,
    UsuarioBloqueio
]