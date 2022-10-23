import { wrapper } from "../redux";
import GlobalErrorComponent from "../src/Components/GlobalErrorComponent";
import "../public/nprogress.css";
import "../public/css/react-carousel.es.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "../node_modules/antd/dist/antd.css";
import "../sass/main.scss";

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {

//     return {
//       pageProps: {
//         ...(Component.getInitialProps
//           ? await Component.getInitialProps(ctx)
//           : {}),
//       },
//     };
//   }

//   render() {
//     const { Component, pageProps, store } = this.props;
//     console.log(this.props);

//     return (
//       <>
//         {/* <GlobalErrorComponent {...this.props} /> */}
//         <Component {...pageProps} />
//       </>
//     );
//   }
// }

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <GlobalErrorComponent {...pageProps} />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  };
};

export default wrapper.withRedux(MyApp);
