import React from 'react';

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
  
  const [seguidores, setSeguidores] = React.useState([]);
  const img = 'https://picsum.photos/200/300';
  const githubUser = 'AndersonCaldeiraSobrinho';
  const [comunidades, setComunidades] = React.useState([{
   
  }]);
  const [pessoasFavoritas, SetPessoasFavoritas] = React.useState([]);

  React.useEffect(function(){
    fetch('https://api.github.com/users/AndersonCaldeiraSobrinho/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '4d69a29483d6bd56b11461f6045992',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          nodeId
          avatarUrl
          login
          url
        }
      }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) =>{
      const ComunidadesDato = respostaCompleta.data.allCommunities;
      setComunidades(ComunidadesDato)
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '4d69a29483d6bd56b11461f6045992',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allIdols{
         login
         nodeId
         url
         avatarUrl
       }
     }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) =>{
      const PessoasFavoritasDato = respostaCompleta.data.allIdols;
      SetPessoasFavoritas(PessoasFavoritasDato)
    })

  }, [])

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
          <Box>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle" >Pessoas da Comunidade ({ pessoasFavoritas.length })</h2>
              <ProfileRelationsBoxContent props={pessoasFavoritas} />
            </ProfileRelationsBoxWrapper>
          </Box>
          <Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Comunidades ({ comunidades.length })</h2>
            <ProfileRelationsBoxContent props={comunidades} />
          </ProfileRelationsBoxWrapper>
          </Box>
          <Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >Amigos ({ seguidores.length })</h2>
            <ProfileRelationsBoxContent props={seguidores} />
          </ProfileRelationsBoxWrapper>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
