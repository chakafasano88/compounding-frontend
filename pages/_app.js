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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faCheck, faUserCircle, faCog, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel, faCheck, faUserCircle, faCog, faHeart)

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
                      <Component {...pageProps} />
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
