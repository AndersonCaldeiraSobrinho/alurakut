import React from 'react';

import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper, ProfileRelationsBoxContent, ProfileRelationsBoxContentGithub } from '../src/components/profileRelations';

function ProfileSideBar(props) {
  return (
    <Box as='aside'>
      <img src= {`https://github.com/${props.githubUser}.png`} style= {{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`} >
          @{props.githubUser}
        </ a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}






/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
  export default function Home(props) {
  const [seguidores, setSeguidores] = React.useState([]);
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
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
        'Authorization': 'ab2528a3e56349fd9833d3206b9938',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          nodeId
          url
          avatarUrl
          login
          
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
        'Authorization': 'ab2528a3e56349fd9833d3206b9938',
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
                nodeId: new Date().toISOString(),
                url: "#",
                avatarUrl: dadosDoForm.get('image'),
                login: dadosDoForm.get('title'),
                
              }

              fetch('api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriadoComunidade);
                const comunidade = dados.registroCriadoComunidade;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);  
              })
              
              
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
              <h2 className="smallTitle" >
                Seguindo 
                <div className="efeitoDestCont">
                  ({ pessoasFavoritas.length })
                </div>
              </h2>
              <ProfileRelationsBoxContent props={pessoasFavoritas} />
              <a  className="efeitoDestTxt" href = "/following">
                <div>
                  Ver todos
                </div>
              </a>
            </ProfileRelationsBoxWrapper>
          </Box>
          <Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >
              Comunidades 
              <div className="efeitoDestCont">
                ({ comunidades.length })
              </div>
            </h2>
            <ProfileRelationsBoxContent props={comunidades} />
            <a className="efeitoDestTxt" href = "/following">
              <div>
                Ver todos
              </div>
            </a>
          </ProfileRelationsBoxWrapper>
          </Box>
          <Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle" >
              Amigos 
              <div className="efeitoDestCont">
                ({ seguidores.length })
              </div>
            </h2>
            <ProfileRelationsBoxContentGithub props={seguidores} />
            <a className="efeitoDestTxt" href = "/following">
              <div>
                Ver todos
              </div>
            </a>
          </ProfileRelationsBoxWrapper>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 