import Head from 'next/head'
import styles from './styles.module.scss';

import { Header } from '../../components/Header'

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo produto - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.containe}>
          <h1>Novo produto</h1>

          <form className={styles.form}>

            <select>
              <option>
                Bebida
              </option>
              <option>
                Pizzas
              </option>
            </select>

          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})