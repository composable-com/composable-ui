import { GetServerSideProps } from 'next'
import { KlevuSearchPage } from '../components/klevu/klevu'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const term = `${context.query.term}`

  return {
    props: {
      term,
    },
  }
}

export default KlevuSearchPage
