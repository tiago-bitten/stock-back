import AuthRouter from '../routes/AuthRouter';
import EmpresaRouter from '../routes/EmpresaRouter';
import ProdutoRouter from '../routes/ProdutoRouter';
import CategoriaRouter from '../routes/CategoriaRouter';
import LoteRouter from '../routes/LoteRouter';
import EstoqueRouter from '../routes/EstoqueRouter';
import EntradaRouter from '../routes/EntradaRouter';
import CargoRouter from '../routes/CargoRouter';
import FornecedorProdutoRouter from '../routes/FornecedorProdutoRouter';
import FornecedorRouter from '../routes/FornecedorRouter';
import SaidaRouter from '../routes/SaidaRouter';
// import UsuarioBloqueioRouter from '../routes/UsuarioBloqueioRouter';
import UsuarioRouter from '../routes/UsuarioRouter';

export const routers = [
    AuthRouter,
    CargoRouter,
    CategoriaRouter,
    EmpresaRouter,
    EntradaRouter,
    EstoqueRouter,
    FornecedorProdutoRouter,
    FornecedorRouter,
    LoteRouter,
    ProdutoRouter,
    SaidaRouter,
    // UsuarioBloqueioRouter,
    UsuarioRouter
]