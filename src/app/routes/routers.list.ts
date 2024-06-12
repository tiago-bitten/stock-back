import UsuarioRouter from '../routes/UsuarioRouter';
import AuthRouter from '../routes/AuthRouter';
import EmpresaRouter from '../routes/EmpresaRouter';
import ProdutoRouter from '../routes/ProdutoRouter';
import CategoriaRouter from '../routes/CategoriaRouter';
import LoteRouter from '../routes/LoteRouter';
import EstoqueRouter from '../routes/EstoqueRouter';
import EntradaRouter from '../routes/EntradaRouter';
import CargoRouter from '../routes/CargoRouter';

export const routers = [
    AuthRouter,
    UsuarioRouter,
    EmpresaRouter,
    ProdutoRouter,
    CategoriaRouter,
    LoteRouter,
    EstoqueRouter,
    EntradaRouter,
    CargoRouter
]