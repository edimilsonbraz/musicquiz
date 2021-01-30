import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';




export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>MusicQuiz - Base</title>
        <meta property="og:image" content="https://ik.imagekit.io/1n1swj1w28/wallpaperflare.com_wallpaper_YDmHGAeyJg.jpg" />
      </Head>
      <QuizContainer>
        <QuizLogo/>
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>MusicQuiz</h1>
          </Widget.Header>
          <Widget.Content>
            <h4>Teste os seus conhecimentos sobre o universo Musical e divirta-se !</h4>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input 
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => {
                  setName(infosDoEvento.target.value)
                }}
                placeholder="Digite seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`JOGAR ${name}`} 
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>Dá uma olhada nesses quizes incríveis que o pessoal da 
              imersão React fez:
            </p>

           <ul>    
            {db.external.map((linkExterno) => {
              const [projectName, githubUser] = linkExterno 
              .replace(/\//g, '') 
              .replace('https:', '') 
              .replace('.vercel.app', '') 
              .split('.');

              return (
                <li key={linkExterno}>
                  <Widget.Topic 
                    as={Link}
                    href={`/quiz/${projectName}___${githubUser}`}
                    
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              );
            })}
           </ul> 
          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.section}
          transition={{ delay: 0.8, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/edimilsonbraz/reactquiz-base" />
    </QuizBackground>
  );
}
