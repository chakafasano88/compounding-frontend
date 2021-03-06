import App, { Container } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import "../index.scss"
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import User from "../components/User";
import Loader from '../components/Loader';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faUserCircle, faCog, faHeart, faComment, faPlus, faEdit, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faUserCircle, faCog, faHeart, faComment, faPlus, faEdit, faTrash, faTrashAlt)

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;
    
    return (
      <Container>
        <ApolloProvider client={apollo}>
        <User>
            {({ data, error, loading }) => {
                const me = data ? data.me : null;                
                return(
                  <Page currentUser={me} >
                    <div className="page__wrapper">
                      <Component currentUser={me} {...pageProps} />
                    </div>
                  </Page>
                )
            }}
        </User>
  
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
