import React from 'react';

import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

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
  
  const img = 'https://picsum.photos/200/300';
  const githubUser = 'AndersonCaldeiraSobrinho';
  const [comunidades, setComunidades] = React.useState([{
    id: '165169846463537',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = ['Punxoxo', 'victoratavila', 'sarajuvenal', 'marcelodv', 'davyd-souza', 'relue271', 'Gustavo300493'];

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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Pessoas da Comunidade ({ pessoasFavoritas.length })</h2>
            <ul>
              { pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`/user/${itemAtual}`}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                }) 
              }
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Comunidades ({ comunidades.length })</h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}

            </ul>
          </ProfileRelationsBoxWrapper>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
