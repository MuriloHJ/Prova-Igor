"use client";
 
// PASSO DETALHES 1: Importar 'useState', 'useEffect' e 'use' do React 
import { useEffect, useState } from "react";

// PASSO DETALHES 2: Importar o componente 'Link' de 'next/link' 
import Link from "next/link";
// PASSO DETALHES 3: Importar o componente 'Image' de 'next/image' 
import Image from "next/image";
// PASSO DETALHES 4: Criar a interface 'CursoDetalhe' para os dados retornados da API 
interface CursoDetalhe
{
    id: string; 
    nome: string;
    descricao: string; 
    preco: number | string;
    categoria: string; 
    imagem: string; 
}


export default  function DetalhesCurso({ params }: { params: Promise<{ id: string }> }) 
{ 
  // PASSO DETALHES 5: Desenvelopar o id dos parâmetros assíncronos usando a função `use(params)` 
    const [curso, setCurso] = useState<CursoDetalhe>();
    const [erro, setErro] = useState<any>(null);
    const [carregando, setCarregando] = useState<any>(true);
  useEffect(() => {

   async function carregarDados(){
    const {id} = await params
    try
    {
        const response =  await fetch(`https://dynamic-events-api.onrender.com/api/eventos/${id}`,{
          cache: "no-store"
        })
        if(!response.ok)
        {
          return(
            <p>Erro ao tentar carregar api</p>
          )
        }
          const cursos : CursoDetalhe = await response.json();
          setCurso(cursos);
          setCarregando(false);
        }
        

    catch(erro)
    {
        console.error(erro);
        setErro(erro);
    }
  }
    carregarDados();
  },[]);
    
    {carregando  && (
        <p className="text-center text-slate-400 mb-8">Carregando informações...</p>
    )}

    {erro && (
      <p className="text-center text-slate-400 mb-8">Erro: {erro}</p>
    )}
  if(curso == null)
  {
    return(
      <p className="text-center ">Curso não encontrado</p>
    )
  }
  return ( 
    <main className="p-8"> 
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border 
        border-slate-200 bg-white shadow-sm"> 
      
        <div className="relative h-72 w-full bg-slate-100"> 
      

         <Image  
            src= {curso.imagem}
            alt={curso.nome} 
             fill
             sizes="(max-width: 768px) 100vw, 50vw"
              
            className="h-full w-full object-cover" 
        />
        </div> 
 
        <div className="p-8"> 
          <div className="mb-4 flex items-center justify-between"> 
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase 
            tracking-wider text-blue-600"> 
              {curso.categoria}
            </span> 
           
            <span className="text-2xl font-extrabold text-slate-900">R$ {curso.preco}</span> 
          </div> 
          <h1 className="text-3xl font-bold text-slate-800">{curso.nome}</h1> 
            
         
          <p className="mt-4 leading-relaxed text-slate-600"> 
           {curso.descricao}
          </p> 
 
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-sm"> 
            <div> 
              <span className="block font-medium text-slate-400">
              Localização</span> 

              <span className="font-semibold text-slate-700">WEG Academy</span> 
            </div> 
            <div> 
              <span className="block font-medium text-slate-400">
              🎓
              Modalidade</span> 
              <span className="font-semibold text-slate-700">Presencial / Prática</span> 
            </div> 
          </div> 
 
          <div className="mt-8 border-t border-slate-100 pt-6"> 
            <Link
              href="/" 
              className="inline-flex items-center text-sm font-semibold text-blue-600 
              hover:text-blue-800" 
            >
              ← Voltar para a lista de cursos 
           </Link>
          </div> 
        </div> 
      </div> 
    </main> 
  ); 
}