import { useState, ChangeEvent, createContext  } from 'react'
import Head from 'next/head'
import styles from './styles.module.scss';
import { Header } from '../../components/Header'

import { canSSRAuth } from '../../utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi'

import setupAPIClient from '../../services/api';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps) {
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null)

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    
    if(!event.target.files) {
      return;
    }

    const imgAvatar = event.target.files[0];
    
    if(!imgAvatar) {
      return;
    }

    if(imgAvatar.type === 'image/jpeg' || imgAvatar.type === 'image/png') {
      setFile(imgAvatar)
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    // console.log('Categoria selecionada: ', event.target.value)
    // console.log('Categoria selecionada: ', categories[parseInt(event.target.value)]);

    setCategorySelected(parseInt(event.target.value));

  }

  return (
    <>
      <Head>
        <title>Novo produto - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFFF" />
              </span>
              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

              {image &&(
                <img 
                  className={styles.preview}
                  src={image}
                  alt='Foto do produto'
                  width={250}
                  height={250}
                />
              )}

            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item ,index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}              
            </select> 

            <input 
            type="text" 
            placeholder='Digite o nome do produto'
            className={styles.input}
            />
            <input 
            type="text" 
            placeholder='Preço do produto'
            className={styles.input}
            />
            <textarea
              placeholder='Descreva seu produto...'
              className={styles.input}
            />
            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps  = canSSRAuth(async (ctx) => {
  const apiClient =  setupAPIClient(ctx);

  const response = await apiClient.get('/category');
  //console.log(response.data);

  return {
    props: {
      categoryList: response.data
    }
  }
})