// import Link from "next/link";
import PropTypes from 'prop-types';
import Head from "next/head";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import NProgress from "nprogress";
import Router from "next/router";
import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileHeader from "./MobileHeader";
import { initGA, logPageView } from "../../utils/analytics";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const {
      children,
      title = "Home",
      menuCate
      // isAuthenticated,
      // deauthenticate,
    } = this.props;

    return (
      <div>
        <Head>
          <title>{title || "Housewife"}</title>
        </Head>

        <Header data={menuCate} />
        <MobileHeader />

        <div className="has-text-centered body-wrap">{children}</div>

        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  onClickOut: PropTypes.func,
  title: PropTypes.string,
  menuCate: PropTypes.any,
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
  menuCate: state.menu.menuCategories,
});

export default connect(mapStateToProps, actions)(Layout);
