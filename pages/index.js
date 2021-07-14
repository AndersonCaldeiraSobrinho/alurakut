import React from 'react';

import { TestimonialBox } from '../src/components/Testimonial';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper, ProfileRelationsBoxContent } from '../src/components/profileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box as='aside'>
      <img src= {`https://github.com/${propriedades.githubUser}.png`} style= {{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} >
          @{propriedades.githubUser}
        </ a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  
  const [testemunhos, setTestemunhos] = React.useState([{
    id:'',
    title: ''
  }]);
  const img = 'https://picsum.photos/200/300';
  const githubUser = 'AndersonCaldeiraSobrinho';
  const [comunidades, setComunidades] = React.useState([{
    id: '165169846463537',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [{
      id: 1,
      title: 'Punxoxo',
      image: 'https://github.com/Punxoxo.png',
      link: 'https://github.com/Punxoxo'
    },
    {
      id: 2,
      title: 'victoratavila',
      image: 'https://github.com/victoratavila.png',
      link: 'https://github.com/victoratavila'
    },
    {
      id: 3,
      title: 'sarajuvenal',
      image: 'https://github.com/sarajuvenal.png',
      link: 'https://github.com/sarajuvenal'
    },
    {
      id: 4,
      title: 'marcelodv',
      image: 'https://github.com/marcelodv.png',
      link: 'https://github.com/marcelodv'
    },
    {
      id: 5,
      title: 'davyd-souza',
      image: 'https://github.com/davyd-souza.png',
      link: 'https://github.com/davyd-souza'
    },
    {
      id: 6,
      title: 'relue271',
      image: 'https://github.com/relue271.png',
      link: 'https://github.com/relue271'
    },
    {
      id: 7,
      title: 'Gustavo300493',
      image: 'https://github.com/Gustavo300493.png',
      link: 'https://github.com/Gustavo300493'
    }
  ];
 
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="smallTitle">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2>O que você deseja fazer?</h2>
            <hr />
            <form onSubmit={ function handleCriaComunidade(e) {
              e.preventDefault();
              
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
              
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                  value = {img}
                />
              </div>

              <button>
                Criar a sua comunidade
              </button>

            </form>
          </Box>
          <Box>
            <h2>Deixe um depoimento</h2>
            <hr />
            <form onSubmit={ function handleCriaDepoimento(e) {
              e.preventDefault();
              //console.log(e);
              const dadosDoForm = new FormData(e.target);
              //console.log(dadosDoForm);
              const testemunho = {
                title: dadosDoForm.get('title')
              }
              console.log(testemunho);
              // const testemunhosAtualizados = [...testemunhos, testemunho];
              // setTestemunhos(testemunhosAtualizadas);
              
            }}>
              <div>
                <input 
                  placeholder="Qual mensagem quer deixar?" 
                  name="title" 
                  aria-label="Qual mensagem quer deixar?"
                />
              </div>

              <button>
                Adicionar
              </button>

            </form>
            {/* <TestimonialBox testemunho={testemunho}/> */}
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Pessoas da Comunidade ({ pessoasFavoritas.length })</h2>
            <ProfileRelationsBoxContent githubUser={pessoasFavoritas} />
          </ProfileRelationsBoxWrapper>
          <Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Comunidades ({ comunidades.length })</h2>
            <ProfileRelationsBoxContent githubUser={comunidades} />
          </ProfileRelationsBoxWrapper>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
