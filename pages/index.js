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
    id: '165169846463537',
    login: 'Eu odeio acordar cedo',
    avatar_url: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [{
      node_id: 'MDQ6VXNlcjM4NzQ3MA==',
      login: 'alinebastos',
      avatar_url: 'https://avatars.githubusercontent.com/u/387470?v=4',
      url: 'https://github.com/alinebastos'
    },
    {
      node_id: 	"MDQ6VXNlcjE5MTQ2NjA=",
      login: 'reinaldoferraz',
      avatar_url: 'https://avatars.githubusercontent.com/u/1914660?v=4',
      url: 'https://github.com/reinaldoferraz'
    },
    {
      node_id: "MDQ6VXNlcjE4Mzg0ODc=",
      login: 'talitapagani',
      avatar_url: 'https://avatars.githubusercontent.com/u/1838487?v=4',
      url: 'https://github.com/talitapagani'
    },
    {
      node_id: "MDQ6VXNlcjg2ODMzNzg=",
      login: 'gustavoguanabara',
      avatar_url: 'https://avatars.githubusercontent.com/u/8683378?v=4',
      url: 'https://github.com/gustavoguanabara'
    },
    {
      node_id: "MDQ6VXNlcjM2MDM3OTM=",
      login: 'felipefialho',
      avatar_url: 'https://avatars.githubusercontent.com/u/3603793?v=4',
      url: 'https://github.com/felipefialho'
    },
    {
      node_id: 	"MDQ6VXNlcjUzMjA3NjM4",
      login: 'PriyaNobre',
      avatar_url: 'https://avatars.githubusercontent.com/u/53207638?v=4',
      url: 'https://github.com/PriyaNobre',
    },
    {
      node_id: 	"MDQ6VXNlcjE4NTgzNzE2",
      login: 'carinebatista',
      avatar_url: 'https://avatars.githubusercontent.com/u/18583716?v=4',
      url: 'https://github.com/carinebatista'
    }
  ];

  React.useEffect(function(){
    fetch('https://api.github.com/users/AndersonCaldeiraSobrinho/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
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
