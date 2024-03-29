import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

// função para páginas que só podem ser acessadas por visitantes
export function canSSRGuest<P extends Record<string, any>>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);

    // Se o cara tentar acessar a página porém já tiver um login salvo, redirecionamos
    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}
