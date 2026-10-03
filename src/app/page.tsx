"use client"; 
 
// PASSO HOME 1: Importar 'useState' e 'useEffect' do React 
import { useMemo, useState } from "react";
import { useEffect } from "react";
// PASSO HOME 2: Importar o componente 'CardCurso' de '@/components/CardCurso' 
import CardCurso from "@/components/CardCurso";
// PASSO HOME 3: Criar a interface 'CursoAPI' mapeando a estrutura de dados da API: 
// id, nome, titulo, title, descricao, description, preco, price, categoria, category, imagem, imagemUrl, imageUrl 
interface CursoAPI
{
    id: string; 
    nome: string;
    descricao: string; 
    preco: number | string;
    categoria: string; 
    imagem: string; 
}
 
export default function Home() 
{ 
  const [cursos, setCursos] = useState<CursoAPI[]>([]);
  const [busca, setBusca] = useState("");
  const [carregamento, setCarregando] = useState(true);
  const [erro, setErro] = useState<any>(null);
 
  

     useEffect(() => 
    {
        fetch(`https://dynamic-events-api.onrender.com/api/eventos`)
        .then((res) => res.json())
        .then((curso) =>
        {
              setCursos(curso);
              setCarregando(false);
        }
        )
        .catch((erro) =>
        {
            setErro(erro)
        })
    }, []);

    console.log(cursos);
    
  const filtrar = useMemo(() => 
     {
       const buscar = busca.toLowerCase().trim();
    
        return cursos.filter((curso) =>
       {
        const filtro = curso.nome.toLowerCase().startsWith(buscar) || curso.descricao.toLowerCase().startsWith(buscar);
        const categoria = curso.categoria == "Curso"  || curso.categoria == "Cursos"
        return filtro && categoria;
      })
    }, [cursos,busca])

  return ( 
    <main className="p-8"> 
      <div className="mx-auto max-w-5xl"> 
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center 
        sm:justify-between"> 
          <div> 
            <h1 className="text-3xl font-extrabold text-blue-600">Catálogo de Cursos</h1> 
            <p className="mt-1 text-sm text-slate-500"> 
              Treinamentos e capacitações técnicas exclusivas 
            </p> 
          </div> 
 
          {/* CAMPO DE BUSCA */} 
          <div className="relative w-full sm:w-72"> 
            {/* PASSO HOME 10: Vincular a variável de estado 'busca' ao valor do input e 
             atualizar com onChange */} 
            <input 
              type="text" 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar curso..." 
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm 
              text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2 
              focus:ring-blue-100" 
            /> 
            {/* PASSO HOME 11: Renderizar o botão de limpar campo apenas quando houver 
            algo digitado na busca */} 

            {busca && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 
                hover:text-slate-600"> 
                  ✕ 
                </button> 
            )}

          </div> 
        </section> 
 
        
        {erro && (
          <p>Erro!!! {erro}</p>
        )}
     

        {carregamento && (
          <p>Carregando catálogo...</p>
        )}
     
           {!carregamento && 
           (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> 
            {filtrar.map((curso) => 
            (
               <CardCurso
                  key = {curso.id}
                  id={curso.id}
                  nome={curso.nome}
                  descricao={curso.descricao}
                  preco = {curso.preco}
                  categoria = {curso.categoria}
                  imagem = {curso.imagem}
                />
            ))}
            </div>
            )}
      </div> 
    </main> 
  ); 
}

